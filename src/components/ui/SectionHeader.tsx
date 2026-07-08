import type { ReactNode } from 'react'
import Reveal from './Reveal'

export function Eyebrow({
  children,
  tone = 'dark',
}: {
  children: ReactNode
  tone?: 'dark' | 'light'
}) {
  const color = tone === 'light' ? 'text-teal-400' : 'text-brand-600'
  return (
    <span className={`eyebrow inline-flex items-center gap-2 ${color}`}>
      <span className="h-1 w-1 rounded-full bg-current" aria-hidden />
      {children}
    </span>
  )
}

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  tone = 'dark',
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const titleColor = tone === 'light' ? 'text-white' : 'text-ink-900'
  const introColor = tone === 'light' ? 'text-white/60' : 'text-ink-900/55'
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <Reveal className={`flex max-w-2xl flex-col gap-5 ${alignment} ${className}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className={`font-display text-display-md font-semibold ${titleColor}`}>{title}</h2>
      {intro && <p className={`text-lg leading-relaxed ${introColor}`}>{intro}</p>}
    </Reveal>
  )
}
