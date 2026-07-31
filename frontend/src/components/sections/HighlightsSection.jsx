import { motion } from 'framer-motion'

const highlights = [
  'Explainable AI using SHAP',
  'Multi-objective Optimization',
  'Carbon-aware Concrete Design',
  'Modern Engineering Dashboard',
]

function HighlightsSection() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-950/70 px-6 py-16 backdrop-blur-xl sm:px-10">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Project Highlights</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">The future of interpretable concrete design</h2>
          <p className="mt-4 text-slate-300">This experience is structured to look and feel like the product layer of a real AI engineering platform.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              className="rounded-[1.25rem] border border-white/10 bg-white/10 p-5 text-slate-100"
            >
              {highlight}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HighlightsSection
