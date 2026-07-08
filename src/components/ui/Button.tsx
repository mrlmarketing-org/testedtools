import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: Variant
  withArrow?: boolean
  className?: string
  onClick?: () => void
}

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 ease-smooth px-6 py-3 whitespace-nowrap'

const variants: Record<Variant, string> = {
  // Primary — brand blue, for the main call to action.
  primary:
    'bg-brand-500 text-white shadow-[0_8px_24px_-8px_rgba(46,92,255,0.55)] hover:bg-brand-600 hover:shadow-[0_10px_30px_-8px_rgba(46,92,255,0.65)] hover:-translate-y-0.5',
  // Secondary — outlined on light backgrounds.
  secondary:
    'border border-ink-900/12 bg-white text-ink-900 hover:border-ink-900/25 hover:bg-paper-100 hover:-translate-y-0.5',
  // Ghost — text-only.
  ghost: 'text-ink-900/70 hover:text-ink-900 px-2',
  // Light — outlined on dark backgrounds.
  light:
    'border border-white/20 bg-white/[0.04] text-white hover:bg-white/[0.10] hover:border-white/35 hover:-translate-y-0.5',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  withArrow = false,
  className = '',
  onClick,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`
  const inner = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          size={16}
          className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
        />
      )}
    </>
  )

  // Renders as a link when given an href, otherwise a real button (e.g. to open a dialog).
  if (href) {
    return (
      <a href={href} onClick={onClick} className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}
