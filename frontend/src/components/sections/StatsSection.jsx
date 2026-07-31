import CountUp from 'react-countup'
import { motion } from 'framer-motion'

const stats = [
  { value: 1030, suffix: '+', label: 'Concrete Samples' },
  { value: 7, label: 'Machine Learning Models' },
  { value: 0.939, decimals: 3, label: 'Best R² Score' },
  { value: 8, label: 'Input Features' },
]

function StatsSection() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/50 px-6 py-16 backdrop-blur-xl sm:px-10">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Performance Snapshot</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Measured for confidence and clarity</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 text-center"
          >
            <div className="text-4xl font-semibold text-white sm:text-5xl">
              <CountUp end={stat.value} decimals={stat.decimals ?? 0} duration={2.2} suffix={stat.suffix ?? ''} />
            </div>
            <p className="mt-3 text-sm text-slate-300">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default StatsSection
