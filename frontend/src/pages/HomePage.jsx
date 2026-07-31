import { motion } from 'framer-motion'
import HeroSection from '../components/sections/HeroSection'
import FeatureSection from '../components/sections/FeatureSection'
import PredictSection from '../components/sections/PredictSection'
import PipelineSection from '../components/sections/PipelineSection'
import WhySection from '../components/sections/WhySection'
import StatsSection from '../components/sections/StatsSection'
import HighlightsSection from '../components/sections/HighlightsSection'
import AboutPreview from '../components/sections/AboutPreview'
import ContactCTA from '../components/sections/ContactCTA'

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-24 pb-20"
    >
      <HeroSection />
      <FeatureSection />
      <PredictSection />
      <PipelineSection />
      <WhySection />
      <StatsSection />
      <HighlightsSection />
      <AboutPreview />
      <ContactCTA />
    </motion.div>
  )
}

export default HomePage
