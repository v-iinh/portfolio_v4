// The interactive constellation field behind everything.
import { useEffect, useRef } from "react";
import { T } from "../theme.js";

// A living constellation field, in the spirit of particles.js: faint stars drift, link up with fine
// silver lines when they come near each other, reach toward the pointer with gold lines, ease away
// from it, and scatter when you click. Works with touch too.
export function ConstellationField() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, g = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, stars = [], raf = 0, t = 0;
    const pointer = { x: 0, y: 0, active: false };
    const LINK = () => (w < 700 ? 92 : 124), REACH = () => (w < 700 ? 120 : 170), PUSH = 96;
    const seed = () => {
      const n = Math.round(Math.max(28, Math.min(96, (w * h) / 15000)));
      stars = Array.from({ length: n }, () => {
        const a = Math.random() * Math.PI * 2, sp = 0.05 + Math.random() * 0.12;
        return { x: Math.random() * w, y: Math.random() * h, bx: Math.cos(a) * sp, by: Math.sin(a) * sp, vx: 0, vy: 0, r: 0.6 + Math.random() * 1.3, p: Math.random() * 6.28, big: Math.random() < 0.14 };
      });
    };
    const fit = () => {
      const nw = window.innerWidth, nh = window.innerHeight, first = !w;
      w = nw; h = nh; cv.width = w * dpr; cv.height = h * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (first || stars.length === 0) seed();
      else stars.forEach((s) => { s.x = Math.min(s.x, w); s.y = Math.min(s.y, h); });
    };
    const sparkle = (x, y, r, a) => {
      g.strokeStyle = `rgba(${T.DUST},${a})`; g.lineWidth = 0.7;
      g.beginPath(); g.moveTo(x - r * 2.6, y); g.lineTo(x + r * 2.6, y); g.moveTo(x, y - r * 2.6); g.lineTo(x, y + r * 2.6); g.stroke();
    };
    const frame = () => {
      t += 0.016;
      g.clearRect(0, 0, w, h);
      const L = LINK(), R = REACH();
      for (const s of stars) {
        if (pointer.active) {
          const dx = s.x - pointer.x, dy = s.y - pointer.y, d = Math.hypot(dx, dy);
          if (d < PUSH && d > 0.1) { const f = (1 - d / PUSH) * 0.06; s.vx += (dx / d) * f; s.vy += (dy / d) * f; }
        }
        s.vx *= 0.94; s.vy *= 0.94;
        s.x += s.bx + s.vx; s.y += s.by + s.vy;
        if (s.x < -10) s.x = w + 10; else if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10; else if (s.y > h + 10) s.y = -10;
      }
      // lines between neighbouring stars
      g.lineWidth = 0.6;
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i];
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j], dx = a.x - b.x, dy = a.y - b.y;
          if (Math.abs(dx) > L || Math.abs(dy) > L) continue;
          const d = Math.hypot(dx, dy);
          if (d < L) { g.strokeStyle = `rgba(${T.LINK},${(1 - d / L) * 0.2})`; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
        }
      }
      // gold lines reaching from the pointer to the stars around it
      if (pointer.active) {
        g.lineWidth = 0.7;
        for (const s of stars) {
          const d = Math.hypot(s.x - pointer.x, s.y - pointer.y);
          if (d < R) { g.strokeStyle = `rgba(${T.REACH},${(1 - d / R) * 0.42})`; g.beginPath(); g.moveTo(pointer.x, pointer.y); g.lineTo(s.x, s.y); g.stroke(); }
        }
      }
      for (const s of stars) {
        const tw = 0.55 + 0.45 * Math.sin(t * 1.4 + s.p);
        g.fillStyle = `rgba(${T.STAR},${0.55 * tw})`;
        g.beginPath(); g.arc(s.x, s.y, s.r, 0, Math.PI * 2); g.fill();
        if (s.big) sparkle(s.x, s.y, s.r, 0.32 * tw);
      }
      raf = requestAnimationFrame(frame);
    };
    const kick = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); };
    const move = (e) => { pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true; };
    const out = () => { pointer.active = false; };
    const burst = (e) => {
      for (const s of stars) {
        const dx = s.x - e.clientX, dy = s.y - e.clientY, d = Math.hypot(dx, dy);
        if (d < 220 && d > 0.1) { const f = (1 - d / 220) * 2.4; s.vx += (dx / d) * f; s.vy += (dy / d) * f; }
      }
    };
    fit(); kick();
    window.addEventListener("resize", fit);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", burst);
    const up = (e) => { if (e.pointerType === "touch") out(); };
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", out);
    window.addEventListener("blur", out);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", burst);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", out);
      window.removeEventListener("blur", out);
    };
  }, []);
  return <canvas ref={ref} className="td-field" aria-hidden="true" />;
}
