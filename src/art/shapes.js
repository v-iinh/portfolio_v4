// Small geometry helpers used to draw the engraved stars, rays, petals, leaves, clouds and moons.

export function starPoints(cx, cy, R, r, n, rot = -Math.PI / 2) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const rad = i % 2 ? r : R, a = rot + (i * Math.PI) / n;
    pts.push(`${(cx + Math.cos(a) * rad).toFixed(1)},${(cy + Math.sin(a) * rad).toFixed(1)}`);
  }
  return pts.join(" ");
}

export function rays(cx, cy, r1, r2, n, offset = 0) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = offset + (i / n) * Math.PI * 2;
    d += `M${(cx + Math.cos(a) * r1).toFixed(1)} ${(cy + Math.sin(a) * r1).toFixed(1)}L${(cx + Math.cos(a) * r2).toFixed(1)} ${(cy + Math.sin(a) * r2).toFixed(1)}`;
  }
  return d;
}

export function wavyRays(cx, cy, r1, r2, n, offset) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = offset + (i / n) * Math.PI * 2, steps = 8;
    for (let k = 0; k <= steps; k++) {
      const t = k / steps, r = r1 + (r2 - r1) * t, w = Math.sin(t * Math.PI * 3) * 0.06 * (1 - t * 0.5);
      const x = cx + Math.cos(a + w) * r, y = cy + Math.sin(a + w) * r;
      d += `${k ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  }
  return d;
}

export function petals(cx, cy, r, n, len, rot = 0) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = rot + (i / n) * Math.PI * 2, b = a + Math.PI / n * 0.8, c = a - Math.PI / n * 0.8;
    const tip = [cx + Math.cos(a) * (r + len), cy + Math.sin(a) * (r + len)];
    d += `M${(cx + Math.cos(c) * r).toFixed(1)} ${(cy + Math.sin(c) * r).toFixed(1)}Q${tip[0].toFixed(1)} ${tip[1].toFixed(1)} ${(cx + Math.cos(b) * r).toFixed(1)} ${(cy + Math.sin(b) * r).toFixed(1)}`;
  }
  return d;
}

export function leaf(x, y, len, ang, w = 0.35) {
  const a = (ang * Math.PI) / 180, ex = x + Math.cos(a) * len, ey = y + Math.sin(a) * len;
  const nx = -Math.sin(a) * len * w, ny = Math.cos(a) * len * w, mx = (x + ex) / 2, my = (y + ey) / 2;
  return `M${x} ${y}Q${(mx + nx).toFixed(1)} ${(my + ny).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}Q${(mx - nx).toFixed(1)} ${(my - ny).toFixed(1)} ${x} ${y}M${x} ${y}L${((x + ex) / 2 + (ex - x) * 0.3).toFixed(1)} ${((y + ey) / 2 + (ey - y) * 0.3).toFixed(1)}`;
}

export function cloud(x, y, s, flip = 1) {
  const k = (v) => (v * s).toFixed(1);
  return `M${x} ${y}c${k(-6 * flip)} ${k(-20)} ${k(16 * flip)} ${k(-30)} ${k(30 * flip)} ${k(-18)}c${k(6 * flip)} ${k(-22)} ${k(40 * flip)} ${k(-24)} ${k(46 * flip)} ${k(-4)}c${k(18 * flip)} ${k(-6)} ${k(30 * flip)} ${k(14)} ${k(16 * flip)} ${k(24)}Z` +
    `M${(x + 30 * s * flip).toFixed(1)} ${(y - 18 * s).toFixed(1)}c${k(6 * flip)} ${k(-4)} ${k(14 * flip)} ${k(2)} ${k(10 * flip)} ${k(9)}c${k(-2 * flip)} ${k(4)} ${k(-8 * flip)} ${k(3)} ${k(-7 * flip)} ${k(-1)}`;
}

export function flourish(x, y, sx, sy) { // corner curl
  return `M${x} ${y + 26 * sy}C${x} ${y + 10 * sy} ${x + 6 * sx} ${y + 4 * sy} ${x + 14 * sx} ${y + 6 * sy}C${x + 22 * sx} ${y + 8 * sy} ${x + 20 * sx} ${y + 18 * sy} ${x + 13 * sx} ${y + 17 * sy}C${x + 8 * sx} ${y + 16 * sy} ${x + 9 * sx} ${y + 11 * sy} ${x + 13 * sx} ${y + 11 * sy}M${x + 26 * sx} ${y}C${x + 10 * sx} ${y} ${x + 6 * sx} ${y + 4 * sy} ${x + 6 * sx} ${y + 10 * sy}`;
}

export function moonPath(cx, cy, r, a) {
  // shaded part of a moon at phase angle a (0 new → π full → 2π new)
  const waxing = a < Math.PI, ex = Math.abs(r * Math.cos(a));
  const outer = waxing ? 0 : 1;
  const inner = waxing ? (a < Math.PI / 2 ? 0 : 1) : (a < Math.PI * 1.5 ? 0 : 1);
  return `M${cx} ${cy - r}A${r} ${r} 0 0 ${outer} ${cx} ${cy + r}A${ex.toFixed(2)} ${r} 0 0 ${inner} ${cx} ${cy - r}Z`;
}
