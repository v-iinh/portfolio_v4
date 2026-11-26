// Drifting dust across the sky, drawn on one canvas.
import { useEffect, useRef } from "react";
import { T } from "../theme.js";

export function Sky() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, g = cv.getContext("2d");
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fit = () => { w = window.innerWidth; h = window.innerHeight; cv.width = w * dpr; cv.height = h * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); };
    fit();
    const motes = Array.from({ length: w < 700 ? 40 : 90 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 0.4 + Math.random() * 1.4, v: 0.05 + Math.random() * 0.25, p: Math.random() * 6.28 }));
    let t = 0;
    const tick = () => {
      t += 0.016;
      g.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.y -= m.v; m.x += Math.sin(t * 0.6 + m.p) * 0.15;
        if (m.y < -4) { m.y = h + 4; m.x = Math.random() * w; }
        g.fillStyle = `rgba(${T.DUST},${0.12 + 0.12 * Math.sin(t * 1.5 + m.p)})`;
        g.beginPath(); g.arc(m.x, m.y, m.r, 0, Math.PI * 2); g.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", fit);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", fit); };
  }, []);
  return <canvas ref={ref} className="tp-sky" aria-hidden="true" />;
}
