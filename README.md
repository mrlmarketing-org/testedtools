# operatorstudio.ai — AI Implementation Studio

A premium, enterprise-grade marketing site for a team of AI experts who implement and build AI systems.
Built with **React + Vite + TypeScript + TailwindCSS + Framer Motion**.

> Design direction: large editorial typography, generous whitespace, a white / dark-navy /
> blue / teal palette, and restrained motion. The signature element is a **device showcase**
> in the hero — a laptop running an agent pipeline with a phone streaming the results.

## Getting started

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check + production build to /dist
npm run preview    # preview the production build locally
```

Requires Node 18+.

## Tech

- **React 18** + **Vite 5** + **TypeScript** (strict)
- **TailwindCSS 3** with a custom brand token system (see `tailwind.config.js`)
- **Framer Motion 11** for scroll reveals, the drawn timeline, and hero motion
- **lucide-react** for icons
- Fonts: **Inter** / **Inter Tight** (display) / **IBM Plex Mono** (labels & data), via Google Fonts

## Structure

```
src/
├── App.tsx                 # composes every section in order
├── main.tsx                # entry
├── index.css               # Tailwind layers + base styles + reduced-motion
├── lib/motion.ts           # shared Framer Motion variants / easing
├── data/content.ts         # ALL site copy — edit here to change content
└── components/
    ├── Navbar.tsx          # scroll-aware nav + mobile sheet
    ├── Hero.tsx            # headline, CTAs, device showcase
    ├── showcase/           # laptop + phone device showcase (pipeline + notifications)
    ├── Services.tsx        # six service icon cards
    ├── Industries.tsx      # six industry cards
    ├── Process.tsx         # scroll-drawn animated timeline
    ├── WhyHireUs.tsx       # four premium cards
    ├── FAQ.tsx             # accordion
    ├── FinalCTA.tsx        # closing call to action
    ├── Footer.tsx          # simple footer
    └── ui/                 # Reveal, Button, SectionHeader/Eyebrow primitives
```

## Editing content

All copy — services, industries, process steps, case studies, FAQs — lives in
`src/data/content.ts` as typed arrays. Change text there and it flows through the
components. Brand colors, fonts, shadows, and the fluid display type scale live in
`tailwind.config.js`.

## Design & accessibility notes

- **Palette:** white / off-white surfaces, `ink` navy for dark sections and text,
  `brand` blue for primary actions, `teal` as a restrained accent.
- **Motion:** subtle by design — scroll fade-ups, a hero underline draw, gentle card
  drift, one scroll-drawn timeline. All motion respects `prefers-reduced-motion`.
- Keyboard focus is visible site-wide; the accordion and mobile menu expose
  `aria-expanded`.
- Fully responsive across desktop, tablet, and mobile.

## Notes

The case-study figures and all copy are illustrative placeholders — swap them for real
results before shipping. The **Book a call** CTAs point at `BOOKING_URL` in
`src/lib/config.ts`; set it to your Calendly link when scheduling is ready.
