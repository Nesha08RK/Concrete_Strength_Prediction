import { useMemo } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import Plot from 'react-plotly.js'
import { AlertCircle, BrainCircuit, Gauge, Sparkles, TrendingUp, Waves, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MetricCard from '../components/optimization/MetricCard'
import MixCard from '../components/optimization/MixCard'
import ComparisonCard from '../components/optimization/ComparisonCard'
import BadgeChip from '../components/optimization/BadgeChip'
import { usePrediction } from '../context/PredictionContext'

const badges = ['Eco Friendly', 'Low Carbon', 'Cost Efficient', 'High Strength', 'Balanced Mix']

function OptimizationPage() {
  const navigate = useNavigate()
  const { prediction } = usePrediction()
  const data = prediction
  const mixes = data?.optimized_mixes || data?.top_optimized_mixes || data?.mixes || []

  const summary = useMemo(() => {
    if (!mixes.length) {
      return {
        bestScore: 0,
        avgStrength: 0,
        avgCost: 0,
        avgCarbon: 0,
        bestSustainability: 0,
      }
    }

    return {
      bestScore: Math.max(...mixes.map((mix) => Number(mix.Optimization_Score ?? mix.optimization_score ?? 0))),
      avgStrength: mixes.reduce((total, mix) => total + Number(mix.Strength ?? 0), 0) / mixes.length,
      avgCost: mixes.reduce((total, mix) => total + Number(mix.Material_Cost_INR ?? 0), 0) / mixes.length,
      avgCarbon: mixes.reduce((total, mix) => total + Number(mix.Carbon_Emission_kgCO2 ?? 0), 0) / mixes.length,
      bestSustainability: Math.max(...mixes.map((mix) => Number(mix.sustainabilityRating ?? mix.Sustainability_Rating ?? 0))),
    }
  }, [mixes])

  const strengthCost = useMemo(() => ({
    x: mixes.map((mix) => Number(mix.Material_Cost_INR ?? 0)),
    y: mixes.map((mix) => Number(mix.Strength ?? 0)),
    mode: 'markers',
    type: 'scatter',
    marker: { size: 11, color: '#22d3ee' },
    text: mixes.map((_, index) => `Mix ${index + 1}`),
    hovertemplate: 'Cost: %{x:.2f} ₹<br>Strength: %{y:.2f} MPa<extra></extra>',
  }), [mixes])

  const strengthCarbon = useMemo(() => ({
    x: mixes.map((mix) => Number(mix.Carbon_Emission_kgCO2 ?? 0)),
    y: mixes.map((mix) => Number(mix.Strength ?? 0)),
    mode: 'markers',
    type: 'scatter',
    marker: { size: 11, color: '#34d399' },
    text: mixes.map((_, index) => `Mix ${index + 1}`),
    hovertemplate: 'Carbon: %{x:.2f} kgCO₂<br>Strength: %{y:.2f} MPa<extra></extra>',
  }), [mixes])

  const scoreDistribution = useMemo(() => ({
    x: mixes.map((mix) => Number(mix.Optimization_Score ?? mix.optimization_score ?? 0)),
    type: 'histogram',
    marker: { color: '#38bdf8' },
    nbinsx: 8,
  }), [mixes])

  const topTenMixes = useMemo(() => ({
    x: mixes.slice(0, 10).map((_, index) => `Mix ${index + 1}`),
    y: mixes.slice(0, 10).map((mix) => Number(mix.Optimization_Score ?? mix.optimization_score ?? 0)),
    type: 'bar',
    marker: { color: ['#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#f472b6', '#fb7185', '#f59e0b', '#34d399', '#2dd4bf'] },
  }), [mixes])

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
              AI Mix Optimization
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">AI Mix Optimization</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Discover optimized concrete mixes that balance strength, cost, and sustainability.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-300">
            <p className="font-medium text-white">Optimization engine</p>
            <p className="mt-1">Visualizing the backend’s optimized mix recommendations.</p>
          </div>
        </div>

        {!data ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-200">
              <AlertCircle size={22} />
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white">No optimization available.</h2>
            <p className="mt-3 text-base leading-7 text-slate-300">Predict a concrete mix first to view optimized recommendations.</p>
            <button onClick={() => navigate('/predict')} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-medium text-white transition hover:scale-[1.01]">
              Predict a Mix
              <Sparkles size={16} />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <MetricCard title="Best Optimization Score" value={<CountUp end={summary.bestScore} duration={1.2} suffix="%" />} caption="Highest balance score" icon={Gauge} />
              <MetricCard title="Average Strength" value={<CountUp end={summary.avgStrength} duration={1.2} decimals={2} suffix=" MPa" />} caption="Mean compressive performance" icon={TrendingUp} />
              <MetricCard title="Average Material Cost" value={<CountUp end={summary.avgCost} duration={1.2} decimals={2} prefix="₹" />} caption="Mean cost per mix" icon={Zap} />
              <MetricCard title="Average Carbon Emission" value={<CountUp end={summary.avgCarbon} duration={1.2} decimals={2} suffix=" kgCO₂" />} caption="Mean sustainability impact" icon={Waves} />
              <MetricCard title="Best Sustainability Rating" value={<CountUp end={summary.bestSustainability} duration={1.2} decimals={2} suffix="/5" />} caption="Top environmental score" icon={Sparkles} />
            </div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Top Optimized Mixes</h2>
                  <p className="text-sm text-slate-400">Premium cards for the most promising concrete portfolios.</p>
                </div>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                {mixes.slice(0, 6).map((mix, index) => (
                  <MixCard key={mix?.id || index} mix={mix} index={index} />
                ))}
              </div>
            </motion.div>

            <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-xl">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white">Before vs After Comparison</h2>
                  <p className="text-sm text-slate-400">A clear view of the upgrade from baseline to optimized mix.</p>
                </div>
                <div className="grid gap-4">
                  <ComparisonCard label="Strength" original={`${Number(data?.predicted_strength ?? 0).toFixed(2)} MPa`} optimized={`${Math.max(Number(data?.predicted_strength ?? 0), Number((mixes[0]?.Strength ?? 0))).toFixed(2)} MPa`} suffix=" MPa" />
                  <ComparisonCard label="Cost" original={`₹${Number(data?.material_cost ?? 0).toFixed(2)}`} optimized={`₹${Number((mixes[0]?.Material_Cost_INR ?? 0)).toFixed(2)}`} suffix="" />
                  <ComparisonCard label="Carbon" original={`${Number(data?.carbon_emission ?? 0).toFixed(2)} kgCO₂`} optimized={`${Number((mixes[0]?.Carbon_Emission_kgCO2 ?? 0)).toFixed(2)} kgCO₂`} suffix="" />
                  <ComparisonCard label="Optimization" original={`${Number(data?.optimization_score ?? 0).toFixed(2)}%`} optimized={`${Number((mixes[0]?.Optimization_Score ?? 0)).toFixed(2)}%`} suffix="" />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-xl">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white">Interactive Charts</h2>
                  <p className="text-sm text-slate-400">Plotly-powered views of performance trade-offs.</p>
                </div>
                <div className="space-y-4">
                  <div className="h-[220px] rounded-[1.25rem] border border-white/10 bg-slate-900/70 p-3">
                    <Plot data={[strengthCost]} layout={{ paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', margin: { l: 40, r: 20, t: 20, b: 40 }, font: { color: '#f8fafc' }, xaxis: { color: '#cbd5e1' }, yaxis: { color: '#cbd5e1' } }} config={{ responsive: true, displayModeBar: false }} useResizeHandler style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className="h-[220px] rounded-[1.25rem] border border-white/10 bg-slate-900/70 p-3">
                    <Plot data={[strengthCarbon]} layout={{ paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', margin: { l: 40, r: 20, t: 20, b: 40 }, font: { color: '#f8fafc' }, xaxis: { color: '#cbd5e1' }, yaxis: { color: '#cbd5e1' } }} config={{ responsive: true, displayModeBar: false }} useResizeHandler style={{ width: '100%', height: '100%' }} />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-xl">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white">AI Recommendations</h2>
                  <p className="text-sm text-slate-400">Engineering guidance derived from optimized mix patterns.</p>
                </div>
                <ul className="space-y-3 text-sm leading-7 text-slate-300">
                  {Array.isArray(data?.recommendations) && data.recommendations.length > 0 ? data.recommendations.map((recommendation) => (
                    <li key={recommendation}>• {recommendation}</li>
                  )) : (
                    <li>• Review the latest optimized mix results to refine the design.</li>
                  )}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-xl">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white">Sustainability Badges</h2>
                  <p className="text-sm text-slate-400">Highlights for the strongest mix characteristics.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {badges.map((badge) => (
                    <BadgeChip key={badge} label={badge} />
                  ))}
                </div>
                <div className="mt-6 h-[220px] rounded-[1.25rem] border border-white/10 bg-slate-900/70 p-3">
                  <Plot data={[scoreDistribution, topTenMixes]} layout={{ barmode: 'group', paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', margin: { l: 40, r: 20, t: 20, b: 40 }, font: { color: '#f8fafc' }, xaxis: { color: '#cbd5e1' }, yaxis: { color: '#cbd5e1' } }} config={{ responsive: true, displayModeBar: false }} useResizeHandler style={{ width: '100%', height: '100%' }} />
                </div>
              </motion.div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => navigate('/explainability')} className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-white">
                Back to Explainability
              </button>
              <button onClick={() => { setPrediction(null); navigate('/predict') }} className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20">
                Predict Another Mix
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default OptimizationPage
