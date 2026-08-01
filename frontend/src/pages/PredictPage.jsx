import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { AlertCircle, ArrowRight, BrainCircuit, LoaderCircle, Sparkles, TrendingUp, Waves, Zap } from 'lucide-react'
import { predictConcrete } from '../services/api'
import PredictionWorkspace from '../components/sections/PredictSection'

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
  return <PredictionWorkspace />
}

export default PredictPage
