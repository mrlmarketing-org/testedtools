import { BOOKING_URL } from '../lib/config'

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'AI Strategy', href: '#services' },
      { label: 'Workflow Automation', href: '#services' },
      { label: 'AI Deployment', href: '#services' },
      { label: 'Custom AI Development', href: '#services' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Property Management', href: '/industries/property-management.html' },
      { label: 'Healthcare', href: '/industries/healthcare.html' },
      { label: 'Legal', href: '/industries/legal.html' },
      { label: 'Financial Services', href: '/industries/financial-services.html' },
      { label: 'All industries', href: '/industries/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Process', href: '#process' },
      { label: 'Outcomes', href: '#outcomes' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Book a Call', href: BOOKING_URL },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-900/[0.08] bg-paper">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5 text-ink-900">
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
                <rect width="32" height="32" rx="7" fill="#0A1424" />
                <path
                  d="M8 16.5l4.8 4.8L23.5 10.5"
                  stroke="#2E5CFF"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="24.5" cy="8" r="1.8" fill="#2DD4BF" />
              </svg>
              <span className="font-display text-lg font-semibold tracking-tight">
                operatorstudio<span className="text-brand-600">.ai</span>
              </span>
            </a>
            <p className="mt-5 text-sm leading-relaxed text-ink-900/55">
              AI experts who help companies choose, deploy, and build AI systems that create
              measurable business value.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="eyebrow text-ink-900/40">{col.title}</h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-ink-900/65 transition-colors hover:text-ink-900"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ink-900/[0.08] pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-900/45">© {year} operatorstudio.ai. All rights reserved.</p>
          <a
            href={BOOKING_URL}
            className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
          >
            Book a call
          </a>
        </div>
      </div>
    </footer>
  )
}
