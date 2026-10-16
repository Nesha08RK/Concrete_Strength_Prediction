import { useEffect } from 'react'
import { AlertCircle, X } from 'lucide-react'

const proportionFields = [
  { source: 'Cement', label: 'Cement', target: 'cement', unit: 'kg/m³' },
  { source: 'Blast Furnace Slag', label: 'Blast Furnace Slag', target: 'blast_furnace_slag', unit: 'kg/m³' },
  { source: 'Fly Ash', label: 'Fly Ash', target: 'fly_ash', unit: 'kg/m³' },
  { source: 'Water', label: 'Water', target: 'water', unit: 'kg/m³' },
  { source: 'Superplasticizer', label: 'Superplasticizer', target: 'superplasticizer', unit: 'kg/m³' },
  { source: 'Coarse Aggregate', label: 'Coarse Aggregate', target: 'coarse_aggregate', unit: 'kg/m³' },
  { source: 'Fine Aggregate', label: 'Fine Aggregate', target: 'fine_aggregate', unit: 'kg/m³' },
  { source: 'Age', label: 'Curing Age', target: 'age', unit: 'days' },
]

function numericValue(value) {
  if (value === null || value === undefined || typeof value === 'boolean') {
    return null
  }
  if (typeof value === 'string' && value.trim() === '') return null

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function displayValue(value, decimals = 2) {
  const parsed = numericValue(value)
  return parsed === null ? '—' : parsed.toFixed(decimals)
}

function RecommendationDetail({ mix, mixNumber, onClose, onUseMix }) {
  const missingFields = proportionFields.filter((field) => numericValue(mix?.[field.source]) === null)
  const mixIsValid = Boolean(mix && typeof mix === 'object' && !Array.isArray(mix))
  const proportionsAreEmpty = mixIsValid && missingFields.length === proportionFields.length
  const explanation = mix?.recommendation_explanation || mix?.explanation || mix?.recommendation

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="recommendation-title"
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[1.75rem] border border-white/10 bg-slate-50 p-5 shadow-2xl sm:rounded-[1.75rem] sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-cyan-700">Balanced mix recommendation</p>
            <h2 id="recommendation-title" className="mt-1 text-2xl font-semibold text-slate-900">
              Mix #{mixNumber} details
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Mix proportions and model estimates from this optimization result.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close recommendation details"
            className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:bg-white"
          >
            <X size={18} />
          </button>
        </div>

        {!mixIsValid ? (
          <div role="alert" className="mt-6 flex gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
            <AlertCircle size={19} className="shrink-0" />
            <p>The selected mix data is unavailable or has an invalid format. Close this view and select another mix.</p>
          </div>
        ) : (
          <>
            {proportionsAreEmpty ? (
              <div role="status" className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                <AlertCircle size={19} className="shrink-0" />
                <p>The selected optimization result contains no usable mix proportions. Close this view and select another mix.</p>
              </div>
            ) : missingFields.length > 0 && (
              <div role="alert" className="mt-6 flex gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
                <AlertCircle size={19} className="shrink-0" />
                <p>
                  Some mix proportions are missing or invalid ({missingFields.map((field) => field.label).join(', ')}).
                  The unavailable values are shown as em dashes; this mix cannot be loaded into the prediction form.
                </p>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-900">Concrete mix proportions</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {proportionFields.map((field) => {
                  const value = numericValue(mix[field.source])
                  return (
                    <div key={field.source} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                      <span className="text-sm text-slate-600">{field.label}</span>
                      <span className="text-right text-sm font-semibold text-slate-900">
                        {value === null ? '—' : `${value} ${field.unit}`}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-900">Performance estimates</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <PerformanceMetric label="Predicted compressive strength" value={displayValue(mix.Strength)} unit="MPa" />
                <PerformanceMetric label="Estimated material cost" value={displayValue(mix.Material_Cost_INR)} unit="₹/m³" />
                <PerformanceMetric label="Estimated carbon emissions" value={displayValue(mix.Carbon_Emission_kgCO2)} unit="kg CO₂/m³" />
                <PerformanceMetric label="Optimization score" value={displayValue(mix.Optimization_Score, 4)} />
                {numericValue(mix.sustainabilityRating ?? mix.Sustainability_Rating) !== null && (
                  <PerformanceMetric
                    label="Sustainability rating"
                    value={displayValue(mix.sustainabilityRating ?? mix.Sustainability_Rating)}
                    unit="/5"
                  />
                )}
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                Strength is model-predicted; material cost and carbon emissions are estimated. These are not experimental measurements.
              </p>
            </div>

            {explanation && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-slate-900">Recommendation explanation</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{explanation}</p>
              </div>
            )}
          </>
        )}

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Back to Optimization
          </button>
          <button
            type="button"
            disabled={!mixIsValid || missingFields.length > 0}
            onClick={() => onUseMix(proportionFields.reduce((values, field) => ({
              ...values,
              [field.target]: numericValue(mix[field.source]),
            }), {}))}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-medium text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Use This Mix
          </button>
        </div>
      </section>
    </div>
  )
}

function PerformanceMetric({ label, value, unit }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-600">{label}</p>
      <p className="mt-2 break-words text-lg font-semibold text-slate-900">
        {value}{unit ? ` ${unit}` : ''}
      </p>
    </div>
  )
}

export default RecommendationDetail
