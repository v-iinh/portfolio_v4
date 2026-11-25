// Splits a heading into letters that rise in one after another.

export function Letters({ text, delay = 0 }) {
  return (
    <span className="tp-letters" aria-hidden="true">
      {[...text].map((ch, i) => <span key={i} style={{ animationDelay: `${delay + i * 45}ms` }}>{ch === " " ? "\u00a0" : ch}</span>)}
    </span>
  );
}
