// The page: the deck box, the spread of cards, and the card that flips into a page.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PROFILE, CARDS } from "./data/content.js";
import { flushSync } from "react-dom";
import { T, setTheme } from "./theme.js";
import { starPoints } from "./art/shapes.js";
import { EngravingDefs } from "./art/EngravingDefs.jsx";
import { CardFace, CardBack } from "./art/cards.jsx";
import { PageBackdrop } from "./art/PageBackdrops.jsx";
import { SectionBody } from "./components/SectionBody.jsx";
import { Sky } from "./components/Sky.jsx";
import { Letters } from "./components/Letters.jsx";
import { CursorLight } from "./components/CursorLight.jsx";
import { TarotBox } from "./art/TarotBox.jsx";
import { Heavens } from "./components/Heavens.jsx";

// x offset, how far the card rises out of the box, rotation
export const FAN = [[-2.4, 2.38, -12], [-1.2, 2.8, -6], [0, 2.98, 0], [1.2, 2.8, 6], [2.4, 2.38, 12]];

export const ROWS = [[-1.12, 4.12, -3], [0, 4.2, 0], [1.12, 4.12, 3], [-0.58, 2.14, -2], [0.58, 2.14, 2]];

export const PEEK = [[-0.04, -0.3, -2.5], [0.04, -0.24, 2], [0, -0.18, -0.5]];

export const EASE = "cubic-bezier(.65,0,.35,1)";

export const FLIGHT_MS = 1200;

const THEME_KEY = "vinh-tran-theme";
function initialTheme() {
  if (typeof window === "undefined") return "dark";
  try { const saved = window.localStorage.getItem(THEME_KEY); if (saved === "light" || saved === "dark") return saved; } catch (e) { /* storage unavailable */ }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function revealThemeWithoutViewTransition(root, x, y, reduce, direction) {
  const snapshot = root.cloneNode(true);
  snapshot.setAttribute("aria-hidden", "true");
  snapshot.inert = true;
  Object.assign(snapshot.style, {
    position: "fixed",
    inset: "0",
    width: `${window.innerWidth}px`,
    height: `${window.innerHeight}px`,
    zIndex: "9999",
    pointerEvents: "none",
    margin: "0",
    opacity: "1",
  });

  if (reduce) {
    document.body.appendChild(snapshot);
    void snapshot.offsetWidth;
    requestAnimationFrame(() => {
      snapshot.style.transition = "opacity 180ms ease-out";
      snapshot.style.opacity = "0";
      window.setTimeout(() => snapshot.remove(), 210);
    });
    return;
  }

  const maxRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 2;
  const duration = 950;
  const maskAtRadius = (radius) => `radial-gradient(circle at ${x}px ${y}px, transparent 0, transparent ${radius}px, #000 ${radius + 1}px)`;
  if (direction === "open") {
    snapshot.style.maskImage = maskAtRadius(0);
    snapshot.style.webkitMaskImage = snapshot.style.maskImage;
  } else {
    snapshot.style.clipPath = `circle(${maxRadius}px at ${x}px ${y}px)`;
    snapshot.style.webkitClipPath = snapshot.style.clipPath;
  }
  document.body.appendChild(snapshot);
  void snapshot.offsetWidth;
  if (direction === "open") {
    const start = Date.now();
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      const mask = maskAtRadius(maxRadius * eased);
      snapshot.style.maskImage = mask;
      snapshot.style.webkitMaskImage = mask;
      if (progress === 1) {
        window.clearInterval(timer);
        snapshot.remove();
      }
    }, 16);
    return;
  }

  requestAnimationFrame(() => {
    snapshot.style.transition = `clip-path ${duration}ms cubic-bezier(.22,1,.36,1)`;
    snapshot.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    snapshot.style.webkitClipPath = snapshot.style.clipPath;
    window.setTimeout(() => snapshot.remove(), duration + 100);
  });
}

// The sun and moon on the bottom edge of the frame. The sun's rays fold away and a shadow slides
// across it to carve the crescent.
function ThemeToggle({ theme, onToggle }) {
  const dark = theme === "dark";
  return (
    <button className={`td-theme ${dark ? "is-moon" : "is-sun"}`} onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Light mode" : "Dark mode"}>
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <defs>
          <mask id="td-crescent">
            <rect width="40" height="40" fill="#fff" />
            <circle className="td-shade" cx="27" cy="14" r="9.5" fill="#000" />
          </mask>
        </defs>
        <g className="td-rays">
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <line key={i} x1={20 + Math.cos(a) * 11} y1={20 + Math.sin(a) * 11} x2={20 + Math.cos(a) * 15} y2={20 + Math.sin(a) * 15} />;
          })}
        </g>
        <circle className="td-orb" cx="20" cy="20" r="7.5" mask="url(#td-crescent)" />
        <g className="td-moon-stars">
          <polygon points={starPoints(31, 27, 2.6, 0.7, 4)} />
          <polygon points={starPoints(9, 11, 1.8, 0.5, 4)} />
        </g>
      </svg>
    </button>
  );
}

export default function App() {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [theme, setThemeState] = useState(initialTheme);
  setTheme(theme); // the drawings below read their colours from the current theme

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0A0A0B" : "#EEE7D7");
  }, [theme]);

  // Daylight opens from the button; switching to night closes the old day toward it.
  function toggleTheme(e) {
    const next = theme === "dark" ? "light" : "dark";
    try { window.localStorage.setItem(THEME_KEY, next); } catch (err) { /* storage unavailable */ }
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const root = document.documentElement;
    if (document.startViewTransition && !reduce) {
      root.dataset.themeMotion = next === "light" ? "open" : "close";
      root.style.setProperty("--vx", `${x}px`);
      root.style.setProperty("--vy", `${y}px`);
      root.style.setProperty("--vr", `${Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 2}px`);
      const transition = document.startViewTransition(() => flushSync(() => setThemeState(next)));
      transition.finished.then(
        () => { delete root.dataset.themeMotion; },
        () => { delete root.dataset.themeMotion; },
      );
    } else {
      const currentRoot = document.querySelector(".td-root");
      if (currentRoot) {
        revealThemeWithoutViewTransition(currentRoot, x, y, reduce, next === "light" ? "open" : "close");
        flushSync(() => setThemeState(next));
      } else {
        setThemeState(next);
      }
    }
  }
  const [open, setOpen] = useState(false);
  const [settled, setSettled] = useState(false);
  const [size, setSize] = useState({ c: 96, narrow: false }); // card width in px, and fan or rows
  const [hover, setHover] = useState(null);
  const [page, setPage] = useState(null);   // { id, phase: 'in' | 'open' | 'out', geo }
  const [shown, setShown] = useState(null); // section showing inside the open page
  const [swap, setSwap] = useState("in");
  const cardRefs = useRef({});
  const flightRef = useRef(null);
  const swapTimer = useRef(0);
  const leaveTimer = useRef(0);
  const stageRef = useRef(null);
  const boxRef = useRef(null);
  const mainRef = useRef(null);
  const headRef = useRef(null);
  const frameRef = useRef(null);
  const [status, setStatus] = useState("");
  const busyUntil = useRef(0);
  const [lift, setLift] = useState(0);      // how far up the closed deck sits so it is centred on screen
  const [ready, setReady] = useState(false); // transitions switch on only after the first measured frame

  const narrow = size.narrow;

  // Size the cards to the space left under the heading, in both directions, and pick whichever
  // arrangement (one fanned row, or two rows) lets them be larger.
  useLayoutEffect(() => {
    const fit = () => {
      const m = mainRef.current;
      if (!m) return;
      const w = m.clientWidth - 8, h = m.clientHeight - 44;
      const fan = Math.min(w / 6.3, h / 4.95), rows = Math.min(w / 3.5, h / 6.2);
      const useRows = rows > fan * 1.12;
      const c = Math.max(36, Math.min(132, Math.floor(useRows ? rows : fan)));
      setSize((s) => (s.c === c && s.narrow === useRows ? s : { c, narrow: useRows }));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(mainRef.current);
    return () => ro.disconnect();
  }, []);

  // Measure where the box sits when open, and how far to raise it so the closed deck is centred on
  // screen (but never under the heading).
  useLayoutEffect(() => {
    const measure = () => {
      const st = stageRef.current, bx = boxRef.current, hd = headRef.current;
      if (!st || !bx) return;
      const r = st.getBoundingClientRect();
      const boxCenter = r.bottom - bx.offsetHeight / 2;
      const floor = hd ? hd.getBoundingClientRect().bottom + bx.offsetHeight / 2 + 16 : 0;
      setLift(Math.min(0, Math.max(window.innerHeight / 2, floor) - boxCenter));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => { window.removeEventListener("resize", measure); cancelAnimationFrame(t); };
  }, [size.c, size.narrow]);

  // The homepage is exactly one screen: nothing outside an opened page ever scrolls.
  useEffect(() => {
    const h = document.documentElement, b = document.body;
    const prev = [h.style.overflow, b.style.overflow, b.style.margin];
    h.style.overflow = "hidden"; b.style.overflow = "hidden"; b.style.margin = "0";
    return () => { h.style.overflow = prev[0]; b.style.overflow = prev[1]; b.style.margin = prev[2]; };
  }, []);

  // While a page is open, everything behind it is out of reach for keyboards and screen readers.
  useEffect(() => {
    if (frameRef.current) frameRef.current.inert = !!page;
  }, [page]);

  // Keep the open page filling the screen when the window is resized or the phone is turned.
  useEffect(() => {
    const onResize = () => setPage((p) => (p && p.phase === "open" ? { ...p, geo: { ...p.geo, to: pageRect() } } : p));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!document.getElementById("tp-fonts")) {
      const l = document.createElement("link");
      l.id = "tp-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap";
      document.head.appendChild(l);
    }
    return () => { clearTimeout(swapTimer.current); clearTimeout(leaveTimer.current); };
  }, []);

  useEffect(() => {
    if (!open) { setSettled(false); setHover(null); return undefined; }
    const t = setTimeout(() => { setSettled(true); setStatus(`The deck is open. ${CARDS.length} cards: ${CARDS.map((c) => c.label).join(", ")}.`); }, 2450);
    return () => clearTimeout(t);
  }, [open, reduce]);

  useEffect(() => {
    const onKey = (e) => {
      if (!page || page.phase !== "open") return;
      if (e.key === "Escape") { closePage(); return; }
      if (e.key === "Tab" && flightRef.current) {
        // keep keyboard focus inside the open page
        const f = [...flightRef.current.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')].filter((el) => el.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const layout = narrow ? ROWS : FAN;

  function pageRect() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const m = vw < 760 || vh < 520 ? 8 : 28;
    const fw = Math.min(1180, vw - m * 2), fh = vh - m * 2;
    return { left: (vw - fw) / 2, top: (vh - fh) / 2, width: fw, height: fh };
  }
  function geometry(id, { asDrawn = false } = {}) {
    const el = cardRefs.current[id];
    const i = CARDS.findIndex((c) => c.id === id);
    const body = asDrawn && el.querySelector(".td-card-body");
    const r = (body || el).getBoundingClientRect();
    const k = body && el.classList.contains("lifted") ? 1.06 : 1; // the hover lift enlarges the card
    const w = el.offsetWidth * k, h = el.offsetHeight * k;
    return {
      from: { left: r.left + r.width / 2 - w / 2, top: r.top + r.height / 2 - h / 2, width: w, height: h, rot: layout[i][2] },
      to: pageRect(),
    };
  }
  function frames(from, to, forward) {
    if (reduce) {
      // Reduce Motion: no 3D flip or zoom. The page simply grows from the card's spot and fades in.
      const k = (b, o) => ({ left: `${b.left}px`, top: `${b.top}px`, width: `${b.width}px`, height: `${b.height}px`, opacity: o, transform: "rotateY(180deg)" });
      const f = [k(from, 0), k(to, 1)];
      return forward ? f : f.reverse();
    }
    const lift = { ...from, top: from.top - from.height * 0.12 };
    const mid = { left: (from.left + to.left) / 2, top: (from.top + to.top) / 2, width: (from.width + to.width) / 2, height: (from.height + to.height) / 2 };
    const k = (b, rot, ry, s = 1) => ({ left: `${b.left}px`, top: `${b.top}px`, width: `${b.width}px`, height: `${b.height}px`, transform: `perspective(2200px) rotate(${rot}deg) rotateY(${ry}deg) scale(${s})` });
    const f = [k(from, from.rot, 0), { ...k(lift, from.rot * 0.6, 0, 1.04), offset: 0.18 }, { ...k(mid, 0, 90), offset: 0.55 }, k(to, 0, 180)];
    return forward ? f : f.reverse().map((x) => (x.offset != null ? { ...x, offset: 1 - x.offset } : x));
  }

  function openPage(id) {
    if (page || !settled) return;
    const geo = geometry(id, { asDrawn: true }); // measured before the hover lift is released
    setHover(null);
    setShown(id); setSwap("in");
    setPage({ id, phase: "in", geo });
  }
  function closePage() {
    if (!page || page.phase !== "open") return;
    const id = shown || page.id;
    setPage({ id, phase: "out", geo: geometry(id) });
  }
  function showSection(id) {
    if (!page || id === shown) return;
    clearTimeout(swapTimer.current);
    setSwap("out");
    swapTimer.current = setTimeout(() => {
      setShown(id); setPage((p) => (p ? { ...p, id } : p)); setSwap("in");
      document.querySelector(".td-page-scroll")?.scrollTo({ top: 0 });
    }, 360);
  }
  function toggleBox() {
    const now = Date.now();
    if (page || now < busyUntil.current) return;
    busyUntil.current = now + 2400;
    if (open) setStatus("The deck is closed.");
    setOpen((o) => !o);
  }
  function focusCard(id) {
    if (frameRef.current) frameRef.current.inert = false; // the deck is reachable again before focus returns to it
    requestAnimationFrame(() => cardRefs.current[id]?.focus({ preventScroll: true }));
  }
  // The hovered card tilts toward the pointer; the button itself never moves, so the hover can't flicker.
  function tilt(e) {
    if (!settled || reduce) return;
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    el.style.setProperty("--ry", `${(x - 0.5) * 16}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 12}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  }
  function untilt(e) {
    const el = e.currentTarget;
    el.style.setProperty("--ry", "0deg"); el.style.setProperty("--rx", "0deg");
  }
  function enter(id) { if (!settled || page) return; clearTimeout(leaveTimer.current); setHover(id); }
  function leave() { clearTimeout(leaveTimer.current); leaveTimer.current = setTimeout(() => setHover(null), 280); }

  // The flip-and-zoom runs before paint, and the animation is dropped once the settled page is drawn.
  useLayoutEffect(() => {
    const el = flightRef.current;
    if (!el || !page || page.phase === "open") return undefined;
    const { from, to } = page.geo;
    if (page.phase === "in") el.focus({ preventScroll: true }); // focus moves into the page as soon as it starts opening
    const anim = el.animate(frames(from, to, page.phase === "in"), { duration: reduce ? 800 : FLIGHT_MS, easing: EASE, fill: "forwards" });
    anim.onfinish = () => {
      if (page.phase === "in") setPage((p) => (p ? { ...p, phase: "open" } : p));
      else { const id = page.id; setPage(null); setShown(null); focusCard(id); }
    };
    return () => { anim.onfinish = null; anim.cancel(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page && page.phase]);

  useEffect(() => {
    if (page && page.phase === "open") document.getElementById("td-close")?.focus({ preventScroll: true });
  }, [page && page.phase]);

  const away = page ? (page.phase === "open" ? shown : page.id) : null;
  const card = page && CARDS.find((c) => c.id === page.id);
  const current = shown && CARDS.find((c) => c.id === shown);
  const active = CARDS.find((c) => c.id === hover);
  const to = page && page.geo.to;
  const hint = open ? (settled ? "Choose a card" : "") : "Tap the deck";

  return (
    <div className={`tp-root td-root ${reduce ? "calm" : ""}`} data-theme={theme}>
      <EngravingDefs />
      <Heavens calm={reduce} />
      <Sky enabled={!reduce} />
      <CursorLight calm={reduce} />
      <div ref={frameRef} className="tp-frame td-frame">
        <header className="tp-corner">
          <span>{PROFILE.name}</span>
          <span>MMXXVI</span>
        </header>

        <div ref={headRef} className="tp-head td-head">
          <div className={`tp-swap td-head-layer ${active ? "" : "on"}`} aria-hidden={!!active}>
            <p className="tp-eyebrow">{PROFILE.eyebrow}</p>
            <h1><span className="sr-only">{PROFILE.name}</span><Letters text={PROFILE.name} delay={200} /></h1>
            <p className="tp-tag">{PROFILE.tagline}</p>
          </div>
          {CARDS.map((c) => (
            <div key={c.id} className={`tp-swap td-head-layer ${hover === c.id ? "on" : ""}`} aria-hidden={hover !== c.id}>
              <p className="tp-eyebrow">{c.numeral} · {c.arcana}</p>
              <p className="td-h1" role="presentation">{c.label}</p>
              <p className="tp-tag">{c.blurb}</p>
            </div>
          ))}
        </div>

        <main ref={mainRef} className="td-main">
          <p className="sr-only" role="status" aria-live="polite">{status}</p>
          <div ref={stageRef} id="td-spread" className={`td-stage ${narrow ? "narrow" : ""} ${open ? "open" : ""} ${settled ? "settled" : ""} ${settled && hover ? "has-hover" : ""}`}
            style={{ "--c": `${size.c}px` }} role="group" aria-label="Deck of tarot cards">
           <div className={`td-lift ${ready ? "" : "still"}`}
             style={{ transform: open ? "translateY(0px)" : `translateY(${lift}px)`, transitionDelay: open ? "0ms" : "1250ms" }}>
            <span className="td-floor" aria-hidden="true" />
            <span className="td-lid-wrap" aria-hidden="true">
              <span className="td-lid" style={{ transitionDelay: open ? "200ms" : "1350ms" }}><span /><i /></span>
            </span>

            {PEEK.map(([x, y, r], i) => (
              <span key={i} className="td-card td-peek" aria-hidden="true"
                style={{ transform: open ? `translate(calc(var(--c) * ${x}), calc(var(--c) * ${y})) rotate(${r}deg)` : "none", transitionDelay: open ? `${300 + i * 60}ms` : `${1100 + i * 40}ms` }}>
                <CardBack />
              </span>
            ))}

            {CARDS.map((c, i) => {
              const [x, rise, rot] = layout[i];
              const order = narrow ? i : [2, 1, 0, 1, 2][i];
              const lifted = hover === c.id;
              const hi = CARDS.findIndex((k) => k.id === hover);
              const lean = settled && hi >= 0 && i !== hi ? (i < hi ? -1 : 1) : 0; // neighbours lean aside
              return (
                <span key={c.id} className="td-rise"
                  style={{ transform: open ? `translateY(calc(var(--c) * ${-rise}))` : "none", transitionDelay: open ? `${560 + i * 90}ms` : `${620 + (4 - i) * 60}ms` }}>
                  <span className={`td-spread ${lifted ? "hot" : ""}`}
                    style={{ transform: open ? `translateX(calc(var(--c) * ${x + lean * 0.07})) rotate(${rot + lean * 2.5}deg)` : "none", transitionDelay: settled ? "0ms" : open ? `${1180 + order * 110}ms` : `${(4 - i) * 50}ms` }}>
                    <span className="td-sparks" aria-hidden="true">
                      {[[-8, 6], [104, 2], [-6, 92], [102, 96], [48, -7]].map(([sx, sy], k) => (
                        <svg key={k} viewBox="0 0 20 20" style={{ left: `${sx}%`, top: `${sy}%`, transitionDelay: lifted ? `${k * 70}ms` : "0ms" }}>
                          <polygon points={starPoints(10, 10, 9, 2, 4)} fill={T.INK} />
                        </svg>
                      ))}
                    </span>
                    <button
                      ref={(el) => { cardRefs.current[c.id] = el; }}
                      className={`td-face ${away === c.id ? "is-away" : ""} ${lifted ? "lifted" : ""}`}
                      tabIndex={open ? 0 : -1}
                      aria-hidden={!open}
                      aria-label={`${c.label}, ${c.arcana}. Open the ${c.label} page`}
                      onClick={() => openPage(c.id)}
                      onMouseEnter={() => enter(c.id)} onMouseLeave={(e) => { untilt(e); leave(); }}
                      onMouseMove={tilt}
                      onFocus={() => enter(c.id)} onBlur={leave}
                    >
                      <span className="td-card-body">
                        <span className={`td-face-art ${open && !reduce ? "tp-drawing" : ""}`} style={{ "--card-delay": `${1300 + order * 110}ms` }}>
                          <CardFace card={c} uid="fan" />
                        </span>
                        <span className="td-mute" aria-hidden="true" />
                        <span className="tp-sheen" style={{ animationDelay: `${2300 + order * 120}ms` }} />
                        <span className="td-hover-sheen" aria-hidden="true" />
                        <span className="td-glare" aria-hidden="true" />
                      </span>
                    </button>
                  </span>
                </span>
              );
            })}

            <button ref={boxRef} className="td-box" onClick={toggleBox} aria-label={open ? "Put the cards back in the box" : "Open the deck of cards"} aria-expanded={open} aria-controls="td-spread">
              <span className="td-box-body"><TarotBox /></span>
            </button>
            <p className="td-hint" aria-hidden="true">
              {["Tap the deck", "Choose a card"].map((t) => <span key={t} className={hint === t ? "on" : ""}>{t}</span>)}
            </p>
           </div>
          </div>
        </main>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      {page && <div className={`td-overlay ${page.phase}`} onClick={closePage} aria-hidden="true" />}
      {page && card && (
        <section
          ref={flightRef}
          className={`td-flight ${page.phase === "open" ? "is-open" : ""}`}
          style={page.phase === "open" ? { left: to.left, top: to.top, width: to.width, height: to.height } : { left: page.geo.from.left, top: page.geo.from.top, width: page.geo.from.width, height: page.geo.from.height }}
          role="dialog" aria-modal="true" aria-labelledby="td-page-title" tabIndex={-1}
        >
          <div className="td-flight-front" aria-hidden="true"><CardFace card={card} uid="fly" /></div>
          <div className="td-flight-back">
            <div className="td-page" style={{ width: to.width, height: to.height }}>
              <div className="td-page-art" aria-hidden="true" key={`art-${current.id}`}><PageBackdrop id={current.id} calm={reduce} /></div>
              <div className="td-page-frame" aria-hidden="true" />
              <button id="td-close" className="td-close" onClick={closePage} aria-label="Return the card to the deck"><span /><span /></button>
              <div className="td-page-scroll">
                <div className={`td-page-inner ${swap}`} key={current.id}>
                  <p className="tp-eyebrow">{current.numeral} · {current.arcana}</p>
                  <h2 id="td-page-title"><span className="sr-only">{current.label}</span><Letters text={current.label} delay={250} /></h2>
                  <p className="td-page-tag">{current.blurb}</p>
                  <SectionBody id={current.id} />
                  <div className="td-page-nav">
                    <button onClick={closePage}>Close</button>
                    <div className="td-others">
                      {CARDS.filter((c) => c.id !== current.id).map((c) => (
                        <button key={c.id} onClick={() => showSection(c.id)}>{c.label}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
