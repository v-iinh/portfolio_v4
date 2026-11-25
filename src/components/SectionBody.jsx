// The pages printed on the back of each card: one quiet column of entries.
import { PROFILE, WORK, PROJECTS, COURSES, SKILLS } from "../data/content.js";

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
  if (id === "work") return (
    <ul className="tp-list">
      {WORK.map((w) => <Entry key={w.org} title={w.role} sub={w.org} meta={w.when}><p>{w.text}</p></Entry>)}
    </ul>
  );
  if (id === "projects") return (
    <ul className="tp-list">
      {PROJECTS.map((p) => <Entry key={p.name} title={p.name} sub={p.stack} meta={p.when}><p>{p.text}</p></Entry>)}
    </ul>
  );
  if (id === "education") return (
    <ul className="tp-list">
      <Entry title="Northeastern University" sub="B.S. Computer Science, systems concentration" meta="2029">
        <p>{COURSES.join(", ")}.</p>
      </Entry>
      <Entry title="USA Computing Olympiad" meta="Silver"><p>Competitive programming in algorithms and data structures.</p></Entry>
      <Entry title="American Computer Science League" meta="Finalist"><p>Regional finalist in computer science theory and programming.</p></Entry>
    </ul>
  );
  if (id === "about") return (
    <>
      <p>I study computer science at Northeastern, concentrating in systems. Most of my work sits between messy data and the people who depend on it, and I like building things people can walk into.</p>
      <ul className="tp-list">{SKILLS.map(([k, v]) => <Entry key={k} title={k}><p>{v}</p></Entry>)}</ul>
    </>
  );
  return (
    <>
      <ul className="tp-list">
        <Entry title="Email"><p><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></p></Entry>
        <Entry title="LinkedIn"><p><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/viinh</a></p></Entry>
        <Entry title="GitHub"><p><a href={PROFILE.github} target="_blank" rel="noreferrer">github.com/v-iinh</a></p></Entry>
      </ul>
    </>
  );
}
