# Mohd Zamaan Akhtar — Portfolio

> **Scalable. Engineered.** An immersive, 3D personal portfolio built with Three.js and WebGL, paired with a fast, accessible project index.

<!-- Add your deployed URL here, e.g. **Live site:** https://your-site.netlify.app -->

I'm a Computer Science undergraduate and full-stack software engineer who enjoys data structures, algorithms, scalable backends, and interactive web experiences. This repository contains the source for my personal portfolio: a 3D "sanctuary" landing page, a browsable 3D project library, and a plain, lightweight project index.

---

## Highlights

- **Immersive 3D landing page** with a WebGL scene, layered parallax foreground assets, and scroll-driven camera movement.
- **3D project library** where each project is a "volume" you can open and explore (`work.html`).
- **Lightweight project index** (`projects.html`) rendered from a single JSON file, so it works as a clean fallback for fast connections, slow devices, or browsers without WebGL.
- **Portal page transitions** between the home page and the library, with a skip button and support for `prefers-reduced-motion`.
- **Accessibility and resilience:** skip-to-content links, ARIA labels on overlays, keyboard handling, and a static fallback if the 3D scene fails to load.
- **Performance tuning:** asset preloading, `content-visibility` on off-screen sections, capped device pixel ratio, and reduced layout thrashing in the render loop.

---

## Featured Projects

All seven projects are defined in [`projects.json`](./projects.json).

| # | Project | Focus | Stack |
|---|---------|-------|-------|
| 01 | **DSA Visualizer** | Interactive sorting algorithms and data structures with step-by-step state inspection | React.js, CSS3, JavaScript |
| 02 | **IoT Smart Governance** | AI-integrated municipal monitoring, telemetry ingestion, automated reporting | Express.js, Node.js, AI, IoT, Cloud |
| 03 | **Developer Portfolio** | This site: custom GLSL shaders, scroll-driven camera, tactile 3D field guides | Three.js, WebGL, CSS3, Git |
| 04 | **Cognifyz Engineering Suite** | Software modules built during a competitive engineering internship | Java, JavaScript, OOP, REST APIs |
| 05 | **Java Full Stack Enterprise** | Backend API integration, structured debugging, modular UI | Java, Spring Boot, REST APIs, SQL |
| 06 | **Hackathon Innovation Platform** | Top 36 finalist out of 1,600+ teams in Metamorph 2.0; Smart India Hackathon nominee | Full Stack, AI, C++, Cloud |
| 07 | **Algorithmic Engine & DSA** | Daily problem solving in C++ and Java | C++, Java, Algorithms, LeetCode |

---

## Tech Stack

| Area | Tools |
|------|-------|
| Front end | HTML5, CSS3, vanilla JavaScript (ES modules) |
| 3D / graphics | [Three.js](https://threejs.org/), WebGL, custom GLSL shaders |
| Assets | WebP images, SVG project previews, self-hosted web fonts |
| Tooling | Git, Python (build-time HTML optimization script) |

---

## Project Structure

```
zamaan-portfolio/
├── index.html              # Home page with the 3D scene (about, library, principles, contact)
├── work.html               # 3D project library
├── projects.html           # Lightweight, accessible project index
├── projects.json           # Single source of truth for all project data
├── projects.js             # Renders projects.json into projects.html
├── library.js              # Fallback if the 3D renderer is blocked or slow
├── transition.js           # Portal transition between home and library
├── arrival.js              # Smooth reveal when arriving from a transition
├── identity.css            # Shared styles and design tokens
├── fonts.css               # Self-hosted font faces
├── favicon.svg
├── optimize_index.py       # Applies performance tweaks to index.html
├── previews/               # SVG preview art for each project
├── secret-pathways-assets/ # Scene assets: three.min.js, fonts, generated art, foreground layers
│   ├── generated/
│   └── foreground/png/
└── vendor/three/           # Three.js module build and examples (OrbitControls, RoomEnvironment, etc.)
```

---

## Getting Started

The site is fully static, but it loads `projects.json` with `fetch` and uses ES modules, so open it through a local web server rather than double-clicking the HTML file.

```bash
# 1. Clone the repository
git clone https://github.com/zamaan-ai/portfolio.git
cd portfolio

# 2. Start any static server, for example:
python3 -m http.server 8000
# or
npx serve .

# 3. Open in your browser
# http://localhost:8000
```

### Optional: re-run the performance script

`optimize_index.py` patches `index.html` in place (adds preload hints, CSS containment, a lower DPR cap, and a cheaper opacity check). It is safe to run more than once.

```bash
python3 optimize_index.py
```

---

## Adding or Editing a Project

Edit `projects.json` and add an object in this shape. The project index updates automatically.

```json
{
  "id": "my-project",
  "title": "My Project",
  "discipline": "Area of work",
  "note": "One-line summary.",
  "deck": "Short description.",
  "stack": "Tool · Tool · Tool",
  "status": "Current status",
  "focus": "Key focus areas",
  "detail": "Longer description.",
  "chapters": ["Chapter One", "Chapter Two", "Chapter Three"],
  "repo": "github-repo-name",
  "private": false,
  "live": "https://example.com",
  "color": "#182a43",
  "foil": "#d9a86d"
}
```

Set `"private": true` to replace the "View source" link with a "Request a walkthrough" email link. Add a matching preview image at `previews/<id>.svg`.

---

## Browser Support

Any modern browser with WebGL and ES module support (current Chrome, Edge, Firefox, and Safari). Users with `prefers-reduced-motion` enabled skip the portal transitions automatically.

---

## Connect

- **Email:** [akhtarzamaan997@gmail.com](mailto:akhtarzamaan997@gmail.com)
- **GitHub:** [github.com/zamaan-ai](https://github.com/zamaan-ai)
- **LinkedIn:** [linkedin.com/in/mohd-zamaan-akhtar](https://www.linkedin.com/in/mohd-zamaan-akhtar)

I'm open to software engineering roles, full-stack opportunities, and conversations about scalable systems and algorithms.

---

## License

© 2026 Mohd Zamaan Akhtar. All rights reserved.

The source is shared for viewing and learning. Please don't copy the design, written content, or generated artwork without permission. Third-party libraries (such as Three.js) remain under their own licenses.
