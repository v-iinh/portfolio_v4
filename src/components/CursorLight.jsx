import { useEffect, useRef, useState } from "react";

export function CursorLight() {
  const core = useRef(null), halo = useRef(null);
  const [on, setOn] = useState(false);
  const [fine] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: fine) and (hover: hover)").matches);

  useEffect(() => {
    if (!fine) return undefined;
    let raf = 0, tx = -999, ty = -999, cx = tx, cy = ty, hx = tx, hy = ty, seen = false;
    const move = (e) => {
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      tx = e.clientX; ty = e.clientY;
      if (!seen) { cx = hx = tx; cy = hy = ty; seen = true; }
      setOn(true);
    };
    const leave = () => { setOn(false); seen = false; };
    const down = () => { core.current?.classList.remove("tl-pulse"); void core.current?.offsetWidth; core.current?.classList.add("tl-pulse"); };
    const tick = () => {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      hx += (tx - hx) * 0.08; hy += (ty - hy) * 0.08;
      if (core.current) core.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (halo.current) halo.current.style.transform = `translate3d(${hx}px, ${hy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    document.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    document.documentElement.classList.add("tl-light");
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      document.documentElement.classList.remove("tl-light");
    };
  }, [fine]);

  if (!fine) return null;
  return (
    <div className={`tl ${on ? "on" : ""}`} aria-hidden="true">
      <span ref={halo} className="tl-halo"><i /></span>
      <span ref={core} className="tl-core"><i /></span>
    </div>
  );
}
