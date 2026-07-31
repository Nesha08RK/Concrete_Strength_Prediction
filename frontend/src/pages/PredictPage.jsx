import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { AlertCircle, ArrowRight, BrainCircuit, LoaderCircle, Sparkles, TrendingUp, Waves, Zap } from 'lucide-react'
import { predictConcrete } from '../services/api'

const initialForm = {
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
  {
    key: 'cement',
    label: 'Cement',
    icon: BrainCircuit,
    min: 100,
    max: 600,
    step: 1,
    suffix: 'kg/m³',
    tooltip: 'Primary binder in the concrete mix',
  },
  {
    key: 'blast_furnace_slag',
    label: 'Blast Furnace Slag',
    icon: Waves,
    min: 0,
    max: 400,
    step: 1,
    suffix: 'kg/m³',
    tooltip: 'Supplementary cementitious material',
  },
  {
    key: 'fly_ash',
    label: 'Fly Ash',
    icon: Sparkles,
    min: 0,
    max: 300,
    step: 1,
    suffix: 'kg/m³',
    tooltip: 'Low-carbon binding additive',
  },
  {
    key: 'water',
    label: 'Water',
    icon: Zap,
    min: 100,
    max: 250,
    step: 0.1,
    suffix: 'kg/m³',
    tooltip: 'Hydration and workability control',
  },
  {
    key: 'superplasticizer',
    label: 'Superplasticizer',
    icon: TrendingUp,
    min: 0,
    max: 20,
    step: 0.1,
    suffix: 'kg/m³',
    tooltip: 'Improves flow without excess water',
  },
  {
    key: 'coarse_aggregate',
    label: 'Coarse Aggregate',
    icon: BrainCircuit,
    min: 600,
    max: 1200,
    step: 1,
    suffix: 'kg/m³',
    tooltip: 'Large granular skeleton of the mix',
  },
  {
    key: 'fine_aggregate',
    label: 'Fine Aggregate',
    icon: Waves,
    min: 500,
    max: 900,
    step: 1,
    suffix: 'kg/m³',
    tooltip: 'Fine filler that improves packing',
  },
  {
    key: 'age',
    label: 'Age',
    icon: Sparkles,
    min: 1,
    max: 365,
    step: 1,
    suffix: 'days',
    tooltip: 'Concrete maturity and strength gain period',
  },
]

function PredictPage() {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [stepIndex, setStepIndex] = useState(0)

  const validation = useMemo(() => {
    const nextErrors = {}

    fieldConfig.forEach((field) => {
      const value = formData[field.key]
      if (value === '' || value === null || Number.isNaN(Number(value))) {
        nextErrors[field.key] = 'A valid number is required.'
        return
      }

      const numericValue = Number(value)
      if (numericValue < field.min || numericValue > field.max) {
        nextErrors[field.key] = `Value must be between ${field.min} and ${field.max}.`
      }
    })

    return nextErrors
  }, [formData])

  useEffect(() => {
    if (!isLoading) return undefined

    const loadingSteps = [
      'Loading AI Model...',
      'Predicting Strength...',
      'Generating Recommendation...',
      'Almost Done...',
    ]

    setStepIndex(0)
    const timer = window.setInterval(() => {
      setStepIndex((current) => (current + 1) % loadingSteps.length)
    }, 900)

    return () => window.clearInterval(timer)
  }, [isLoading])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value === '' ? '' : Number(value),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (Object.keys(validation).length > 0) return

    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const payload = {
        cement: Number(formData.cement),
        blast_furnace_slag: Number(formData.blast_furnace_slag),
        fly_ash: Number(formData.fly_ash),
        water: Number(formData.water),
        superplasticizer: Number(formData.superplasticizer),
        coarse_aggregate: Number(formData.coarse_aggregate),
        fine_aggregate: Number(formData.fine_aggregate),
        age: Number(formData.age),
      }
      const response = await predictConcrete(payload)
      setResult(response)
    } catch (err) {
      setError(err.message || 'Prediction request failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = Object.keys(validation).length === 0

  return (
    <div className="py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_0_100px_rgba(37,99,235,0.14)] backdrop-blur-xl sm:p-8 lg:p-10"
      >
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
              <Sparkles size={15} />
              Live prediction workspace
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Predict concrete strength with confidence</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Fine-tune your mix recipe, validate your inputs, and receive strength, cost, carbon, and sustainability insights from the SmartCrete AI API.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-300">
            <p className="font-medium text-white">Connected to</p>
            <p className="mt-1">Flask REST API at 127.0.0.1:5000</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {fieldConfig.map((field) => {
              const Icon = field.icon
              const value = formData[field.key]
              const hasError = Boolean(validation[field.key])

              return (
                <motion.label
                  key={field.key}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="block rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-blue-500/15 p-2 text-blue-300">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{field.label}</p>
                        <p className="text-xs text-slate-400">{field.tooltip}</p>
                      </div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-200">
                      {Number(value).toFixed(field.step < 1 ? 1 : 0)} {field.suffix}
                    </div>
                  </div>

                  <input
                    type="range"
                    name={field.key}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={value}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-cyan-400"
                  />

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>{field.min} {field.suffix}</span>
                    <span>{field.max} {field.suffix}</span>
                  </div>

                  {hasError ? (
                    <p className="mt-3 flex items-center gap-2 text-sm text-rose-300">
                      <AlertCircle size={14} />
                      {validation[field.key]}
                    </p>
                  ) : (
                    <p className="mt-3 text-sm text-emerald-300">Ready for prediction</p>
                  )}
                </motion.label>
              )
            })}

            <motion.button
              type="submit"
              whileHover={{ scale: isLoading || !isFormValid ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading || !isFormValid}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-lg font-semibold text-white shadow-[0_0_40px_rgba(34,211,238,0.25)] transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Predicting...
                </>
              ) : (
                <>
                  Predict Concrete Strength
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5"
          >
            {isLoading ? (
              <div className="flex h-full min-h-[420px] flex-col justify-center rounded-[1.5rem] border border-cyan-400/20 bg-cyan-500/10 p-6">
                <div className="mx-auto mb-5 rounded-full border border-cyan-400/20 bg-slate-950/70 p-3 text-cyan-300">
                  <LoaderCircle size={24} className="animate-spin" />
                </div>
                <h2 className="text-center text-2xl font-semibold text-white">Analyzing your mix</h2>
                <p className="mt-3 text-center text-sm leading-7 text-slate-300">
                  Our AI model is processing your concrete recipe and preparing an explainable recommendation.
                </p>
                <div className="mt-8 space-y-3">
                  {['Loading AI Model...', 'Predicting Strength...', 'Generating Recommendation...', 'Almost Done...'].map((step, index) => (
                    <div key={step} className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${index === stepIndex ? 'border-cyan-400/30 bg-slate-900/80 text-white' : 'border-white/10 bg-slate-950/60 text-slate-400'}`}>
                      <span>{step}</span>
                      {index === stepIndex ? <span className="text-cyan-300">Running</span> : <span>Queued</span>}
                    </div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="flex h-full min-h-[420px] flex-col justify-center rounded-[1.5rem] border border-rose-400/20 bg-rose-500/10 p-6 text-center">
                <div className="mx-auto mb-5 rounded-full border border-rose-400/20 bg-slate-950/70 p-3 text-rose-300">
                  <AlertCircle size={24} />
                </div>
                <h2 className="text-2xl font-semibold text-white">Prediction unavailable</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{error}</p>
                <button
                  type="button"
                  onClick={() => handleSubmit({ preventDefault: () => {} })}
                  className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white"
                >
                  Retry Prediction
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-500/10 p-5">
                  <p className="text-sm text-emerald-200">Predicted strength</p>
                  <p className="mt-3 text-4xl font-semibold text-white">
                    <CountUp end={result.predicted_strength} decimals={2} duration={1.2} />
                    <span className="ml-2 text-xl text-emerald-100">MPa</span>
                  </p>
                  <p className="mt-2 text-sm font-medium text-emerald-100">{result.strength_category}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                    <p className="text-sm text-slate-400">Material cost</p>
                    <p className="mt-2 text-xl font-semibold text-white">₹{result.material_cost}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                    <p className="text-sm text-slate-400">Carbon emission</p>
                    <p className="mt-2 text-xl font-semibold text-white">{result.carbon_emission} kgCO₂</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                    <p className="text-sm text-slate-400">Optimization score</p>
                    <p className="mt-2 text-xl font-semibold text-white">{result.optimization_score}%</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                    <p className="text-sm text-slate-400">Sustainability rating</p>
                    <p className="mt-2 text-xl font-semibold text-white">{result.sustainability_rating}/5</p>
                  </div>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm font-medium text-slate-200">Recommendations</p>
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
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-white/10 bg-slate-900/50 p-6 text-center">
                <div className="rounded-full border border-white/10 bg-white/10 p-3 text-cyan-300">
                  <BrainCircuit size={24} />
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-white">Prediction preview</h2>
                <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
                  Submit your mix recipe to see the predicted strength, sustainability score, and AI recommendations here.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default PredictPage
