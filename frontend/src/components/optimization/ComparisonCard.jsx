function ComparisonCard({ label, original, optimized, suffix = '' }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 shadow-lg">
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-sm text-slate-400">Original Mix</p>
          <p className="mt-2 text-xl font-semibold text-white">{original}{suffix}</p>
        </div>
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3">
          <p className="text-sm text-cyan-200">Optimized Mix</p>
          <p className="mt-2 text-xl font-semibold text-white">{optimized}{suffix}</p>
        </div>
      </div>
    </div>
  )
}

export default ComparisonCard
