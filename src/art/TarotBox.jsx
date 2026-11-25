// The engraved deck box.
import { starPoints, rays, wavyRays, flourish } from "./shapes.js";
import { T } from "../theme.js";

// An engraved tarot box: sun and crescent moon in an arched window, stars, flourishes and a name ribbon.
export function TarotBox() {
  const cx = 120;
  return (
    <svg viewBox="0 0 240 370" className="tp-svg" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="db-ink" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={T.BOX[0]} /><stop offset=".4" stopColor={T.BOX[1]} /><stop offset=".62" stopColor={T.BOX[2]} /><stop offset="1" stopColor={T.BOX[3]} />
        </linearGradient>
        <pattern id="db-lattice" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="12" height="12" fill="none" stroke={T.LINE} strokeWidth="0.45" opacity="0.35" />
        </pattern>
        <clipPath id="db-arch"><path d="M48 252 V128 A72 72 0 0 1 192 128 V252 Z" /></clipPath>
      </defs>
      <rect width="240" height="370" rx="6" fill="url(#db-ink)" />
      <rect x="10" y="10" width="220" height="350" rx="4" fill="url(#db-lattice)" stroke={T.LINE} strokeWidth="1" />
      <rect x="18" y="18" width="204" height="334" rx="2" fill="none" stroke={T.LINE} strokeWidth="0.5" opacity="0.7" />
      <path d={flourish(22, 22, 1, 1) + flourish(218, 22, -1, 1) + flourish(22, 348, 1, -1) + flourish(218, 348, -1, -1)} fill="none" stroke={T.LINE} strokeWidth="0.9" />
      {/* arched window */}
      <path d="M48 252 V128 A72 72 0 0 1 192 128 V252 Z" fill={T.BOX_WIN} />
      <g clipPath="url(#db-arch)">
        <path className="tp-spin-slow" style={{ transformOrigin: "120px 150px" }} d={rays(cx, 150, 40, 120, 48)} stroke={T.LINE} strokeWidth="0.45" opacity="0.6" />
        {[[66, 92], [174, 92], [62, 218], [178, 218], [120, 70]].map(([x, y], i) => (
          <polygon key={i} className="tp-twinkle" style={{ animationDelay: `${i * 0.6}s` }} points={starPoints(x, y, 5, 1.4, 4)} fill={T.LINE} />
        ))}
      </g>
      <path d="M48 252 V128 A72 72 0 0 1 192 128 V252 Z" fill="none" stroke={T.LINE} strokeWidth="1.3" />
      <path d="M42 252 V126 A78 78 0 0 1 198 126 V252" fill="none" stroke={T.LINE} strokeWidth="0.5" opacity="0.7" />
      {/* sun with the crescent moon inside it */}
      <g className="db-sun" style={{ transformOrigin: "120px 150px" }}>
        <path d={wavyRays(cx, 150, 34, 58, 16, Math.PI / 16)} fill="none" stroke={T.LINE} strokeWidth="0.8" />
        <path d={rays(cx, 150, 34, 64, 16)} stroke={T.LINE} strokeWidth="1.2" />
      </g>
      <circle cx={cx} cy="150" r="32" fill={T.BOX_WIN} stroke={T.LINE} strokeWidth="1.4" />
      <circle cx={cx} cy="150" r="27" fill="none" stroke={T.LINE} strokeWidth="0.5" />
      <path d="M128 130 a21 21 0 1 0 0 40 a16 16 0 1 1 0 -40Z" fill={T.LINE} />
      <polygon points={starPoints(132, 150, 4.5, 1.4, 4)} fill={T.LINE} />
      {/* the floor of the window */}
      <path d="M48 230 H192 M48 238 H192" stroke={T.LINE} strokeWidth="0.6" opacity="0.7" />
      <path d="M48 252 L70 238 H170 L192 252" fill="none" stroke={T.LINE} strokeWidth="0.8" />
      {/* ribbon with the name */}
      <path d="M30 278 H210 L200 292 L210 306 H30 L40 292 Z" fill={T.BOX_WIN} stroke={T.LINE} strokeWidth="1" />
      <text x={cx} y="297" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="16" fontWeight="600" letterSpacing="3.5" fill={T.LINE}>VINH TRAN</text>
      <text x={cx} y="326" textAnchor="middle" fontFamily="'EB Garamond', Georgia, serif" fontSize="9" letterSpacing="2.6" fill={T.LINE} opacity="0.85">THE MAJOR ARCANA · V</text>
      <path d="M88 336 H110 M130 336 H152" stroke={T.LINE} strokeWidth="0.6" />
      <polygon points={starPoints(cx, 336, 4, 1.2, 4)} fill={T.LINE} />
    </svg>
  );
}
