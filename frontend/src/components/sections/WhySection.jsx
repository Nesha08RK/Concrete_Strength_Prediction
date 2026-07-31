import { motion } from 'framer-motion'
import { BadgeCheck, BrainCircuit, Gauge, Leaf } from 'lucide-react'

const reasons = [
  { title: 'AI Powered', description: 'Intuitive intelligence for fast decision making.', icon: BrainCircuit },
  { title: 'Explainable AI', description: 'Transparent model reasoning with SHAP insights.', icon: BadgeCheck },
  { title: 'Cost Optimization', description: 'Balance quality, price, and feasibility.', icon: Gauge },
  { title: 'Sustainable Concrete', description: 'Lower emission mix strategies with precision.', icon: Leaf },
]

function WhySection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Why SmartCrete AI</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Built for modern infrastructure teams</h2>
        <p className="mt-4 text-slate-300">The experience blends engineering clarity with a premium design system to feel as strong as the concrete it models.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {reasons.map((reason, index) => {
          const Icon = reason.icon
          return (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className="rounded-[1.5rem] border border-white/10 bg-slate-900/50 p-6"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-blue-200">
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-white">{reason.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{reason.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default WhySection
