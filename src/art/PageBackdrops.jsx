// The muted engraved scene behind each card's page. Each one is drawn in a wide 1600 × 1000 field
// that fills the page edge to edge, with most of the detail at the sides so the text column stays clear.
// Every scene has its own slow motion. All animations either begin from their resting pose or start
// part-way through their cycle (negative delays), so nothing jumps into place when a page opens.
import { T } from "../theme.js";
import { starPoints, rays, petals, leaf } from "./shapes.js";

const W = 1600, H = 1000;

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

// A scatter of small stars, kept out of the very centre.
function StarDust({ seed, count = 70, maxY = 0.82 }) {
  const r = rng(seed);
  const out = [];
  for (let i = 0; i < count; i++) {
    let x = r() * W, y = r() * H * maxY;
    if (x > 600 && x < 1000) x = x < 800 ? x - 260 : x + 260;
    const big = r() < 0.18;
    out.push(big
      ? <polygon key={i} className="tp-twinkle" style={{ animationDelay: `${-((i * 0.37) % 4)}s` }} points={starPoints(x, y, 6 + r() * 4, 1.6, 4)} fill={T.INK} />
      : <circle key={i} cx={x} cy={y} r={0.8 + r() * 1.2} fill={T.INK} />);
  }
  return <g>{out}</g>;
}

function fan(cx, cy, r1, r2, n, a0, a1) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = a0 + ((a1 - a0) * i) / (n - 1), long = i % 3 === 0 ? 1 : 0.78;
    d += `M${(cx + Math.cos(a) * r1).toFixed(1)} ${(cy + Math.sin(a) * r1).toFixed(1)}L${(cx + Math.cos(a) * r2 * long).toFixed(1)} ${(cy + Math.sin(a) * r2 * long).toFixed(1)}`;
  }
  return d;
}

function ridge(seed, base, amp, step) {
  const r = rng(seed);
  let d = `M-20 ${H + 20} L-20 ${base}`;
  for (let x = -20; x < W + 40; x += step) {
    const peak = base - amp * (0.45 + r() * 0.55);
    d += ` L${x + step * (0.35 + r() * 0.3)} ${peak.toFixed(1)} L${x + step} ${(base - r() * amp * 0.25).toFixed(1)}`;
  }
  return d + ` L${W + 20} ${H + 20} Z`;
}

// A soft wavy line twice the width of the page, so it can drift sideways and loop without a seam.
// Its wave length and dash pattern must both divide 1600 evenly.
function mistLine(y, amp, wave) {
  let d = `M0 ${y}`;
  for (let x = 0; x <= W * 2; x += wave) d += ` q${wave / 4} ${-amp} ${wave / 2} 0 t${wave / 2} 0`;
  return d;
}

/* IX The Hermit: the lantern's light pulses outward over the mountains while mist drifts between them */
function Hermit() {
  const ink = { fill: "none", stroke: T.INK, strokeLinecap: "round", strokeLinejoin: "round" };
  const lx = 270, ly = 330;
  return (
    <g>
      <StarDust seed={9} />
      <path d="M1350 170 a46 46 0 1 0 38 68 a36 36 0 1 1 -38 -68Z" fill={T.INK} opacity="0.85" />
      <g className="bd-turn-slow" style={{ transformOrigin: `${lx}px ${ly}px` }}>
        <path d={rays(lx, ly, 40, 520, 64)} {...ink} strokeWidth="0.7" />
      </g>
      {[0, 1, 2].map((i) => (
        <circle key={i} className="bd-pulse" style={{ animationDelay: `${-i * 2.4}s` }} cx={lx} cy={ly} r="60" {...ink} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
      <circle cx={lx} cy={ly} r="44" {...ink} strokeWidth="0.8" strokeDasharray="2 7" />
      <polygon className="tp-twinkle" points={starPoints(lx, ly, 16, 6, 6)} fill={T.INK} />
      <path d={ridge(3, 700, 220, 150)} fill="url(#tp-h135)" stroke={T.INK} strokeWidth="1" opacity="0.6" />
      <g className="bd-drift" style={{ animationDuration: "90s" }}>
        <path d={mistLine(690, 10, 160)} {...ink} strokeWidth="1" strokeDasharray="60 40" opacity="0.7" />
      </g>
      <path d={ridge(7, 800, 230, 190)} fill={T.PAPER} stroke={T.INK} strokeWidth="1.4" />
      <path d={ridge(7, 800, 230, 190)} fill="url(#tp-h45)" opacity="0.45" />
      <g className="bd-drift" style={{ animationDuration: "64s", animationDirection: "reverse" }}>
        <path d={mistLine(800, 8, 200)} {...ink} strokeWidth="1" strokeDasharray="100 60" opacity="0.6" />
      </g>
      <path d={ridge(11, 900, 160, 240)} fill={T.PAPER} stroke={T.INK} strokeWidth="1.6" />
      <path d="M1180 1000 C1220 940 1330 930 1300 880 C1270 830 1180 850 1220 800 C1250 770 1320 760 1330 720" {...ink} strokeWidth="1.4" strokeDasharray="5 6" />
    </g>
  );
}

/* X Wheel of Fortune: planets travel their orbits while the two great wheel rims turn */
function Wheel({ calm }) {
  const ink = { fill: "none", stroke: T.INK };
  const rim = (cx, cy, R, n) => (
    <g>
      <circle cx={cx} cy={cy} r={R} {...ink} strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r={R - 22} {...ink} strokeWidth="0.8" />
      <path d={rays(cx, cy, R - 22, R, n * 4)} {...ink} strokeWidth="0.7" />
      <path d={rays(cx, cy, 30, R - 22, n, Math.PI / n)} {...ink} strokeWidth="2.4" />
      <circle cx={cx} cy={cy} r={R * 0.42} {...ink} strokeWidth="0.8" />
    </g>
  );
  const orbits = [320, 440, 560, 680, 800, 920];
  const ellipse = (rx) => { const ry = rx * 0.34; return `M${800 - rx} 500 A${rx} ${ry} 0 1 0 ${800 + rx} 500 A${rx} ${ry} 0 1 0 ${800 - rx} 500`; };
  return (
    <g>
      <StarDust seed={10} count={50} />
      <g className="bd-turn-rev" style={{ transformOrigin: "120px 900px" }}>{rim(120, 900, 360, 8)}</g>
      <g className="bd-turn" style={{ transformOrigin: "1490px 120px" }}>{rim(1490, 120, 300, 8)}</g>
      <g transform="rotate(-12 800 500)">
        {orbits.map((rx, i) => (
          <path key={i} d={ellipse(rx)} {...ink} strokeWidth={i % 2 ? 0.8 : 1.1} strokeDasharray={i % 2 ? "3 8" : "none"} />
        ))}
        {orbits.map((rx, i) => {
          const size = 8 + (i % 3) * 4, dur = 40 + i * 14, start = (i * 0.29) % 1;
          if (calm) {
            const a = 0.6 + i * 1.7, x = 800 + Math.cos(a) * rx, y = 500 + Math.sin(a) * rx * 0.34;
            return <circle key={`p${i}`} cx={x} cy={y} r={size} fill={T.PAPER} stroke={T.INK} strokeWidth="1.2" />;
          }
          return (
            <g key={`p${i}`}>
              <circle r={size} fill={T.PAPER} stroke={T.INK} strokeWidth="1.2">
                <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={ellipse(rx)} begin={`${-start * dur}s`} />
              </circle>
              {i % 2 === 0 && (
                <circle r={size + 6} fill="none" stroke={T.INK} strokeWidth="0.6">
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={ellipse(rx)} begin={`${-start * dur}s`} />
                </circle>
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
}

/* I The Magician: two magic circles turn against each other, an infinity loop binds them, light flows
   around the loop, and the wand stands between them as a staff of light */
function Magician() {
  const ink = { fill: "none", stroke: T.INK, strokeLinecap: "round", strokeLinejoin: "round" };
  // a lemniscate whose two loops encircle the two magic circles
  const loop = "M800 500 C690 330 520 250 330 250 C170 250 70 370 70 500 C70 630 170 750 330 750 C520 750 690 670 800 500 C910 330 1080 250 1270 250 C1430 250 1530 370 1530 500 C1530 630 1430 750 1270 750 C1080 750 910 670 800 500Z";
  const circle = (cx, cy, up) => {
    const tri = (R, rot) => { const p = []; for (let i = 0; i < 3; i++) { const a = rot + (i * Math.PI * 2) / 3; p.push(`${(cx + Math.cos(a) * R).toFixed(1)},${(cy + Math.sin(a) * R).toFixed(1)}`); } return p.join(" "); };
    const sq = (R, rot) => { const p = []; for (let i = 0; i < 4; i++) { const a = rot + (i * Math.PI) / 2; p.push(`${(cx + Math.cos(a) * R).toFixed(1)},${(cy + Math.sin(a) * R).toFixed(1)}`); } return p.join(" "); };
    return (
      <g>
        <g className={up ? "bd-turn-slow" : "bd-turn-rev"} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r="200" {...ink} strokeWidth="1.6" />
          <circle cx={cx} cy={cy} r="186" {...ink} strokeWidth="0.7" />
          <path d={rays(cx, cy, 186, 200, 72)} {...ink} strokeWidth="0.6" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2, x = cx + Math.cos(a) * 172, y = cy + Math.sin(a) * 172;
            return <polygon key={i} points={starPoints(x, y, i % 2 ? 4 : 7, 1.6, 4)} fill={T.INK} />;
          })}
          <circle cx={cx} cy={cy} r="156" {...ink} strokeWidth="0.8" strokeDasharray="2 6" />
        </g>
        <g className={up ? "bd-turn-rev" : "bd-turn-slow"} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <polygon points={sq(148, Math.PI / 4)} {...ink} strokeWidth="1" />
          <polygon points={sq(148, 0)} {...ink} strokeWidth="0.7" />
          <circle cx={cx} cy={cy} r="104" {...ink} strokeWidth="1" />
          <polygon points={tri(104, up ? -Math.PI / 2 : Math.PI / 2)} {...ink} strokeWidth="1.1" />
        </g>
        {up ? (
          <g>
            <path d={rays(cx, cy, 30, 46, 16)} {...ink} strokeWidth="1" />
            <circle cx={cx} cy={cy} r="24" fill={T.PAPER} stroke={T.INK} strokeWidth="1.4" />
            <circle cx={cx} cy={cy} r="7" fill={T.INK} />
          </g>
        ) : (
          <path d={`M${cx + 10} ${cy - 46} a46 46 0 1 0 0 92 a36 36 0 1 1 0 -92Z`} fill={T.INK} />
        )}
      </g>
    );
  };
  // orbits around a magic circle, with small satellites that travel them
  const orbit = (cx, cy, dir) => (
    <g>
      <circle cx={cx} cy={cy} r="236" {...ink} strokeWidth="0.7" strokeDasharray="2 9" />
      <circle cx={cx} cy={cy} r="266" {...ink} strokeWidth="0.5" />
      <g className={dir > 0 ? "bd-turn" : "bd-turn-rev"} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        {[0.4, 2.5, 4.4].map((a, i) => (
          <g key={i}>
            <circle cx={cx + Math.cos(a) * 236} cy={cy + Math.sin(a) * 236} r={i === 1 ? 9 : 6} fill={T.PAPER} stroke={T.INK} strokeWidth="1.1" />
            {i === 1 && <circle cx={cx + Math.cos(a) * 236} cy={cy + Math.sin(a) * 236} r="15" {...ink} strokeWidth="0.6" />}
          </g>
        ))}
        <polygon points={starPoints(cx + Math.cos(3.4) * 266, cy + Math.sin(3.4) * 266, 7, 1.8, 4)} fill={T.INK} />
      </g>
    </g>
  );
  return (
    <g>
      <StarDust seed={1} count={72} maxY={0.98} />
      {/* as above, so below: light pours down from the top and rises from the bottom */}
      <g className="bd-breathe" style={{ transformOrigin: "800px -160px" }}>
        <path d={fan(800, -160, 230, 860, 53, Math.PI * 0.05, Math.PI * 0.95)} {...ink} strokeWidth="0.9" />
      </g>
      <g className="bd-breathe" style={{ transformOrigin: "800px 1160px", animationDelay: "-5s" }}>
        <path d={fan(800, 1160, 230, 860, 53, Math.PI * 1.05, Math.PI * 1.95)} {...ink} strokeWidth="0.9" />
      </g>
      <path d="M560 70 A520 520 0 0 0 1040 70" {...ink} strokeWidth="0.9" strokeDasharray="1 7" />
      <path d="M560 930 A520 520 0 0 1 1040 930" {...ink} strokeWidth="0.9" strokeDasharray="1 7" />
      {/* rings of light radiating in from each corner */}
      {[[0, 0, 0], [W, 0, 1], [0, H, 3], [W, H, 2]].map(([cx, cy, q], k) => (
        <g key={k}>
          {[90, 140, 196, 258].map((rr, i) => {
            const a0 = (q * Math.PI) / 2, a1 = a0 + Math.PI / 2;
            const x0 = cx + Math.cos(a0) * rr, y0 = cy + Math.sin(a0) * rr, x1 = cx + Math.cos(a1) * rr, y1 = cy + Math.sin(a1) * rr;
            return <path key={i} d={`M${x0.toFixed(1)} ${y0.toFixed(1)} A${rr} ${rr} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`} {...ink} strokeWidth={i === 1 ? 1.2 : 0.7} strokeDasharray={i % 2 ? "none" : "2 8"} />;
          })}
          <polygon className="tp-twinkle" style={{ animationDelay: `${-k * 0.9}s` }}
            points={starPoints(cx + (cx ? -1 : 1) * 118, cy + (cy ? -1 : 1) * 118, 10, 2.4, 4)} fill={T.INK} />
        </g>
      ))}
      {orbit(330, 500, 1)}
      {orbit(1270, 500, -1)}
      {/* the wand: a vertical staff of light through the middle */}
      <path d="M800 40 V960" {...ink} strokeWidth="1" />
      <path d="M792 40 V960 M808 40 V960" {...ink} strokeWidth="0.5" strokeDasharray="1 7" />
      <polygon points="800,14 812,40 800,66 788,40" fill={T.PAPER} stroke={T.INK} strokeWidth="1.2" />
      <polygon points="800,934 812,960 800,986 788,960" fill={T.PAPER} stroke={T.INK} strokeWidth="1.2" />
      {circle(330, 500, true)}
      {circle(1270, 500, false)}
      <path d={loop} {...ink} strokeWidth="1.2" />
      <path d={loop} {...ink} strokeWidth="0.6" strokeDasharray="1 9" transform="translate(0 -14)" />
      <path d={loop} {...ink} strokeWidth="0.6" strokeDasharray="2 10" transform="translate(800 500) scale(1.07 1.36) translate(-800 -500)" />
      {/* two points of light travelling the loop */}
      <path className="bd-flow" d={loop} pathLength="1000" {...ink} strokeWidth="3.2" strokeDasharray="34 966" />
      <path className="bd-flow" style={{ animationDelay: "-11s" }} d={loop} pathLength="1000" {...ink} strokeWidth="3.2" strokeDasharray="34 966" />
      <polygon className="tp-twinkle" points={starPoints(800, 500, 18, 4, 4)} fill={T.INK} />
    </g>
  );
}

/* XVII The Star: a field of stars joined into constellations, two great stars, water below,
   and now and then a shooting star */
function StarField() {
  const r = rng(17);
  const pts = Array.from({ length: 46 }, () => {
    let x = r() * W, y = 40 + r() * 680;
    if (x > 560 && x < 1040) x = x < 800 ? x - 320 : x + 320;
    return [x, y, 3 + r() * 7];
  });
  const groups = [[0, 3, 7, 12, 18], [5, 9, 14, 20], [22, 25, 29, 33, 37], [30, 34, 40, 44]];
  const ripples = [];
  for (let k = 0; k < 18; k++) {
    const y = 820 + k * 10, w = 26 + (k % 4) * 8;
    let d = `M0 ${y}`;
    for (let x = 0; x < W; x += w) d += ` q${w / 4} -3 ${w / 2} 0 t${w / 2} 0`;
    ripples.push(<path key={k} d={d} fill="none" stroke={T.INK} strokeWidth="0.7" opacity={1 - k * 0.04} />);
  }
  const great = (cx, cy, R) => (
    <g>
      <path className="bd-turn-rev" style={{ transformOrigin: `${cx}px ${cy}px` }} d={rays(cx, cy, R * 0.5, R * 2.3, 48)} stroke={T.INK} strokeWidth="0.5" />
      <g className="bd-turn-slow" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <polygon points={starPoints(cx, cy, R, R * 0.26, 8)} fill={T.PAPER} stroke={T.INK} strokeWidth="1.8" />
        <polygon points={starPoints(cx, cy, R * 0.7, R * 0.22, 8, -Math.PI / 2 + Math.PI / 8)} fill="url(#tp-h45)" stroke={T.INK} strokeWidth="0.9" />
      </g>
    </g>
  );
  return (
    <g>
      {groups.map((g, i) => <path key={i} d={g.map((p, j) => `${j ? "L" : "M"}${pts[p][0]} ${pts[p][1]}`).join("")} fill="none" stroke={T.INK} strokeWidth="0.7" strokeDasharray="1 5" />)}
      {pts.map(([x, y, s], i) => (
        <polygon key={i} className="tp-twinkle" style={{ animationDelay: `${-((i * 0.41) % 4)}s` }} points={starPoints(x, y, s, s * 0.28, i % 3 ? 4 : 8)} fill={T.INK} />
      ))}
      {[[120, 90, 0], [980, 60, -5.5], [420, 210, -9]].map(([x, y, d], i) => (
        <g key={`s${i}`} transform={`translate(${x} ${y}) rotate(18)`}>
          <g className="bd-shoot" style={{ animationDelay: `${d}s` }}>
            <path d="M0 0 H-140" stroke={T.INK} strokeWidth="1.4" strokeLinecap="round" />
            <path d="M0 0 H-60" stroke={T.INK} strokeWidth="2.4" strokeLinecap="round" />
            <polygon points={starPoints(0, 0, 6, 1.6, 4)} fill={T.INK} />
          </g>
        </g>
      ))}
      {great(290, 300, 90)}
      {great(1320, 560, 70)}
      {ripples}
      <path className="tp-shimmer" d="M290 830 V990 M280 840 V970 M300 840 V970 M1320 830 V990 M1310 840 V970 M1330 840 V970" stroke={T.INK} strokeWidth="1" strokeDasharray="5 5" />
    </g>
  );
}

/* XIX The Sun: rays sway as heat rings rise off the sun, drops of light drift down, flowers sway */
function Sun() {
  const ink = { fill: "none", stroke: T.INK, strokeLinecap: "round" };
  const flower = (x, y, s, i) => (
    <g key={`${x}-${y}`}>
      <path d={`M${x} ${y + 20 * s} C${x - 8} ${y + 80 * s} ${x + 8} ${y + 120 * s} ${x} ${940}`} {...ink} strokeWidth="1.6" />
      <path d={leaf(x, y + 90 * s, 40 * s, i % 2 ? -25 : -155)} fill={T.PAPER} stroke={T.INK} strokeWidth="1" />
      <g className="bd-sway" style={{ transformOrigin: `${x}px ${y + 20 * s}px`, animationDelay: `${-i * 1.3}s` }}>
        <path d={petals(x, y, 20 * s, 16, 24 * s, i)} fill={T.PAPER} stroke={T.INK} strokeWidth="1" />
        <circle cx={x} cy={y} r={20 * s} fill="url(#tp-dense)" stroke={T.INK} strokeWidth="1.2" />
      </g>
    </g>
  );
  const bricks = [];
  for (let row = 0; row < 4; row++) {
    const y = 940 + row * 16;
    bricks.push(<path key={`r${row}`} d={`M0 ${y} H${W}`} stroke={T.INK} strokeWidth="0.9" />);
    for (let x = (row % 2) * 30; x < W; x += 60) bricks.push(<path key={`b${row}-${x}`} d={`M${x} ${y} V${y + 16}`} stroke={T.INK} strokeWidth="0.9" />);
  }
  return (
    <g>
      <StarDust seed={19} count={30} maxY={0.6} />
      <g className="bd-rays" style={{ transformOrigin: "800px 1000px" }}>
        <path d={rays(800, 1000, 300, 1300, 31, Math.PI)} {...ink} strokeWidth="1.3" />
        <path d={rays(800, 1000, 300, 900, 30, Math.PI + Math.PI / 31)} {...ink} strokeWidth="0.6" />
      </g>
      {[0, 1, 2].map((i) => (
        <path key={i} className="bd-heat" style={{ animationDelay: `${-i * 2.6}s`, transformOrigin: "800px 1000px" }}
          d="M560 1000 A240 240 0 0 1 1040 1000" {...ink} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
      {[360, 430].map((rr, i) => <path key={rr} d={`M${800 - rr} 1000 A${rr} ${rr} 0 0 1 ${800 + rr} 1000`} {...ink} strokeWidth="0.8" strokeDasharray={i ? "2 8" : "none"} />)}
      <path d="M560 1000 A240 240 0 0 1 1040 1000Z" fill={T.PAPER} stroke={T.INK} strokeWidth="1.8" />
      <path d="M560 1000 A240 240 0 0 1 1040 1000Z" fill="url(#tp-h45)" opacity="0.35" />
      {[[165, 650, 1.2], [290, 720, 0.9], [405, 780, 0.7], [1435, 640, 1.2], [1310, 710, 0.9], [1195, 780, 0.7]].map(([x, y, s], i) => flower(x, y, s, i))}
      {bricks}
      {[[520, 240], [1080, 240], [380, 120], [1220, 120], [700, 80], [900, 80], [240, 300], [1360, 300]].map(([x, y], i) => (
        <path key={i} className="bd-fall" style={{ animationDelay: `${-i * 1.7}s` }} d={`M${x} ${y - 14} q9 12 0 18 q-9 -6 0 -18Z`} fill={T.PAPER} stroke={T.INK} strokeWidth="1" />
      ))}
    </g>
  );
}

const SCENES = { education: Hermit, work: Wheel, about: Magician, projects: StarField, contact: Sun };

export function PageBackdrop({ id, calm = false }) {
  const Scene = SCENES[id];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="td-backdrop" aria-hidden="true">
      <Scene calm={calm} />
    </svg>
  );
}
