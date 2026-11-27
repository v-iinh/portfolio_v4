// The pages printed on the back of each card: one quiet column of entries.
import { ABOUT, EDUCATION, WORK, PROJECTS, CONTACT } from "../data/content.js";

export function Entry({ title, sub, meta, children }) {
  return (
    <li className="tp-entry">
      <div className="tp-entry-head">
        <h3>{title}</h3>
        {meta && <span className="tp-entry-meta">{meta}</span>}
      </div>
      {sub && <p className="tp-entry-sub">{sub}</p>}
      {children}
    </li>
  );
}

export function SectionBody({ id }) {
  if (id === "education") return (
    <ul className="tp-list">
      {EDUCATION.map((e) => (<Entry key={e.institution} title={e.institution} sub={e.degree} meta={e.when}><p>{e.text}</p></Entry>))}
    </ul>
  );
  if (id === "work") return (
    <ul className="tp-list">
      {WORK.map((w) => <Entry key={w.org} title={w.role} sub={w.org} meta={w.when}><p>{w.text}</p></Entry>)}
    </ul>
  );
  if (id === "about") return (
    <>
      <p className="tp-lead">{ABOUT.description}</p>
      <ul className="tp-list">
        {ABOUT.items.map((a) => (<Entry key={a.category} title={a.category}><p>{a.text}</p></Entry>))}
      </ul>
    </>
  );
  if (id === "projects") return (
    <ul className="tp-list">
      {PROJECTS.map((p) => <Entry key={p.name} title={p.name} sub={p.stack} meta={p.when}><p>{p.text}</p></Entry>)}
    </ul>
  );
  if (id === "contact") return (
    <>
      <ul className="tp-list">
        {CONTACT.map((c) => <Entry key={c.type} title={c.type}><p><a href={c.value} target="_blank" rel="noreferrer">{c.display}</a></p></Entry>)}
      </ul>
    </>
  );
  return null;
}
