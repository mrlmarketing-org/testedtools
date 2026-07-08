import { motion } from 'framer-motion'
import { services } from '../data/content'
import { SectionHeader } from './ui/SectionHeader'
import { stagger, item, viewportOnce } from '../lib/motion'

export default function Services() {
  return (
    <section id="services" className="relative bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="What we do"
          title="Six ways we turn AI into operating leverage"
          intro="From first strategy to production systems, we cover the full path — and we are just as happy advising your team as building it for you."
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink-900/[0.08] bg-ink-900/[0.07] sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.li
                key={service.id}
                variants={item}
                className="group relative flex flex-col bg-paper transition-colors duration-300 hover:bg-paper-50"
              >
                {/* Cover image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-100">
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-ink-950/5 to-transparent"
                    aria-hidden
                  />
                  <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/85 text-brand-600 shadow-sm backdrop-blur-sm">
                    <Icon size={21} strokeWidth={1.75} />
                  </span>
                  <span className="absolute right-3 top-3 font-mono text-xs text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
                    {service.index}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-ink-900">{service.title}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-900/55">
                    {service.description}
                  </p>
                </div>

                {/* baseline accent that fills on hover */}
                <span className="absolute inset-x-0 bottom-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-teal-400 transition-transform duration-500 ease-smooth group-hover:scale-x-100" />
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
