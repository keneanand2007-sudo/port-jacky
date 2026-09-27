# MEMORY.md — PORT-JACKY

## PROJECT MEMORY — FULLY UPDATED

> This file is the single source of truth for confirmed personal data,
> project status, and architecture decisions across the whole build.
> Everything here is either explicitly provided by Jack or verified by
> a successful build. Nothing here is invented.

---

## 1. IDENTITY

* **Real Name:** Anand Kene
* **Personal Brand / Handle:** 𝖏𝖆𝖈𝖐 (jack_the_legend)
* **Current Stage:** BCA Student
* **Career Direction:** AI/ML Engineering + Software Engineering
* **Long-Term Goal:** Become a strong engineer and eventually build products of his own
* **Location:** Maharashtra, India
* **Positioning:** Student → Builder → Engineer → Creator

### Personality / Brand Traits

Curious · Technical · Creative · Builder-minded · Humble · Observant ·
Consistent · Independent · Willing to experiment

### Philosophy

> Respect > Attention.
> Not perfect. Just progressing.
> Solving problems. Building things. Documenting the rise.

---

## 2. EDUCATION (Confirmed Only)

* **Program:** Bachelor of Computer Applications (BCA)
* **University:** Sant Gadge Baba Amravati University (SGBAU / GBAU)
* **Status:** 2nd Year — Semester III
* **Start Year / Expected Completion:** Not provided — do not invent
* **Academic Focus:** Programming, Data Structures & Algorithms, AI, ML,
  Software Engineering, Web Development, Databases/SQL, Operating
  Systems, Probability & Statistics

---

## 3. CONFIRMED SKILLS

**Languages:** Python, C, C++, Java, JavaScript, TypeScript, SQL

**Web:** HTML, CSS, React, Vite, Next.js, Tailwind CSS

**Backend:** Python, FastAPI, Node.js

**Databases:** SQL, SQLite, Supabase

**AI:** AI Agents, AI-assisted development, Ollama, Llama models

**Tools:** Git, GitHub, VS Code, pnpm, npm

**Exploring / Exposure (not claimed as mastered):** TypeScript,
Three.js, React Three Fiber, GSAP, Zustand, Framer Motion, tRPC,
Clerk, Vercel

**Current Learning Focus — Primary:** AI, ML, AI Engineering, AI Agents,
Software Engineering, DSA
**Secondary:** Full-Stack Development, Web Development, Databases,
System Design

---

## 4. PROOF (Certifications / Hackathons)

* Currently **empty** — no certifications or hackathons confirmed yet.
* Data file (`src/data/proof.js`) is structured and extensible — Jack
  will add entries manually as they become available.
* Portfolio section shows an honest "documenting the milestones as I
  go" placeholder until entries exist.

---

## 5. PROJECTS

* Currently **empty by request** — Projects section set to
  "Coming soon — this asteroid field is still forming."
* Data file (`src/data/projects.js`) is structured and extensible —
  add `{ title, description, technologies, year, liveUrl, sourceUrl }`
  objects when real projects are ready.

---

## 6. EXPERIENCE

* No formal work experience yet.
* Portfolio section is honestly framed as **"Experience & Journey"**
  rather than fabricated employment history, per RULE.md §38.
* Shows positioning (Student → Builder → Engineer → Creator) and
  learning cycle: Learn → Understand → Build → Break → Debug →
  Improve → Document.

---

## 7. CONTACT INFO

* **Email:** keneanand2007@gmail.com
* **LinkedIn:** https://www.linkedin.com/in/anand-kene-3a60972b1/
* **GitHub:** https://github.com/keneanand2007-sudo
* **Instagram:** https://www.instagram.com/anand_kene8055/

---

## 8. PROJECT / REPO INFO

* **Local folder:** `~/Desktop/prot-JACKY` (Desktop, opened in VS Code)
* **GitHub repo:** https://github.com/keneanand2007-sudo/port-jacky
  (public, pushed and up to date on `main`)
* **Package name:** `prot-jacky`
* **Environment:** Windows + Git Bash
* **Workflow preference:** every file/edit delivered as copy-pasteable
  Git Bash commands (no manual VS Code editing); one changeset at a
  time; verify with `npm run build` before moving on; commit after
  each stable step.

---

## 9. LOCKED TECH STACK

```
React
Vite
Tailwind CSS v4 (via @tailwindcss/vite, CSS-first config)
Framer Motion        ← installed, used only in Hero (load-time animation)
GSAP + ScrollTrigger  ← installed, drives all scroll-reveal (via useScrollReveal hook)
Lenis                 ← installed, synced to GSAP's ticker in SmoothScroll.jsx
Three.js              ← installed
React Three Fiber     ← installed (install needed --legacy-peer-deps due to React 19.3 vs fiber's peer range)
@react-three/drei     ← installed, not yet used
ESLint
```

Footer still lists only React · Vite · Tailwind CSS · Framer Motion —
needs updating to mention GSAP/Three.js/Lenis now that they're live.

---

## 10. BUILD STATUS

### Phases (per RULE.md)

* ✅ Phase 01 — Foundation
* ✅ Phase 02 — Core portfolio content
* ✅ Phase 03 — Smooth scrolling (Lenis, synced to GSAP ticker)
* ✅ Phase 04 — Cinematic animation (GSAP ScrollTrigger reveal on all sections via `useScrollReveal`)
* 🔶 Phase 05 — Galaxy environment (Three.js/R3F) — in progress, see §14
* 🔶 Phase 06 — Planet system — in progress: Sun, Mercury, Venus done; Earth/Mars/Jupiter/Saturn/Uranus/Neptune not yet built
* ⬜ Phase 07 — Interactive projects (asteroid field)
* ⬜ Phase 08 — Performance (bundle is 1.4MB — Three.js/R3F/drei not yet code-split; known, deferred)
* ⬜ Phase 09 — Accessibility
* ⬜ Phase 10 — Production

### Current live chapter order (App.jsx)

```
Hero (Sun)              ← has 3D planet
About (Mercury)          ← has 3D planet
Skills (Venus)           ← has 3D planet
Education (Earth)        ← no 3D planet yet
Proof (Mars)             ← no 3D planet yet
Projects (Asteroid Belt) ← no 3D planet yet
Experience (Jupiter)     ← no 3D planet yet
CreativeIdentity (Saturn)← no 3D planet yet
Experiments (Uranus)     ← no 3D planet yet
Contact (Neptune)        ← no 3D planet yet
DeepSpace
Footer
```

---

## 11. FILE STRUCTURE SO FAR

```
src/
├── components/
│   ├── ChapterIndicator/ (empty, .gitkeep)
│   ├── Cursor/ (empty, .gitkeep)
│   ├── Footer/
│   │   └── Footer.jsx
│   ├── LoadingScreen/ (empty, .gitkeep)
│   ├── Navigation/ (empty, .gitkeep)
│   └── Transition/ (empty, .gitkeep)
│
├── experience/  (all subfolders empty, .gitkeep — Phase 03-05)
│   ├── animation/
│   ├── camera/
│   ├── galaxy/
│   ├── particles/
│   ├── planets/
│   ├── scroll/
│   └── shaders/
│
├── sections/
│   ├── Hero/Hero.jsx
│   ├── About/About.jsx
│   ├── Skills/Skills.jsx
│   ├── Education/Education.jsx
│   ├── Proof/Proof.jsx
│   ├── Projects/Projects.jsx
│   ├── Experience/Experience.jsx
│   ├── CreativeIdentity/CreativeIdentity.jsx
│   ├── Experiments/Experiments.jsx
│   ├── Contact/Contact.jsx
│   └── DeepSpace/DeepSpace.jsx
│
├── data/
│   ├── hero.js
│   ├── about.js
│   ├── skills.js
│   ├── education.js
│   ├── proof.js         ← empty array, extensible
│   ├── projects.js      ← empty array, extensible
│   ├── experience.js
│   ├── creativeIdentity.js
│   ├── experiments.js
│   ├── contact.js
│   └── deepSpace.js
│
├── hooks/ (empty, .gitkeep)
├── utils/ (empty, .gitkeep)
├── assets/
│   ├── planets/ (empty, .gitkeep)
│   ├── textures/ (empty, .gitkeep)
│   ├── projects/ (empty, .gitkeep)
│   ├── audio/ (empty, .gitkeep)
│   └── fonts/ (empty, .gitkeep)
│
├── App.jsx
├── main.jsx
└── index.css   ← @theme tokens: void, deep-space, surface,
                   text-primary/secondary/muted, font-display, font-body
```

---

## 12. KNOWN GOTCHAS (for future sessions)

1. **`<a` tags vanish when pasted as literal code blocks in chat.**
   Any anchor tag written directly (`<a href=...>`) has repeatedly been
   stripped during rendering/copy, breaking the JSX parse. Fix pattern:
   `sed -i '<line>s/.*/            <a/' <file>` — always verify with
   `cat -n` before assuming a fix landed correctly. Same corruption can
   hit other characters occasionally (missing spaces, em dashes) —
   always `cat -n` a newly-pasted file if something looks off.
2. **New folders must be created before `cat > file` inside them.**
   `cat >` does not auto-create parent directories; `mkdir -p` first
   or the write silently does nothing (no error shown).
3. Git Bash on Windows will always warn about LF→CRLF — this is
   cosmetic and not a real error.
4. **Custom `shaderMaterial` ignores `.material.opacity` / React's
   `transparent`+`opacity` prop entirely.** Alpha MUST be wired through
   an explicit `uOpacity` uniform and used inside the fragment shader's
   `gl_FragColor = vec4(color, uOpacity)`. Setting `mesh.material.opacity`
   from JS on a shaderMaterial silently does nothing — this caused a
   multi-message debugging loop (planets stayed fully opaque regardless
   of scroll position) until caught.
5. **Scroll-progress formulas that divide by `rect.height` or
   `(rect.height - vh)` are fragile** — near-zero or zero height (e.g.
   right when a section's height ≈ viewport height) causes instant
   jumps or division blowups. The reliable formula (in `Planet.jsx`,
   `getChapterProgress`) uses the section's fixed `offsetTop` instead:
   `t = (window.scrollY - el.offsetTop) / window.innerHeight`, clamped
   to [0,1]. This is the pattern to reuse for any future
   scroll-linked/section-linked effect.
6. **Fade-in-from-zero at chapter start hides content on page load.**
   If a planet's opacity formula is `min(1, t/0.2)`, then at t=0 (page
   just loaded, chapter just reached) opacity is 0 — nothing renders
   until the user scrolls. Fix: make the planet fully visible the
   instant its chapter starts, and only fade out near the chapter's end
   (`fade = max(0, 1 - max(0, t - 0.55) / 0.35)`).
7. **A stale/duplicate `npm run dev` process** left running in another
   terminal will grab port 5173, pushing the new one to 5174 — and the
   browser tab left open on 5173 then shows old, stale code with no
   error. If a fix "isn't working," check the terminal's printed Local
   URL matches the browser's address bar; `taskkill //F //IM node.exe`
   (double-slash needed in Git Bash) clears all stray Node processes.
8. Vite's HMR can miss changes to GLSL template-string shaders — a hard
   reload (click the address bar, Enter) is more reliable than a normal
   refresh when a shader edit doesn't seem to apply.

---

## 14. GALAXY / PLANET SYSTEM ARCHITECTURE

A reusable `<Planet />` component (`src/experience/galaxy/Planet.jsx`)
renders one shader-based sphere per chapter, mounted inside a single
fixed full-screen `<Canvas>` (`Galaxy.jsx`, `z-index: -1`, `aria-hidden`,
behind all content). One `<Planet sectionId="..." variant="..." .../>`
per chapter in `Galaxy.jsx`; each planet is invisible outside its own
chapter's scroll window (no overlap, one planet on screen at a time).

**Props per Planet:** `sectionId` (DOM id of the section it's synced
to), `variant` (`"sun"` | `"venus"` | `"rocky"` — each maps to a shader
pair in `planetShaders.js`), `radius`, `startX/Y/Z` (enter position,
right side), `exitX/Z` (exit position, off-screen left), `glowColor`,
`reduceMotion`.

**Shaders** (`src/experience/galaxy/planetShaders.js`) — shared
`noiseGLSL` (simplex noise + fbm), then per-variant vertex+fragment
pairs: `sunVertexShader`/`sunFragmentShader` (turbulent flare
displacement, orange/red/yellow/hot color ramp), `rockyVertexShader`/
`rockyFragmentShader` (crater displacement, navy/slate/copper/highlight
ramp — used for Mercury), `venusVertexShader`/`venusFragmentShader`
(smooth swirling clouds, gold/amber/cream/pale ramp). Each fragment
shader takes a `uOpacity` uniform and uses it directly in
`gl_FragColor` (see gotcha #4 above — this is mandatory, not optional).
A shared `glowVertexShader`/`glowFragmentShader` (single soft
fresnel-based halo, additive blending, back-side) wraps every planet —
kept to one shell, not multiple concentric rings (multiple rings looked
like a "donut" and were removed).

**Timing:** `getChapterProgress(sectionId)` inside `Planet.jsx` reads
`el.offsetTop` directly from the DOM every frame (see gotcha #5) —
no external hook, no React state for this value. `t` goes 0→1 across
exactly one viewport-height of scrolling once the section's top hits
the viewport top. Position lerps from `start` to `exit` using this `t`
(smoothstepped); opacity is 1 from t=0 until t≈0.55, then fades to 0 by
t≈0.9 (see gotcha #6).

**Sections wired with an `id`** so far: `hero-section` (Sun),
`about-section` (Mercury), `skills-section` (Venus). Remaining sections
(Education, Proof, Projects, Experience, CreativeIdentity, Experiments,
Contact, DeepSpace) do NOT have ids yet and have no planet — next
planets to add, in order: Earth (Education), Mars (Proof), then either
skip Projects (per PRD, asteroid belt is its own interactive system,
Phase 07) or give it a placeholder, Jupiter (Experience), Saturn
(CreativeIdentity — likely wants a ring system, not built yet), Uranus
(Experiments), Neptune (Contact).

**To add a new planet:** (1) add `id="X-section"` to that section's
outer `<section>` tag, (2) if it needs a new visual style, add a new
vertex/fragment shader pair to `planetShaders.js` following the
existing pattern (displacement in vertex, color ramp + `uOpacity` in
fragment) and wire the new `variant` string into `Planet.jsx`'s two
ternaries, (3) add one `<Planet sectionId="X-section" variant="..." ...>`
block in `Galaxy.jsx`. No other file needs to change.

---

## 13. ACCURACY RULE (Still Active)

**NO FAKE CONTENT — ever.**
Never invent skills, experience, certifications, projects,
achievements, job roles, statistics, results, or testimonials.
If something is uncertain: mark it as Learning / Exploring / Interested
in, or ask Jack directly. Authenticity > Impressiveness.

# END OF MEMORY.md