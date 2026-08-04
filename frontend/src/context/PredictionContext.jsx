import { createContext, useContext, useMemo, useState } from 'react'

export const defaultForm = {
  cement: 540,
  blast_furnace_slag: 0,
  fly_ash: 0,
  water: 162,
  superplasticizer: 2.5,
  coarse_aggregate: 1040,
  fine_aggregate: 676,
  age: 28,
}

const PredictionContext = createContext(null)

export function PredictionProvider({ children }) {
  const [prediction, setPrediction] = useState(null)
  const [formData, setFormData] = useState(defaultForm)

  const value = useMemo(
    () => ({ prediction, setPrediction, formData, setFormData }),
    [prediction, formData],
  )

  return <PredictionContext.Provider value={value}>{children}</PredictionContext.Provider>
}

export function usePrediction() {
  const context = useContext(PredictionContext)
  if (!context) {
    throw new Error('usePrediction must be used within a PredictionProvider')
  }

  return context
}
