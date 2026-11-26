// The muted sky that sits behind everything: constellations, the wheel and the ring of moons.
import { T } from "../theme.js";
import { CelestialWheel } from "./CelestialWheel.jsx";
import { moonPath } from "../art/shapes.js";
import { ConstellationField } from "./ConstellationField.jsx";

export function Heavens() {
  const size = 900, c = size / 2;
  return (
    <div className="td-heavens" aria-hidden="true">
      <ConstellationField />
      <div className="td-sky-wheel">
        <CelestialWheel size={760} />
        <svg className="td-moon-ring" viewBox={`0 0 ${size} ${size}`}>
          <circle cx={c} cy={c} r={c - 30} fill="none" stroke={T.SKY_INK} strokeWidth="0.6" strokeDasharray="2 6" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = -Math.PI / 2 + (i / 12) * Math.PI * 2, x = c + Math.cos(a) * (c - 30), y = c + Math.sin(a) * (c - 30);
            const phase = 0.15 + (i / 11) * (Math.PI * 2 - 0.3);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="15" fill={T.PAPER} stroke={T.SKY_INK} strokeWidth="1" />
                <path d={moonPath(x, y, 15, phase)} fill="url(#tp-h45)" stroke={T.SKY_INK} strokeWidth="0.6" />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
