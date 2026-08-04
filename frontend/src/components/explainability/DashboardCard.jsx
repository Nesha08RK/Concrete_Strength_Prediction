import { motion } from 'framer-motion'

function DashboardCard({ title, value, caption, accent = 'from-cyan-500/20 to-blue-500/10', icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 shadow-[0_0_35px_rgba(14,116,144,0.12)] backdrop-blur-xl"
    >
      <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${accent} p-2.5 text-cyan-200`}>
        {Icon ? <Icon size={18} /> : null}
      </div>
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {caption ? <p className="mt-2 text-sm text-slate-400">{caption}</p> : null}
    </motion.div>
  )
}

export default DashboardCard
