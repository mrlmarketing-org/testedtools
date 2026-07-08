import type { Variants } from 'framer-motion'

// Shared easing — a calm, premium ease-out used across the site.
export const EASE = [0.22, 1, 0.36, 1] as const

// Standard "reveal on scroll" for section blocks.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

// Container that staggers its children (cards, list items, etc.)
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

// Child item used inside a staggered container.
export const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

// Shared viewport config so reveals fire once, slightly before fully in view.
export const viewportOnce = { once: true, amount: 0.25 } as const
