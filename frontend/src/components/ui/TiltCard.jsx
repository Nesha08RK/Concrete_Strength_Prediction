import { motion } from 'framer-motion'

function TiltCard({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01, rotateX: 3, rotateY: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

export default TiltCard
