import { useMemo } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import Plot from 'react-plotly.js'
import { AlertCircle, BrainCircuit, Crown, Gauge, Sparkles, TrendingUp, Waves, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import DashboardCard from '../components/explainability/DashboardCard'
import { usePrediction } from '../context/PredictionContext'

const featureDescriptions = [
  { name: 'cement', label: 'Cement', impact: 'Major positive contributor', tone: 'Positive', icon: Crown },
  { name: 'water', label: 'Water', impact: 'Negative contributor', tone: 'Negative', icon: Zap },
  { name: 'age', label: 'Age', impact: 'Strong positive contributor', tone: 'Positive', icon: Sparkles },
  { name: 'fly_ash', label: 'Fly Ash', impact: 'Moderate positive contributor', tone: 'Positive', icon: Sparkles },
  { name: 'coarse_aggregate', label: 'Coarse Aggregate', impact: 'Minor contribution', tone: 'Neutral', icon: Waves },
  { name: 'fine_aggregate', label: 'Fine Aggregate', impact: 'Minor contribution', tone: 'Neutral', icon: Waves },
]

function formatMetric(value, prefix = '', suffix = '') {
  const numeric = Number(value)
  if (Number.isNaN(numeric)) return '—'
  return `${prefix}${numeric.toFixed(2)}${suffix}`
}

function ExplainabilityPage() {
  const { prediction } = usePrediction()

  const data = prediction

  const featureImportance = useMemo(() => {
    const values = data?.shap_values || data?.feature_importance || []
    return values
      .map((item) => ({
        feature: item.feature || item.name || 'Feature',
        contribution: Number(item.contribution ?? item.value ?? item.mean_shap_value ?? 0),
      }))
      .filter((entry) => Number.isFinite(entry.contribution))
      .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
  }, [data])

  const barData = useMemo(() => {
    const positive = featureImportance.filter((entry) => entry.contribution >= 0)
    const negative = featureImportance.filter((entry) => entry.contribution < 0)
    return {
      x: [...negative.map((entry) => -entry.contribution), ...positive.map((entry) => entry.contribution)],
      y: [...negative.map((entry) => entry.feature), ...positive.map((entry) => entry.feature)],
      orientation: 'h',
      marker: {
        color: [...negative.map(() => '#fb7185'), ...positive.map(() => '#22d3ee')],
      },
      text: [...negative.map((entry) => `-${entry.contribution.toFixed(1)}`), ...positive.map((entry) => entry.contribution.toFixed(1))],
      textposition: 'outside',
    }
  }, [featureImportance])

  const waterfallData = useMemo(() => {
    const steps = featureImportance.slice(0, 6)
    const y = steps.map((entry) => entry.feature)
    const base = [0]
    const cumulative = []
    let running = 0

    steps.forEach((entry) => {
      running += entry.contribution
      cumulative.push(running)
      base.push(running)
    })

    return {
      type: 'waterfall',
      orientation: 'h',
      x: steps.map((entry) => entry.contribution),
      measure: steps.map(() => 'relative'),
      connector: { line: { color: 'rgba(148, 163, 184, 0.45)' } },
      increasing: { marker: { color: '#22d3ee' } },
      decreasing: { marker: { color: '#fb7185' } },
      totals: { marker: { color: '#f8fafc' } },
      hovertemplate: '%{x:.2f} contribution<extra></extra>',
      y,
    }
  }, [featureImportance])

  const summaryData = useMemo(() => ({
    x: featureImportance.map((entry) => entry.contribution),
    y: featureImportance.map((entry) => entry.feature),
    type: 'scatter',
    mode: 'markers',
    marker: { size: 12, color: featureImportance.map((entry) => entry.contribution >= 0 ? '#22d3ee' : '#fb7185') },
    hovertemplate: '%{y}: %{x:.2f}<extra></extra>',
  }), [featureImportance])

  return (
    <div className="py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_0_100px_rgba(37,99,235,0.14)] backdrop-blur-xl sm:p-8 lg:p-10"
      >
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
              <BrainCircuit size={15} />
              Explainability dashboard
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Explainable AI (SHAP)</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Understand how each concrete ingredient influenced the predicted compressive strength.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-300">
            <p className="font-medium text-white">Live insights</p>
            <p className="mt-1">Visualizing the backend explainability results in real time.</p>
          </div>
        </div>

        {!data ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-200">
              <AlertCircle size={22} />
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white">No prediction available.</h2>
            <p className="mt-3 text-base leading-7 text-slate-300">Please predict a concrete mix first to unlock explainability insights.</p>
            <Link to="/predict" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-medium text-white transition hover:scale-[1.01]">
              Go to Prediction Page
              <Sparkles size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <DashboardCard title="Predicted Strength" value={<CountUp end={data?.predicted_strength || 0} duration={1.2} suffix=" MPa" />} caption="Estimated compressive strength" icon={Gauge} />
              <DashboardCard title="Strength Category" value={data?.strength_category || 'High Strength'} caption="Model confidence band" icon={TrendingUp} />
              <DashboardCard title="Material Cost" value={formatMetric(data?.material_cost, '₹', '')} caption="Per cubic meter estimate" icon={Crown} />
              <DashboardCard title="Carbon Emission" value={formatMetric(data?.carbon_emission, '', ' kgCO₂')} caption="Lifecycle footprint" icon={Zap} />
              <DashboardCard title="Optimization Score" value={formatMetric(data?.optimization_score, '', '')} caption="Balanced performance metric" icon={Sparkles} />
              <DashboardCard title="Sustainability Rating" value={formatMetric(data?.sustainability_rating, '', '/5')} caption="Environmental quality rating" icon={Waves} />
            </div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Feature Importance</h2>
                  <p className="text-sm text-slate-400">A premium horizontal view of the most influential ingredients.</p>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">Animated on load</div>
              </div>
              <div className="h-[360px]">
                <Plot
                  data={[barData]}
                  layout={{
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    margin: { l: 80, r: 40, t: 20, b: 40 },
                    showlegend: false,
                    xaxis: { showgrid: true, gridcolor: 'rgba(148,163,184,0.16)', zeroline: false, color: '#cbd5e1' },
                    yaxis: { automargin: true, color: '#e2e8f0' },
                    font: { color: '#f8fafc' },
                  }}
                  config={{ responsive: true, displayModeBar: false }}
                  useResizeHandler
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </motion.div>

            <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-xl">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white">SHAP Waterfall</h2>
                  <p className="text-sm text-slate-400">Interactive contribution flow for the current prediction.</p>
                </div>
                <div className="h-[340px]">
                  <Plot
                    data={[waterfallData]}
                    layout={{
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      margin: { l: 80, r: 40, t: 20, b: 40 },
                      showlegend: false,
                      xaxis: { color: '#cbd5e1', gridcolor: 'rgba(148,163,184,0.16)' },
                      yaxis: { automargin: true, color: '#e2e8f0' },
                      font: { color: '#f8fafc' },
                    }}
                    config={{ responsive: true, displayModeBar: false }}
                    useResizeHandler
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-xl">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white">SHAP Summary</h2>
                  <p className="text-sm text-slate-400">A responsive, zoomable summary of how each feature shifts prediction.</p>
                </div>
                <div className="h-[340px]">
                  <Plot
                    data={[summaryData]}
                    layout={{
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      margin: { l: 80, r: 40, t: 20, b: 40 },
                      showlegend: false,
                      xaxis: { title: 'Contribution', color: '#cbd5e1', gridcolor: 'rgba(148,163,184,0.16)' },
                      yaxis: { automargin: true, color: '#e2e8f0' },
                      font: { color: '#f8fafc' },
                    }}
                    config={{ responsive: true, displayModeBar: false }}
                    useResizeHandler
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </motion.div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featureDescriptions.map((feature, index) => {
                const Icon = feature.icon
                const corresponding = featureImportance.find((entry) => entry.feature === feature.name)
                const contribution = corresponding?.contribution ?? 0
                return (
                  <motion.div key={feature.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.08 }} className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-cyan-500/10 p-2 text-cyan-200">
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-white">{feature.label}</p>
                          <p className="text-sm text-slate-400">{feature.impact}</p>
                        </div>
                      </div>
                      <div className={`rounded-full px-2.5 py-1 text-xs font-medium ${contribution >= 0 ? 'bg-cyan-500/10 text-cyan-200' : 'bg-rose-500/10 text-rose-200'}`}>
                        {contribution >= 0 ? '+' : ''}{contribution.toFixed(1)}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="rounded-[1.75rem] border border-cyan-400/20 bg-cyan-500/10 p-6 text-slate-100 shadow-xl">
              <h2 className="text-xl font-semibold text-white">Natural Language Explanation</h2>
              <p className="mt-3 text-lg leading-8 text-slate-200">“{data?.explanation || 'The prediction is generated from the latest concrete mix analysis and reflects the model’s current feature contributions.'}”</p>
            </motion.div>

            <div className="grid gap-4 lg:grid-cols-3">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
                <h3 className="text-lg font-semibold text-white">Engineering Insights</h3>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
                  {Array.isArray(data?.recommendations) && data.recommendations.length > 0 ? data.recommendations.map((recommendation) => (
                    <li key={recommendation}>• {recommendation}</li>
                  )) : (
                    <li>• Review the current feature contributions to refine the mix.</li>
                  )}
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }} className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
                <h3 className="text-lg font-semibold text-white">Feature Ranking</h3>
                <div className="mt-4 space-y-3">
                  {featureImportance.slice(0, 5).map((entry, index) => (
                    <div key={entry.feature} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
                      <span className="text-slate-200">#{index + 1} {entry.feature}</span>
                      <span className={`${entry.contribution >= 0 ? 'text-cyan-200' : 'text-rose-200'}`}>{entry.contribution.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }} className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
                <h3 className="text-lg font-semibold text-white">Impact Summary</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <p>Positive drivers are concentrated around binder content and maturity.</p>
                  <p>Water appears as the main trade-off feature for strength.</p>
                  <p>Supplementary materials may offer sustainable balance without severe loss.</p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default ExplainabilityPage
