import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import TiltCard from '../ui/TiltCard'
import HeroConstructionIllustration from '../HeroConstructionIllustration'
import './HeroSection.css'

function HeroSection() {
  return (
    <section id="home" className="hero-section relative overflow-hidden rounded-[2rem] border border-[#CEC6BA] bg-gradient-to-br from-[#E9E3DA] to-[#DCD4C8] px-6 py-16 shadow-[0_18px_50px_rgba(98,94,90,0.12)] backdrop-blur-xl sm:px-10 lg:px-14 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.12),transparent_30%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(98,94,90,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(98,94,90,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <div className="hero-label mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-3 py-1 text-sm text-[#4B4641]">
            <Sparkles size={15} />
            Explainable Multi-Objective Concrete Intelligence
          </div>
          <h1 className="hero-heading text-4xl font-bold leading-tight text-[#252329] sm:text-5xl lg:text-6xl">
            Build Stronger, Smarter &{' '}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
              Greener Concrete
            </span>{' '}with AI
          </h1>
          <p className="hero-body mt-6 max-w-xl text-lg leading-8 text-[#5F5A55]">
            Predict compressive strength, estimate material cost, evaluate carbon emissions, and receive sustainable mix recommendations through a premium explainable AI workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/predict" className="hero-button group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 font-medium text-white shadow-glow transition hover:scale-[1.02]">
              Predict Now
              <ArrowRight className="transition group-hover:translate-x-1" size={18} />
            </a>
            <a href="#about" className="hero-button rounded-full border border-[#CEC6BA] bg-[#F7F4EE]/70 px-6 py-3 font-medium text-[#252329] transition hover:bg-[#F7F4EE]">
              Learn More
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="relative">
          <TiltCard className="rounded-[2rem] border border-[#CEC6BA] bg-[#F7F4EE] p-4 shadow-[0_16px_36px_rgba(98,94,90,0.16)]">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[#CEC6BA] bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),transparent_40%)] p-4 sm:p-6">
              <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-3xl" />
              <div className="absolute bottom-6 left-6 h-24 w-24 rounded-full bg-orange-500/20 blur-3xl" />

              <div className="relative">
                <HeroConstructionIllustration
                  className="mx-auto w-full max-w-[520px]"
                  style={{
                    '--primary': '#7c3aed',
                    '--accent': '#ec4899',
                    '--ink': '#14112b',
                    '--muted': '#a1a1aa',
                  }}
                />
              </div>
            </div>
          </TiltCard>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="absolute -bottom-6 -left-6 hidden w-56 rounded-2xl border border-[#CEC6BA] bg-[#F7F4EE]/95 p-4 shadow-[0_12px_28px_rgba(98,94,90,0.16)] backdrop-blur-lg xl:block">
            <div className="hero-label mb-2 flex items-center gap-2 text-sm text-amber-600">
              <Sparkles size={16} />
              AI Assistant
            </div>
            <p className="hero-body text-sm leading-6 text-[#5F5A55]">
              Hi! I’m SmartCrete AI. I’ll help you design stronger and greener concrete.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
