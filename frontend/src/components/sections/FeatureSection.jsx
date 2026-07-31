import { motion } from 'framer-motion'
import { Brain, Calculator, Leaf, Sparkles } from 'lucide-react'

const features = [
  {
    title: 'Predict Strength',
    description: 'Assess compressive strength with interpretable AI-driven insights.',
    icon: Brain,
    accent: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    title: 'Cost Estimation',
    description: 'Model material costs while balancing performance and sustainability.',
    icon: Calculator,
    accent: 'from-amber-500/20 to-orange-500/10',
  },
  {
    title: 'Carbon Analysis',
    description: 'Quantify emissions and expose greener design opportunities.',
    icon: Leaf,
    accent: 'from-emerald-500/20 to-lime-500/10',
  },
  {
    title: 'AI Optimization',
    description: 'Recommend high-performing concrete mixes with multi-objective logic.',
    icon: Sparkles,
    accent: 'from-violet-500/20 to-fuchsia-500/10',
  },
]

function FeatureSection() {
  return (
    <section id="predict" className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Capabilities</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Engineered around modern concrete intelligence</h2>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 p-6 shadow-[0_0_40px_rgba(15,23,42,0.35)] backdrop-blur-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-60 transition duration-300 group-hover:opacity-100`} />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-blue-200">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

export default FeatureSection
