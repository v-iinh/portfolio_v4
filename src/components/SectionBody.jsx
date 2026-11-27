// The pages printed on the back of each card: one quiet column of entries.
import { ABOUT, EDUCATION, PROFILE, WORK, PROJECTS } from "../data/content.js";

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
        {ABOUT.content.map((a) => (<Entry key={a.category} title={a.category}><p>{a.text}</p></Entry>))}
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
        <Entry title="Email"><p><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></p></Entry>
        <Entry title="LinkedIn"><p><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">{PROFILE.linkedin}</a></p></Entry>
        <Entry title="GitHub"><p><a href={PROFILE.github} target="_blank" rel="noreferrer">{PROFILE.github}</a></p></Entry>
        <Entry title="Resume"><p><a href="/resume.pdf" target="_blank" rel="noreferrer">Download PDF</a></p></Entry>
      </ul>
    </>
  );
  return null;
}
