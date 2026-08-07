import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

function MixCard({ mix, index }) {
  const recommendation = mix?.recommendation || 'Balanced mix recommendation'
  const sustainabilityRating = Number(mix?.sustainabilityRating ?? mix?.Sustainability_Rating ?? 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">Mix ID</p>
          <p className="mt-1 text-xl font-semibold text-white">#{index + 1}</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
          <Sparkles size={14} />
          AI Recommendation
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-sm text-slate-400">Predicted Strength</p>
          <p className="mt-1 text-lg font-semibold text-white">{mix?.Strength?.toFixed(2) ?? '—'} MPa</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-sm text-slate-400">Material Cost</p>
          <p className="mt-1 text-lg font-semibold text-white">₹{mix?.Material_Cost_INR?.toFixed(2) ?? '—'}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-sm text-slate-400">Carbon Emission</p>
          <p className="mt-1 text-lg font-semibold text-white">{mix?.Carbon_Emission_kgCO2?.toFixed(2) ?? '—'} kgCO₂</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-sm text-slate-400">Optimization Score</p>
          <p className="mt-1 text-lg font-semibold text-white">{mix?.Optimization_Score?.toFixed(2) ?? '—'}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3">
        <div>
          <p className="text-sm text-slate-400">Sustainability Rating</p>
          <p className="mt-1 text-base font-semibold text-white">{sustainabilityRating.toFixed(2)}/5</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-cyan-200">
          <span>{recommendation}</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </motion.div>
  )
}

export default MixCard
