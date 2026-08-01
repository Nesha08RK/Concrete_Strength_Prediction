import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

function PredictionCTASection() {
  return (
    <section className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_0_80px_rgba(14,165,233,0.15)] backdrop-blur-xl sm:p-8 lg:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start gap-6 rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
            <Sparkles size={15} />
            Live prediction workspace
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Run a concrete strength prediction in seconds</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Explore model-driven strength predictions, sustainability insights, and explainable recommendations with a single click.
          </p>
        </div>

        <Link
          to="/predict"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-medium text-white transition hover:scale-[1.01]"
        >
          Predict Now
          <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  )
}

export default PredictionCTASection
