// The five Major Arcana cards (each drawn in a 300 × 520 card) and the card back.
import { useEffect, useRef } from "react";
import { T } from "../theme.js";
import { starPoints, rays, wavyRays, petals, leaf, cloud, flourish } from "./shapes.js";

export function HermitArt() {
  const peaks = "M22 330 L70 250 L96 282 L140 196 L176 262 L204 228 L278 320 L278 436 L22 436Z";
  const far = "M22 300 L56 262 L84 286 L118 232 L150 270 L190 212 L230 262 L278 238 L278 436 L22 436Z";
  return (
    <g>
      <rect x="22" y="44" width="256" height="392" fill="url(#tp-hh)" opacity="0.55" />
      <path d="M70 84 a24 24 0 1 0 22 32 a18 18 0 1 1 -22 -32Z" fill={T.PAPER} stroke={T.INK} strokeWidth="1.2" />
      {[[210, 70], [244, 108], [182, 104], [50, 150], [250, 160], [120, 70]].map(([x, y], i) => (
        <polygon key={i} className="tp-twinkle" style={{ animationDelay: `${i * 0.6}s` }} points={starPoints(x, y, i % 2 ? 4 : 6, 1.6, 4)} fill={T.PAPER} stroke={T.INK} strokeWidth="0.7" />
      ))}
      <path d={far} fill={T.PAPER} stroke={T.INK} strokeWidth="1" />
      <path d={far} fill="url(#tp-h135)" opacity="0.35" />
      <path d={peaks} fill={T.PAPER} stroke={T.INK} strokeWidth="1.3" />
      <path d="M140 196 L150 240 L140 280 L156 330 L176 262 M70 250 L80 300 L96 282 M204 228 L214 270 L236 300" fill="none" stroke={T.INK} strokeWidth="0.8" />
      <path d="M140 196 L118 262 L100 330 L22 330 L70 250 L96 282Z" fill="url(#tp-h45)" opacity="0.55" />
      <path d="M204 228 L190 290 L278 320 L278 330Z" fill="url(#tp-h45)" opacity="0.45" />
      <path d="M118 436 C130 400 170 392 160 360 C150 330 120 338 132 306 C140 286 150 280 146 262" fill="none" stroke={T.INK} strokeWidth="1" strokeDasharray="3 3" />
      {/* staff and hanging lantern */}
      <path d="M92 436 L184 132" stroke={T.INK} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M92 436 L184 132" stroke={T.PAPER} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M184 132 C200 128 206 140 200 150" fill="none" stroke={T.INK} strokeWidth="1.4" />
      <g className="tp-flicker"><path d={rays(200, 196, 46, 96, 32)} stroke={T.INK} strokeWidth="0.6" opacity="0.8" /></g>
      <circle cx="200" cy="196" r="44" fill={T.PAPER} stroke={T.INK} strokeWidth="0.6" strokeDasharray="1.5 3" />
      <path d="M200 150 L200 160" stroke={T.INK} strokeWidth="1.2" />
      <path d="M186 172 L200 160 L214 172Z" fill="url(#tp-h45)" stroke={T.INK} strokeWidth="1.2" />
      <rect x="184" y="172" width="32" height="44" fill={T.PAPER} stroke={T.INK} strokeWidth="1.4" />
      <path d="M194 172 V216 M206 172 V216" stroke={T.INK} strokeWidth="0.7" />
      <polygon className="tp-twinkle" points={starPoints(200, 194, 11, 4.5, 6)} fill={T.PAPER} stroke={T.INK} strokeWidth="1" />
      <path d="M180 216 H220 L214 224 H186Z" fill="url(#tp-dense)" stroke={T.INK} strokeWidth="1.2" />
    </g>
  );
}

export function WheelArt() {
  const cx = 150, cy = 236;
  const letters = ["T", "A", "R", "O"];
  return (
    <g>
      <rect x="22" y="44" width="256" height="392" fill="url(#tp-dots)" opacity="0.6" />
      {[[30, 108, 1.1, 1], [270, 108, 1.1, -1], [30, 432, 1.1, 1], [270, 432, 1.1, -1]].map(([x, y, s, f], i) => (
        <g key={i}><path d={cloud(x, y, s, f)} fill={T.PAPER} stroke={T.INK} strokeWidth="1.1" /><path d={cloud(x, y, s, f)} fill="url(#tp-h45)" opacity="0.25" /></g>
      ))}
      <path className="tp-spin-rev" style={{ transformOrigin: "150px 236px" }} d={rays(cx, cy, 112, 150, 48)} stroke={T.INK} strokeWidth="0.6" />
      <circle cx={cx} cy={cy} r="108" fill={T.PAPER} stroke={T.INK} strokeWidth="2" />
      <circle cx={cx} cy={cy} r="100" fill="none" stroke={T.INK} strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r="80" fill="none" stroke={T.INK} strokeWidth="1.4" />
      <path d={`M${cx} ${cy} m-100 0 a100 100 0 1 0 200 0 a100 100 0 1 0 -200 0 M${cx} ${cy} m-80 0 a80 80 0 1 1 160 0 a80 80 0 1 1 -160 0`} fill="url(#tp-hh)" fillRule="evenodd" opacity="0.5" />
      <g className="tp-spin" style={{ transformOrigin: "150px 236px" }}>
      {letters.map((L, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 2;
        return <text key={L} x={cx + Math.cos(a) * 90} y={cy + Math.sin(a) * 90 + 6} textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="18" fontWeight="600" fill={T.INK}>{L}</text>;
      })}
      {[0, 1, 2, 3].map((i) => {
        const a = -Math.PI / 4 + (i * Math.PI) / 2;
        return <circle key={i} cx={cx + Math.cos(a) * 90} cy={cy + Math.sin(a) * 90} r="4" fill={T.PAPER} stroke={T.INK} strokeWidth="1" />;
      })}
      <path d={rays(cx, cy, 18, 80, 8, Math.PI / 8)} stroke={T.INK} strokeWidth="2.2" />
      <path d={rays(cx, cy, 18, 80, 8, Math.PI / 8)} stroke={T.PAPER} strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r="44" fill="none" stroke={T.INK} strokeWidth="0.8" />
      <path d={petals(cx, cy, 16, 8, 22)} fill={T.PAPER} stroke={T.INK} strokeWidth="1" />
      <circle cx={cx} cy={cy} r="16" fill="url(#tp-dense)" stroke={T.INK} strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r="6" fill={T.PAPER} stroke={T.INK} strokeWidth="1" />
      </g>
      {/* serpent descending the left side */}
      <path d="M40 150 C60 180 30 210 50 240 C70 270 36 300 56 330 C66 346 60 364 48 372" fill="none" stroke={T.INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M40 150 C60 180 30 210 50 240 C70 270 36 300 56 330 C66 346 60 364 48 372" fill="none" stroke={T.PAPER} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 3" />
      <path d="M48 372 l-10 8 l12 -2" fill="none" stroke={T.INK} strokeWidth="1.4" />
    </g>
  );
}

export function MagicianArt() {
  return (
    <g>
      <path className="tp-spin-slow" style={{ transformOrigin: "150px 96px" }} d={rays(150, 96, 26, 150, 56)} stroke={T.INK} strokeWidth="0.5" opacity="0.7" />
      {/* lemniscate */}
      <g className="tp-pulse" style={{ transformOrigin: "150px 96px" }}>
      <path d="M150 96 C130 70 100 70 100 96 C100 122 130 122 150 96 C170 70 200 70 200 96 C200 122 170 122 150 96Z" fill={T.PAPER} stroke={T.INK} strokeWidth="2.4" />
      <path d="M150 96 C130 76 106 78 106 96 C106 114 130 116 150 96 C170 76 194 78 194 96 C194 114 170 116 150 96Z" fill="none" stroke={T.INK} strokeWidth="0.7" />
      </g>
      {/* garland of roses across the top */}
      <path d="M22 60 C70 92 110 64 150 60 C190 64 230 92 278 60" fill="none" stroke={T.INK} strokeWidth="1.2" />
      {[[48, 74], [96, 70], [204, 70], [252, 74]].map(([x, y], i) => (
        <g key={i}>
          <path d={leaf(x - 8, y + 2, 16, 150 + i * 10)} fill={T.PAPER} stroke={T.INK} strokeWidth="0.8" />
          <path d={petals(x, y, 4, 6, 6, i)} fill={T.PAPER} stroke={T.INK} strokeWidth="0.9" />
          <circle cx={x} cy={y} r="3.5" fill="url(#tp-dense)" stroke={T.INK} strokeWidth="0.7" />
        </g>
      ))}
      {/* wand rising through the light */}
      <path d="M150 140 L150 292" stroke={T.INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M150 140 L150 292" stroke={T.PAPER} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="150" cy="136" r="7" fill={T.PAPER} stroke={T.INK} strokeWidth="1.4" />
      <polygon className="tp-twinkle" points={starPoints(150, 136, 16, 4, 4)} fill="none" stroke={T.INK} strokeWidth="0.8" />
      {/* table */}
      <path d="M36 312 H264 L256 330 H44Z" fill={T.PAPER} stroke={T.INK} strokeWidth="1.4" />
      <path d="M44 330 H256 V346 H44Z" fill="url(#tp-h45)" stroke={T.INK} strokeWidth="1.2" />
      <path d="M56 346 V436 M244 346 V436 M76 346 V420 M224 346 V420" stroke={T.INK} strokeWidth="2.4" />
      <path d="M56 380 C100 392 200 392 244 380" fill="none" stroke={T.INK} strokeWidth="0.8" />
      {/* cup */}
      <path d="M62 262 H94 C94 282 86 292 78 294 C70 292 62 282 62 262Z" fill={T.PAPER} stroke={T.INK} strokeWidth="1.3" />
      <path d="M66 266 C68 280 72 288 78 290" fill="none" stroke={T.INK} strokeWidth="0.6" />
      <path d="M78 294 V304 M68 310 H88 L84 304 H72Z" fill={T.PAPER} stroke={T.INK} strokeWidth="1.3" />
      {/* coin with pentacle */}
      <circle cx="122" cy="296" r="15" fill={T.PAPER} stroke={T.INK} strokeWidth="1.4" />
      <circle cx="122" cy="296" r="11.5" fill="none" stroke={T.INK} strokeWidth="0.6" />
      <polygon points={(() => { const p = []; for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 4 * Math.PI / 5; p.push(`${(122 + Math.cos(a) * 10).toFixed(1)},${(296 + Math.sin(a) * 10).toFixed(1)}`); } return p.join(" "); })()} fill="none" stroke={T.INK} strokeWidth="0.8" />
      {/* sword lying across */}
      <path d="M168 306 L252 290" stroke={T.INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M168 306 L252 290" stroke={T.PAPER} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M176 294 L180 316 M162 306 L170 305" stroke={T.INK} strokeWidth="2.2" strokeLinecap="round" />
      {/* wand lying on the table */}
      <path d="M100 312 L140 312" stroke={T.INK} strokeWidth="1.4" />
      {/* lilies at the foot */}
      {[[96, 436], [130, 436], [170, 436], [204, 436]].map(([x, y], i) => (
        <g key={i} fill={T.PAPER} stroke={T.INK} strokeWidth="0.9">
          <path d={`M${x} ${y} C${x - 2} ${y - 20} ${x + 3} ${y - 34} ${x} ${y - 46}`} fill="none" />
          <path d={leaf(x, y - 12, 16, -140 + i * 8)} />
          <path d={`M${x} ${y - 46} l-6 -12 l6 5 l6 -5Z`} />
        </g>
      ))}
    </g>
  );
}

export function StarArt() {
  const cx = 150, cy = 118;
  const small = [[58, 84], [242, 84], [44, 160], [256, 160], [86, 214], [214, 214], [150, 214]];
  return (
    <g>
      <rect x="22" y="44" width="256" height="250" fill="url(#tp-hh)" opacity="0.4" />
      <circle cx={cx} cy={cy} r="62" fill={T.PAPER} stroke={T.INK} strokeWidth="0.6" strokeDasharray="1.5 3" />
      <path className="tp-spin-rev" style={{ transformOrigin: "150px 118px" }} d={rays(cx, cy, 22, 60, 40)} stroke={T.INK} strokeWidth="0.55" />
      <g className="tp-spin-slow" style={{ transformOrigin: "150px 118px" }}>
        <polygon points={starPoints(cx, cy, 56, 15, 8)} fill={T.PAPER} stroke={T.INK} strokeWidth="1.6" />
        <polygon points={starPoints(cx, cy, 40, 13, 8, -Math.PI / 2 + Math.PI / 8)} fill="url(#tp-h45)" stroke={T.INK} strokeWidth="0.8" />
      </g>
      <circle cx={cx} cy={cy} r="9" fill={T.PAPER} stroke={T.INK} strokeWidth="1.2" />
      {small.map(([x, y], i) => (
        <g key={i} className="tp-twinkle" style={{ animationDelay: `${i * 0.45}s` }}>
          <path d={rays(x, y, 6, 13, 8)} stroke={T.INK} strokeWidth="0.5" />
          <polygon points={starPoints(x, y, 11, 3.2, 8)} fill={T.PAPER} stroke={T.INK} strokeWidth="0.9" />
        </g>
      ))}
      {/* hills */}
      <path d="M22 318 C70 280 120 300 160 298 C200 296 236 270 278 276 L278 340 L22 340Z" fill={T.PAPER} stroke={T.INK} strokeWidth="1.2" />
      <path d="M22 318 C70 280 120 300 160 298 C200 296 236 270 278 276 L278 340 L22 340Z" fill="url(#tp-h135)" opacity="0.35" />
      {/* tree with a bird on the right hill */}
      <path d="M236 282 C234 250 240 226 236 200" fill="none" stroke={T.INK} strokeWidth="3" />
      {[[236, 200, 24, -120], [236, 206, 22, -60], [236, 222, 20, -150], [236, 226, 20, -30], [236, 244, 16, -160], [236, 248, 16, -20]].map(([x, y, l, a], i) => (
        <path key={i} d={leaf(x, y, l, a)} fill={T.PAPER} stroke={T.INK} strokeWidth="0.8" />
      ))}
      <path d="M226 204 c-4 -6 -12 -6 -16 -2 c4 0 8 2 10 5 M220 206 l-14 8" fill="none" stroke={T.INK} strokeWidth="1.1" />
      {/* pool with the star's reflection */}
      <path d="M22 340 H278 V436 H22Z" fill={T.PAPER} stroke={T.INK} strokeWidth="1" />
      {Array.from({ length: 14 }, (_, i) => {
        const y = 348 + i * 6.4, w = 8 + (i % 3) * 3;
        let d = `M30 ${y}`;
        for (let x = 30; x < 272; x += w) d += ` q${w / 4} -2 ${w / 2} 0 t${w / 2} 0`;
        return <path key={i} d={d} fill="none" stroke={T.INK} strokeWidth="0.55" opacity={0.85 - i * 0.03} />;
      })}
      <path d="M150 342 V430 M140 346 V420 M160 346 V420 M132 352 V404 M168 352 V404" stroke={T.PAPER} strokeWidth="3" />
      <path className="tp-shimmer" d="M150 342 V430 M140 346 V420 M160 346 V420" stroke={T.INK} strokeWidth="0.6" strokeDasharray="4 3" />
      {/* flowers on the left bank */}
      {[[40, 318], [56, 312], [72, 308]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y + 22} C${x - 2} ${y + 10} ${x + 2} ${y + 4} ${x} ${y}`} fill="none" stroke={T.INK} strokeWidth="0.8" />
          <path d={petals(x, y, 2.5, 5, 5, i)} fill={T.PAPER} stroke={T.INK} strokeWidth="0.7" />
        </g>
      ))}
    </g>
  );
}

export function SunArt() {
  const cx = 150, cy = 150;
  return (
    <g>
      <rect x="22" y="44" width="256" height="280" fill="url(#tp-dots)" opacity="0.45" />
      <g className="tp-spin-slow" style={{ transformOrigin: "150px 150px" }}>
        <path d={rays(cx, cy, 60, 132, 24)} stroke={T.INK} strokeWidth="1.4" />
        <path d={wavyRays(cx, cy, 60, 118, 24, Math.PI / 24)} fill="none" stroke={T.INK} strokeWidth="0.9" />
      </g>
      <circle cx={cx} cy={cy} r="58" fill={T.PAPER} stroke={T.INK} strokeWidth="2" />
      <circle cx={cx} cy={cy} r="51" fill="none" stroke={T.INK} strokeWidth="0.7" />
      {/* serene face */}
      <path d="M126 140 c6 -6 14 -6 20 0 M154 140 c6 -6 14 -6 20 0" fill="none" stroke={T.INK} strokeWidth="1.3" />
      <path d="M128 144 c5 3 12 3 16 0 M156 144 c5 3 12 3 16 0" fill="none" stroke={T.INK} strokeWidth="0.8" />
      <path d="M150 146 c-2 8 -4 14 0 18 c2 1 4 1 5 0" fill="none" stroke={T.INK} strokeWidth="1" />
      <path d="M138 174 c8 6 16 6 24 0" fill="none" stroke={T.INK} strokeWidth="1.3" />
      <path d={`M${cx} ${cy} m-51 0 a51 51 0 0 0 102 0 a51 51 0 0 0 -102 0Z`} fill="url(#tp-h45)" opacity="0.18" />
      {/* falling drops of light */}
      {[[56, 236], [86, 250], [214, 250], [244, 236], [70, 96], [232, 96]].map(([x, y], i) => (
        <path key={i} className="tp-twinkle" style={{ animationDelay: `${i * 0.5}s` }} d={`M${x} ${y - 8} q5 7 0 10 q-5 -3 0 -10Z`} fill={T.PAPER} stroke={T.INK} strokeWidth="0.9" />
      ))}
      {/* sunflowers above the wall */}
      {[[54, 286, 14], [104, 272, 17], [196, 272, 17], [246, 286, 14]].map(([x, y, r], i) => (
        <g key={i}>
          <path d={`M${x} ${y + r} C${x - 3} ${y + 30} ${x + 3} ${y + 40} ${x} ${y + 56}`} fill="none" stroke={T.INK} strokeWidth="1.4" />
          <path d={leaf(x, y + 38, 18, i % 2 ? -20 : -160)} fill={T.PAPER} stroke={T.INK} strokeWidth="0.8" />
          <g className="tp-sway" style={{ transformOrigin: `${x}px ${y + 56}px`, animationDelay: `${i * 0.8}s` }}>
            <path d={petals(x, y, r * 0.55, 14, r * 0.6, i)} fill={T.PAPER} stroke={T.INK} strokeWidth="0.8" />
            <circle cx={x} cy={y} r={r * 0.55} fill="url(#tp-dense)" stroke={T.INK} strokeWidth="1" />
          </g>
        </g>
      ))}
      {/* garden wall */}
      <rect x="22" y="324" width="256" height="62" fill={T.PAPER} stroke={T.INK} strokeWidth="1.4" />
      {Array.from({ length: 5 }, (_, r) => {
        const y = 324 + r * 12.4;
        const off = r % 2 ? 0 : 16;
        return (
          <g key={r}>
            <path d={`M22 ${y} H278`} stroke={T.INK} strokeWidth="0.8" />
            {Array.from({ length: 9 }, (_, k) => <path key={k} d={`M${22 + off + k * 32} ${y} V${y + 12.4}`} stroke={T.INK} strokeWidth="0.8" />)}
          </g>
        );
      })}
      <rect x="22" y="324" width="256" height="62" fill="url(#tp-h135)" opacity="0.25" />
      <rect x="22" y="386" width="256" height="50" fill="url(#tp-hh)" opacity="0.5" />
      <path d="M22 386 C80 396 220 396 278 386" fill="none" stroke={T.INK} strokeWidth="0.8" />
    </g>
  );
}

export const ART = { education: HermitArt, work: WheelArt, about: MagicianArt, projects: StarArt, contact: SunArt };

// Marks every stroked shape so the engraving can draw itself in, line by line, when the card turns over.
export function useDrawPrep(ref) {
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    svg.querySelectorAll("path,line,polygon,circle,rect,ellipse").forEach((el, i) => {
      const animated = [...el.classList].some((c) => c.startsWith("tp-"));
      if (!animated && el.getAttribute("stroke") && el.getAttribute("stroke") !== "none" && !el.getAttribute("stroke-dasharray")) {
        el.setAttribute("pathLength", "1");
        el.classList.add("tp-ink");
        el.style.setProperty("--d", `${Math.min(i * 6, 900)}ms`);
      }
    });
  }, [ref]);
}

export function CardFace({ card, uid = "a" }) {
  const Art = ART[card.id];
  const ref = useRef(null);
  useDrawPrep(ref);
  return (
    <svg ref={ref} viewBox="0 0 300 520" className="tp-svg" role="img" aria-label={`${card.arcana}, the ${card.label} card`}>
      <defs><clipPath id={`tp-clip-${card.id}-${uid}`}><rect x="22" y="44" width="256" height="392" /></clipPath></defs>
      <rect x="3" y="3" width="294" height="514" rx="14" fill={T.PAPER} stroke={T.INK} strokeWidth="2" />
      <rect x="12" y="12" width="276" height="496" rx="8" fill="none" stroke={T.INK} strokeWidth="0.8" />
      <text x="150" y="35" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="20" fontWeight="600" letterSpacing="2" fill={T.INK}>{card.numeral}</text>
      <path d="M96 29 H124 M176 29 H204" stroke={T.INK} strokeWidth="0.8" />
      <g clipPath={`url(#tp-clip-${card.id}-${uid})`}><Art /></g>
      <rect x="22" y="44" width="256" height="392" fill="none" stroke={T.INK} strokeWidth="1.6" />
      <path d={flourish(26, 48, 1, 1) + flourish(274, 48, -1, 1) + flourish(26, 432, 1, -1) + flourish(274, 432, -1, -1)} fill="none" stroke={T.INK} strokeWidth="0.9" />
      <rect x="22" y="446" width="256" height="48" fill={T.PAPER} stroke={T.INK} strokeWidth="1.2" />
      <rect x="27" y="451" width="246" height="38" fill="none" stroke={T.INK} strokeWidth="0.6" />
      <text x="150" y="477" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize={card.arcana.length > 12 ? 16 : 19} fontWeight="600" letterSpacing={card.arcana.length > 12 ? 1.6 : 3} fill={T.INK}>{card.arcana.toUpperCase()}</text>
    </svg>
  );
}

export function CardBack({ fit = "xMidYMid meet" }) {
  return (
    <svg viewBox="0 0 300 520" className="tp-svg" preserveAspectRatio={fit} aria-hidden="true">
      <rect x="3" y="3" width="294" height="514" rx="14" fill={T.PAPER} stroke={T.INK} strokeWidth="2" />
      <rect x="14" y="14" width="272" height="492" rx="8" fill="url(#tp-lattice)" stroke={T.INK} strokeWidth="1" />
      <rect x="26" y="26" width="248" height="468" rx="4" fill="none" stroke={T.INK} strokeWidth="0.8" />
      <circle cx="150" cy="260" r="86" fill={T.PAPER} stroke={T.INK} strokeWidth="1.6" />
      <circle cx="150" cy="260" r="78" fill="none" stroke={T.INK} strokeWidth="0.7" />
      <path d={rays(150, 260, 40, 76, 48)} stroke={T.INK} strokeWidth="0.55" />
      <polygon points={starPoints(150, 260, 62, 20, 8)} fill={T.PAPER} stroke={T.INK} strokeWidth="1.2" />
      <polygon points={starPoints(150, 260, 44, 16, 8, -Math.PI / 2 + Math.PI / 8)} fill="url(#tp-h45)" stroke={T.INK} strokeWidth="0.8" />
      <path d="M150 236 a24 24 0 1 0 18 40 a18 18 0 1 1 -18 -40Z" fill={T.PAPER} stroke={T.INK} strokeWidth="1.2" />
      {[[150, 80], [150, 440], [62, 260], [238, 260]].map(([x, y], i) => (
        <g key={i}><circle cx={x} cy={y} r="16" fill={T.PAPER} stroke={T.INK} strokeWidth="1" /><polygon points={starPoints(x, y, 11, 3.5, 4)} fill={T.PAPER} stroke={T.INK} strokeWidth="0.8" /></g>
      ))}
    </svg>
  );
}
