import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, LoaderCircle, Sparkles } from 'lucide-react'
import { predictConcreteMix } from '../../services/predictionApi'

const defaultForm = {
  cement: 540,
  blast_furnace_slag: 0,
  fly_ash: 0,
  water: 162,
  superplasticizer: 2.5,
  coarse_aggregate: 1040,
  fine_aggregate: 676,
  age: 28,
}

const fieldConfig = [
  { key: 'cement', label: 'Cement (kg/m³)', step: 1 },
  { key: 'blast_furnace_slag', label: 'Blast Furnace Slag (kg/m³)', step: 1 },
  { key: 'fly_ash', label: 'Fly Ash (kg/m³)', step: 1 },
  { key: 'water', label: 'Water (kg/m³)', step: 0.1 },
  { key: 'superplasticizer', label: 'Superplasticizer (kg/m³)', step: 0.1 },
  { key: 'coarse_aggregate', label: 'Coarse Aggregate (kg/m³)', step: 1 },
  { key: 'fine_aggregate', label: 'Fine Aggregate (kg/m³)', step: 1 },
  { key: 'age', label: 'Age (days)', step: 1 },
]

function PredictSection() {
  const [formData, setFormData] = useState(defaultForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value === '' ? '' : Number(value),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await predictConcreteMix(formData)
      setResult(response)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="predict" className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_0_80px_rgba(14,165,233,0.15)] backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
            <Sparkles size={15} />
            Live prediction workspace
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Run a concrete strength prediction in seconds</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">
              Enter the concrete mix proportions below to unlock AI-powered strength prediction, explainable insights, cost estimation, carbon footprint analysis, and intelligent mix optimization—all in one seamless workflow.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-4 sm:grid-cols-2">
            {fieldConfig.map((field) => (
              <label key={field.key} className="flex flex-col gap-2 text-sm text-slate-300">
                <span>{field.label}</span>
                <input
                  name={field.key}
                  type="number"
                  min="0"
                  step={field.step}
                  value={formData[field.key]}
                  onChange={handleChange}
                  className="rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-2 text-white outline-none ring-0 transition focus:border-cyan-400"
                />
              </label>
            ))}

            <div className="sm:col-span-2">
              <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-medium text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70">
                {loading ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    Predict Mix
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5">
          {error ? (
            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          ) : result ? (
            <div className="space-y-5">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <p className="text-sm text-emerald-200">Predicted strength</p>
                <p className="mt-2 text-4xl font-semibold text-white">{result.predicted_strength} MPa</p>
                <p className="mt-2 text-sm text-emerald-100">{result.strength_category}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Material cost</p>
                  <p className="mt-2 text-xl font-semibold text-white">₹{result.material_cost}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Carbon emission</p>
                  <p className="mt-2 text-xl font-semibold text-white">{result.carbon_emission} kgCO₂</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Optimization score</p>
                  <p className="mt-2 text-xl font-semibold text-white">{result.optimization_score}%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Sustainability rating</p>
                  <p className="mt-2 text-xl font-semibold text-white">{result.sustainability_rating}/5</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-sm font-medium text-slate-200">Recommended actions</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {result.recommendations.map((recommendation) => (
                    <li key={recommendation} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/50 p-6 text-center text-sm leading-7 text-slate-400">
              Submit a mix recipe to view the AI-powered strength and sustainability analysis here.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default PredictSection
