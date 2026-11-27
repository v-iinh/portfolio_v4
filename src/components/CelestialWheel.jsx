// The faint engraved wheel that turns behind the cards and on each page.
import { T } from "../theme.js";
import { starPoints } from "../art/shapes.js";
import { PROFILE } from "../data/content.js";

// A faint engraved celestial wheel that turns slowly behind the cards.
export function CelestialWheel({ size = 900, className = "" }) {
  const c = size / 2, R = c - 6;
  const ticks = [];
  for (let i = 0; i < 120; i++) {
    const a = (i / 120) * Math.PI * 2, l = i % 10 === 0 ? 16 : i % 5 === 0 ? 10 : 5;
    ticks.push(`M${(c + Math.cos(a) * R).toFixed(1)} ${(c + Math.sin(a) * R).toFixed(1)}L${(c + Math.cos(a) * (R - l)).toFixed(1)} ${(c + Math.sin(a) * (R - l)).toFixed(1)}`);
  }
  const words = PROFILE.words;
  return (
    <svg className={`tp-wheel ${className}`} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <defs><path id={`tp-ring-${size}`} d={`M${c} ${c} m-${R - 34} 0 a${R - 34} ${R - 34} 0 1 1 ${2 * (R - 34)} 0 a${R - 34} ${R - 34} 0 1 1 -${2 * (R - 34)} 0`} /></defs>
      <g className="tp-wheel-outer" style={{ transformOrigin: `${c}px ${c}px` }}>
        <circle cx={c} cy={c} r={R} fill="none" stroke={T.INK} strokeWidth="1.2" />
        <circle cx={c} cy={c} r={R - 22} fill="none" stroke={T.INK} strokeWidth="0.6" />
        <path d={ticks.join("")} stroke={T.INK} strokeWidth="0.8" />
        <text fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="17" letterSpacing="6" fill={T.INK}>
          <textPath href={`#tp-ring-${size}`}>{words + words}</textPath>
        </text>
        <circle cx={c} cy={c} r={R - 48} fill="none" stroke={T.INK} strokeWidth="0.6" />
      </g>
      <g className="tp-wheel-inner" style={{ transformOrigin: `${c}px ${c}px` }}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2, r1 = R * 0.36, r2 = R - 48;
          const sx = c + Math.cos(a + Math.PI / 12) * (R * 0.7), sy = c + Math.sin(a + Math.PI / 12) * (R * 0.7);
          return (
            <g key={i}>
              <path d={`M${c + Math.cos(a) * r1} ${c + Math.sin(a) * r1}L${c + Math.cos(a) * r2} ${c + Math.sin(a) * r2}`} stroke={T.INK} strokeWidth="0.6" />
              <polygon points={starPoints(sx, sy, 9, 2.6, 4)} fill="none" stroke={T.INK} strokeWidth="0.8" />
            </g>
          );
        })}
        <circle cx={c} cy={c} r={R * 0.36} fill="none" stroke={T.INK} strokeWidth="0.8" />
        <polygon points={starPoints(c, c, R * 0.34, R * 0.12, 12)} fill="none" stroke={T.INK} strokeWidth="0.6" />
      </g>
    </svg>
  );
}
