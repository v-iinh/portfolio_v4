// Shared hatching patterns: every card shades with engraved lines instead of tone.
import { T } from "../theme.js";

// Shared hatching patterns: every card shades with engraved lines instead of tone.
export function EngravingDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <pattern id="tp-h45" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4" stroke={T.INK} strokeWidth="0.7" /></pattern>
        <pattern id="tp-h135" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="4" stroke={T.INK} strokeWidth="0.7" /></pattern>
        <pattern id="tp-hh" width="4" height="3.2" patternUnits="userSpaceOnUse"><line x1="0" y1="0.5" x2="4" y2="0.5" stroke={T.INK} strokeWidth="0.55" /></pattern>
        <pattern id="tp-dense" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><line x1="0" y1="0" x2="0" y2="2.6" stroke={T.INK} strokeWidth="0.75" /></pattern>
        <pattern id="tp-dots" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="0.55" fill={T.INK} /><circle cx="4" cy="3.8" r="0.45" fill={T.INK} /></pattern>
        <pattern id="tp-lattice" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="14" height="14" fill="none" stroke={T.INK} strokeWidth="0.6" /><circle cx="7" cy="7" r="1.4" fill="none" stroke={T.INK} strokeWidth="0.5" />
        </pattern>
      </defs>
    </svg>
  );
}
