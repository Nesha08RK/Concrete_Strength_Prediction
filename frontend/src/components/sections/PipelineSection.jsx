import { motion } from 'framer-motion'

const steps = ['Dataset', 'Preprocessing', 'Machine Learning', 'SHAP Explainability', 'Optimization', 'Recommendation']

function PipelineSection() {
  return (
    <section id="explainability" className="rounded-[2rem] border border-white/10 bg-slate-900/40 px-6 py-16 backdrop-blur-xl sm:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Workflow</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">A premium pipeline from data to recommendation</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">Every stage is designed to feel clear, explainable, and production-ready for modern engineering teams.</p>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className="rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-slate-100"
          >
            {step}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default PipelineSection
