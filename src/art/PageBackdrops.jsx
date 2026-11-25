// The muted engraved scene behind each card's page. Each one is drawn in a wide 1600 × 1000 field
// that fills the page edge to edge, with most of the detail at the sides so the text column stays clear.
import { T } from "../theme.js";
import { starPoints, rays, petals, leaf } from "./shapes.js";

const W = 1600, H = 1000;

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

// A scatter of small stars, kept out of the very centre.
function StarDust({ seed, count = 70 }) {
  const r = rng(seed);
  const out = [];
  for (let i = 0; i < count; i++) {
    let x = r() * W, y = r() * H * 0.82;
    if (x > 600 && x < 1000) x = x < 800 ? x - 260 : x + 260;
    const big = r() < 0.18;
    out.push(big
      ? <polygon key={i} className="tp-twinkle" style={{ animationDelay: `${(i * 0.37) % 4}s` }} points={starPoints(x, y, 6 + r() * 4, 1.6, 4)} fill={T.INK} />
      : <circle key={i} cx={x} cy={y} r={0.8 + r() * 1.2} fill={T.INK} />);
  }
  return <g>{out}</g>;
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

/* IX The Hermit: night over the mountains, a lantern's light from one side */
function Hermit() {
  const ink = { fill: "none", stroke: T.INK, strokeLinecap: "round", strokeLinejoin: "round" };
  return (
    <g>
      <StarDust seed={9} />
      <path d="M1350 170 a46 46 0 1 0 38 68 a36 36 0 1 1 -38 -68Z" fill={T.INK} opacity="0.85" />
      <g className="tp-flicker">
        <path d={rays(270, 330, 40, 520, 64)} {...ink} strokeWidth="0.7" />
        {[70, 120, 180].map((rr, i) => <circle key={i} cx="270" cy="330" r={rr} {...ink} strokeWidth="0.8" strokeDasharray="2 7" />)}
      </g>
      <polygon points={starPoints(270, 330, 16, 6, 6)} fill={T.INK} />
      <path d={ridge(3, 700, 220, 150)} fill="url(#tp-h135)" stroke={T.INK} strokeWidth="1" opacity="0.6" />
      <path d={ridge(7, 800, 230, 190)} fill={T.PAPER} stroke={T.INK} strokeWidth="1.4" />
      <path d={ridge(7, 800, 230, 190)} fill="url(#tp-h45)" opacity="0.45" />
      <path d={ridge(11, 900, 160, 240)} fill={T.PAPER} stroke={T.INK} strokeWidth="1.6" />
      <path d="M1180 1000 C1220 940 1330 930 1300 880 C1270 830 1180 850 1220 800 C1250 770 1320 760 1330 720" {...ink} strokeWidth="1.4" strokeDasharray="5 6" />
    </g>
  );
}

/* X Wheel of Fortune: great orbits across the page, wheel rims rising from the corners */
function Wheel() {
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
  return (
    <g>
      <StarDust seed={10} count={50} />
      <g className="tp-spin-rev" style={{ transformOrigin: "120px 900px" }}>{rim(120, 900, 360, 8)}</g>
      <g className="tp-spin" style={{ transformOrigin: "1490px 120px" }}>{rim(1490, 120, 300, 8)}</g>
      <g transform="rotate(-12 800 500)">
        {orbits.map((rx, i) => (
          <ellipse key={i} cx="800" cy="500" rx={rx} ry={rx * 0.34} {...ink} strokeWidth={i % 2 ? 0.8 : 1.1} strokeDasharray={i % 2 ? "3 8" : "none"} />
        ))}
        {orbits.map((rx, i) => {
          const a = 0.6 + i * 1.7, x = 800 + Math.cos(a) * rx, y = 500 + Math.sin(a) * rx * 0.34;
          return (
            <g key={`p${i}`}>
              <circle cx={x} cy={y} r={8 + (i % 3) * 4} fill={T.PAPER} stroke={T.INK} strokeWidth="1.2" />
              {i % 2 === 0 && <circle cx={x} cy={y} r={14 + (i % 3) * 5} {...ink} strokeWidth="0.6" />}
            </g>
          );
        })}
      </g>
    </g>
  );
}

/* I The Magician: infinity stretched across the page, light behind it, the four tools in the corners */
function Magician() {
  const ink = { fill: "none", stroke: T.INK, strokeLinecap: "round", strokeLinejoin: "round" };
  const inf = (s, w) => `M800 500 C${800 - 220 * s} ${500 - 260 * w} ${800 - 720 * s} ${500 - 260 * w} ${800 - 720 * s} 500 C${800 - 720 * s} ${500 + 260 * w} ${800 - 220 * s} ${500 + 260 * w} 800 500 C${800 + 220 * s} ${500 - 260 * w} ${800 + 720 * s} ${500 - 260 * w} ${800 + 720 * s} 500 C${800 + 720 * s} ${500 + 260 * w} ${800 + 220 * s} ${500 + 260 * w} 800 500Z`;
  const vine = [];
  for (let x = 0; x <= W; x += 20) vine.push(`${x ? "L" : "M"}${x} ${(70 + Math.sin(x / 80) * 22).toFixed(1)}`);
  return (
    <g>
      <StarDust seed={1} count={40} />
      <g className="tp-spin-slow" style={{ transformOrigin: "800px 500px" }}>
        <path d={rays(800, 500, 120, 900, 120)} {...ink} strokeWidth="0.5" />
      </g>
      <path d={inf(1, 1)} {...ink} strokeWidth="2" />
      <path d={inf(0.93, 0.82)} {...ink} strokeWidth="0.8" />
      <path d={vine.join("")} {...ink} strokeWidth="1.2" />
      {Array.from({ length: 16 }, (_, i) => {
        const x = 50 + i * 100, y = 70 + Math.sin(x / 80) * 22;
        return (
          <g key={i}>
            <path d={leaf(x, y, 22, i % 2 ? -50 : 130)} fill={T.PAPER} stroke={T.INK} strokeWidth="0.9" />
            {i % 2 === 0 && <><path d={petals(x + 18, y + 6, 4, 6, 7, i)} fill={T.PAPER} stroke={T.INK} strokeWidth="0.9" /><circle cx={x + 18} cy={y + 6} r="4" fill="url(#tp-dense)" stroke={T.INK} strokeWidth="0.7" /></>}
          </g>
        );
      })}
      {/* cup, top left */}
      <g transform="translate(215 250)" {...ink} strokeWidth="1.6">
        <path d="M-50 -40 H50 C50 20 22 46 0 50 C-22 46 -50 20 -50 -40Z" fill={T.PAPER} />
        <path d="M-40 -30 C-36 10 -16 34 0 38" strokeWidth="0.8" /><path d="M0 50 V80 M-34 92 H34 L24 80 H-24Z" />
      </g>
      {/* coin with pentacle, top right */}
      <g transform="translate(1385 255)" {...ink} strokeWidth="1.6">
        <circle r="62" fill={T.PAPER} /><circle r="50" strokeWidth="0.8" />
        <polygon points={(() => { const p = []; for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i * 4 * Math.PI) / 5; p.push(`${(Math.cos(a) * 44).toFixed(1)},${(Math.sin(a) * 44).toFixed(1)}`); } return p.join(" "); })()} strokeWidth="1" />
      </g>
      {/* sword, bottom left */}
      <g transform="translate(235 760) rotate(-38)" {...ink} strokeWidth="1.6">
        <path d="M0 -170 L12 -150 L12 80 L-12 80 L-12 -150Z" fill={T.PAPER} /><path d="M0 -150 V76" strokeWidth="0.7" />
        <path d="M-52 80 H52 M0 80 V140" strokeWidth="5" /><circle cy="150" r="10" fill={T.PAPER} />
      </g>
      {/* wand, bottom right */}
      <g transform="translate(1370 760) rotate(28)" {...ink} strokeWidth="1.6">
        <path d="M-9 -170 H9 V170 H-9Z" fill={T.PAPER} /><path d="M0 -150 V150" strokeWidth="0.6" />
        <circle cy="-184" r="16" fill={T.PAPER} /><circle cy="184" r="16" fill={T.PAPER} />
        {[-110, -40, 30, 100].map((y) => <path key={y} d={leaf(9, y, 30, -30)} fill={T.PAPER} strokeWidth="0.9" />)}
      </g>
    </g>
  );
}

/* XVII The Star: a field of stars joined into constellations, two great stars, water below */
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
      <path className="tp-spin-rev" style={{ transformOrigin: `${cx}px ${cy}px` }} d={rays(cx, cy, R * 0.5, R * 2.3, 48)} stroke={T.INK} strokeWidth="0.5" />
      <g className="tp-spin-slow" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <polygon points={starPoints(cx, cy, R, R * 0.26, 8)} fill={T.PAPER} stroke={T.INK} strokeWidth="1.8" />
        <polygon points={starPoints(cx, cy, R * 0.7, R * 0.22, 8, -Math.PI / 2 + Math.PI / 8)} fill="url(#tp-h45)" stroke={T.INK} strokeWidth="0.9" />
      </g>
    </g>
  );
  return (
    <g>
      {groups.map((g, i) => <path key={i} d={g.map((p, j) => `${j ? "L" : "M"}${pts[p][0]} ${pts[p][1]}`).join("")} fill="none" stroke={T.INK} strokeWidth="0.7" strokeDasharray="1 5" />)}
      {pts.map(([x, y, s], i) => (
        <polygon key={i} className="tp-twinkle" style={{ animationDelay: `${(i * 0.41) % 4}s` }} points={starPoints(x, y, s, s * 0.28, i % 3 ? 4 : 8)} fill={T.INK} />
      ))}
      {great(290, 300, 90)}
      {great(1320, 560, 70)}
      {ripples}
      <path className="tp-shimmer" d="M290 830 V990 M280 840 V970 M300 840 V970 M1320 830 V990 M1310 840 V970 M1330 840 V970" stroke={T.INK} strokeWidth="1" strokeDasharray="5 5" />
    </g>
  );
}

/* XIX The Sun: a sun rising from the bottom edge, rays to every corner, sunflowers on a garden wall */
function Sun() {
  const ink = { fill: "none", stroke: T.INK, strokeLinecap: "round" };
  const flower = (x, y, s, i) => (
    <g key={`${x}-${y}`}>
      <path d={`M${x} ${y + 20 * s} C${x - 8} ${y + 80 * s} ${x + 8} ${y + 120 * s} ${x} ${940}`} {...ink} strokeWidth="1.6" />
      <path d={leaf(x, y + 90 * s, 40 * s, i % 2 ? -25 : -155)} fill={T.PAPER} stroke={T.INK} strokeWidth="1" />
      <g className="tp-sway" style={{ transformOrigin: `${x}px 940px`, animationDelay: `${i * 0.7}s` }}>
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
      <StarDust seed={19} count={30} />
      <g className="tp-pulse" style={{ transformOrigin: "800px 1000px" }}>
        <path d={rays(800, 1000, 300, 1300, 31, Math.PI)} {...ink} strokeWidth="1.3" />
        <path d={rays(800, 1000, 300, 900, 30, Math.PI + Math.PI / 31)} {...ink} strokeWidth="0.6" />
      </g>
      {[300, 360, 430].map((rr, i) => <path key={i} d={`M${800 - rr} 1000 A${rr} ${rr} 0 0 1 ${800 + rr} 1000`} {...ink} strokeWidth={i ? 0.8 : 1.8} strokeDasharray={i === 2 ? "2 8" : "none"} />)}
      <path d="M560 1000 A240 240 0 0 1 1040 1000Z" fill={T.PAPER} stroke={T.INK} strokeWidth="1.8" />
      <path d="M560 1000 A240 240 0 0 1 1040 1000Z" fill="url(#tp-h45)" opacity="0.35" />
      {[[165, 650, 1.2], [290, 720, 0.9], [405, 780, 0.7], [1435, 640, 1.2], [1310, 710, 0.9], [1195, 780, 0.7]].map(([x, y, s], i) => flower(x, y, s, i))}
      {bricks}
      {[[520, 300], [1080, 300], [380, 160], [1220, 160], [700, 120], [900, 120]].map(([x, y], i) => (
        <path key={i} className="tp-twinkle" style={{ animationDelay: `${i * 0.6}s` }} d={`M${x} ${y - 14} q9 12 0 18 q-9 -6 0 -18Z`} fill={T.PAPER} stroke={T.INK} strokeWidth="1" />
      ))}
    </g>
  );
}

const SCENES = { education: Hermit, work: Wheel, about: Magician, projects: StarField, contact: Sun };

export function PageBackdrop({ id }) {
  const Scene = SCENES[id];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="td-backdrop" aria-hidden="true">
      <Scene />
    </svg>
  );
}
