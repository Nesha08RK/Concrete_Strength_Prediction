import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { BrainCircuit, Blocks, FlaskConical, Microscope } from 'lucide-react'
import TiltCard from '../ui/TiltCard'

function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/40 px-6 py-16 shadow-[0_0_120px_rgba(37,99,235,0.12)] backdrop-blur-xl sm:px-10 lg:px-14 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.2),transparent_30%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-200">
            <Sparkles size={15} />
            Explainable Multi-Objective Concrete Intelligence
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Build Stronger, Smarter &{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Greener Concrete
            </span>{' '}with AI
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Predict compressive strength, estimate material cost, evaluate carbon emissions, and receive sustainable mix recommendations through a premium explainable AI workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/predict" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-medium text-white shadow-glow transition hover:scale-[1.02]">
              Predict Now
              <ArrowRight className="transition group-hover:translate-x-1" size={18} />
            </a>
            <a href="#about" className="rounded-full border border-white/15 bg-white/10 px-6 py-3 font-medium text-slate-200 transition hover:bg-white/20">
              Learn More
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="relative">
          <TiltCard className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-2xl">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.35),transparent_40%)] p-6">
              <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute bottom-6 left-6 h-24 w-24 rounded-full bg-emerald-500/20 blur-3xl" />

              <div className="relative grid gap-4">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                  <div>
                    <p className="text-sm text-slate-400">AI Engineering Core</p>
                    <p className="text-lg font-semibold text-white">Multi-objective blend generation</p>
                  </div>
                  <div className="rounded-2xl bg-blue-500/20 p-3 text-blue-300">
                    <BrainCircuit size={24} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                    <div className="flex items-center gap-2 text-amber-300"><Blocks size={18} /> <span className="text-sm">Concrete Blocks</span></div>
                    <div className="mt-4 flex gap-2">
                      {[1,2,3].map((item) => <div key={item} className="h-12 w-12 rounded-xl border border-white/10 bg-gradient-to-br from-slate-700 to-slate-900" />)}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                    <div className="flex items-center gap-2 text-emerald-300"><FlaskConical size={18} /> <span className="text-sm">Sustainability Lens</span></div>
                    <div className="mt-4 h-24 rounded-xl border border-dashed border-emerald-400/20 bg-emerald-500/10" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <div className="mb-3 flex items-center gap-2 text-cyan-300"><Microscope size={18} /> <span className="text-sm">Explainability Cascade</span></div>
                  <div className="flex items-center gap-2">
                    {["SHAP", "XGBoost", "Cost", "Carbon"].map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="absolute -bottom-6 -left-6 hidden w-56 rounded-2xl border border-white/10 bg-slate-950/85 p-4 shadow-2xl backdrop-blur-lg xl:block">
            <div className="mb-2 flex items-center gap-2 text-sm text-amber-300">
              <Sparkles size={16} />
              AI Assistant
            </div>
            <p className="text-sm leading-6 text-slate-300">
              Hi! I’m SmartCrete AI. I’ll help you design stronger and greener concrete.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
