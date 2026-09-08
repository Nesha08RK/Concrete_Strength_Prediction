import { motion } from 'framer-motion'

const floatingCards = [
  { key: 'strength', label: 'Strength', value: '42 MPa', x: 210, y: 90, color: '#2563EB', glow: '#60A5FA' },
  { key: 'cost', label: 'Cost', value: '$420', x: 520, y: 50, color: '#10B981', glow: '#34D399' },
  { key: 'carbon', label: 'Carbon', value: '0.48 t', x: 830, y: 110, color: '#22D3EE', glow: '#67E8F9' },
]

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 120 + (i * 57) % 960,
  y: 70 + (i * 71) % 420,
  r: 2 + (i % 4),
  delay: i * 0.35,
  duration: 4 + (i % 5),
  color: i % 3 === 0 ? '#22D3EE' : i % 3 === 1 ? '#10B981' : '#2563EB',
}))

const leaves = [
  { x: 120, y: 510, rot: -18, scale: 1 },
  { x: 180, y: 545, rot: 20, scale: 0.9 },
  { x: 990, y: 520, rot: -12, scale: 1.1 },
  { x: 1038, y: 550, rot: 16, scale: 0.85 },
  { x: 270, y: 585, rot: -8, scale: 1.05 },
]

const birds = [
  { x: 250, y: 130, delay: 0 },
  { x: 720, y: 150, delay: 1 },
  { x: 960, y: 110, delay: 2.2 },
]

function MetricCard({ x, y, label, value, color, glow }) {
  return (
    <motion.g
      x={x}
      y={y}
      animate={{ y: [0, -8, 0], rotate: [-0.5, 0.5, -0.5] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: x / 600 }}
    >
      <rect x={x} y={y} width="128" height="68" rx="18" fill="rgba(15, 23, 42, 0.58)" stroke="rgba(148, 163, 184, 0.5)" />
      <rect x={x + 8} y={y + 8} width="112" height="52" rx="14" fill="rgba(255,255,255,0.04)" />
      <circle cx={x + 20} cy={y + 20} r="8" fill={glow} opacity="0.9" />
      <text x={x + 34} y={y + 25} fill="#E2E8F0" fontSize="12" fontWeight="700" fontFamily="sans-serif">{label}</text>
      <text x={x + 16} y={y + 46} fill={color} fontSize="18" fontWeight="800" fontFamily="sans-serif">{value}</text>
    </motion.g>
  )
}

const floatCards = floatingCards.map((card) => (
  <MetricCard
    key={card.key}
    x={card.x}
    y={card.y}
    label={card.label}
    value={card.value}
    color={card.color}
    glow={card.glow}
  />
))

function AboutIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 1200 760"
      className={className}
      role="img"
      aria-label="Friendly construction and AI-driven concrete optimization scene"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="primaryGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="65%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="softBlue" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#BFDBFE" />
          <stop offset="100%" stopColor="#DBEAFE" />
        </linearGradient>
        <linearGradient id="buildingGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="bgGlowBlue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bgGlowCyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bgGlowGreen" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#0F172A" floodOpacity="0.18" />
        </filter>
      </defs>

      <motion.g initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
        <motion.circle cx="230" cy="180" r="180" fill="url(#bgGlowBlue)" animate={{ opacity: [0.55, 0.9, 0.55] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle cx="930" cy="170" r="220" fill="url(#bgGlowCyan)" animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} />
        <motion.circle cx="620" cy="610" r="240" fill="url(#bgGlowGreen)" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }} />

        <g>
          {birds.map((bird, index) => (
            <motion.g
              key={index}
              animate={{ x: [0, 26, 0], y: [0, -6, 0] }}
              transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut', delay: bird.delay }}
            >
              <path d={`M${bird.x} ${bird.y} q10 -10 20 0 q-10 4 -20 0`} fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            </motion.g>
          ))}
        </g>

        <g opacity="0.8">
          <motion.g animate={{ x: [0, 8, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}>
            <ellipse cx="190" cy="150" rx="52" ry="16" fill="#FFFFFF" opacity="0.6" />
            <ellipse cx="235" cy="140" rx="44" ry="14" fill="#FFFFFF" opacity="0.5" />
          </motion.g>
          <motion.g animate={{ x: [0, -10, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}>
            <ellipse cx="860" cy="120" rx="58" ry="18" fill="#FFFFFF" opacity="0.55" />
            <ellipse cx="910" cy="112" rx="42" ry="15" fill="#FFFFFF" opacity="0.42" />
          </motion.g>
        </g>

        {floatCards}

        <g transform="translate(300,180)" filter="url(#softShadow)">
          <rect x="0" y="0" width="260" height="260" rx="22" fill="#E2E8F0" opacity="0.25" />
          <rect x="20" y="30" width="220" height="170" rx="14" fill="#F8FAFC" opacity="0.8" />
          <rect x="40" y="52" width="180" height="22" rx="6" fill="#E2E8F0" />
          <rect x="40" y="86" width="150" height="16" rx="5" fill="#E2E8F0" />
          <rect x="40" y="112" width="170" height="16" rx="5" fill="#DBEAFE" />
          <rect x="40" y="138" width="130" height="16" rx="5" fill="#E2E8F0" />
          <rect x="46" y="165" width="76" height="20" rx="10" fill="#10B981" opacity="0.15" />
          <rect x="132" y="165" width="58" height="20" rx="10" fill="#2563EB" opacity="0.12" />
          <rect x="52" y="204" width="120" height="12" rx="6" fill="#94A3B8" opacity="0.7" />
          <path d="M188 192 L220 144 L240 162 L214 206 Z" fill="#F59E0B" opacity="0.9" />
          <path d="M184 192 L214 206 L200 228 Z" fill="#FCD34D" opacity="0.8" />
        </g>

        <g transform="translate(150,430)" filter="url(#softShadow)">
          <path d="M12 80 L112 80 L132 120 L0 120 Z" fill="#D1D5DB" />
          <path d="M0 120 L132 120 L130 160 L2 160 Z" fill="#94A3B8" />
          <rect x="24" y="30" width="82" height="54" rx="8" fill="#E2E8F0" />
          <circle cx="36" cy="76" r="16" fill="#0F172A" />
          <circle cx="96" cy="76" r="16" fill="#0F172A" />
          <circle cx="36" cy="76" r="7" fill="#CBD5E1" />
          <circle cx="96" cy="76" r="7" fill="#CBD5E1" />
          <path d="M20 0 L88 0 L112 28 L0 28 Z" fill="#2563EB" />
          <path d="M20 0 L88 0 L110 12 L34 12 Z" fill="#93C5FD" opacity="0.9" />
          <rect x="22" y="18" width="64" height="12" rx="4" fill="#E0F2FE" />
        </g>

        <g transform="translate(138,494)" opacity="0.9">
          <rect x="0" y="72" width="110" height="24" rx="8" fill="#D1D5DB" />
          <rect x="14" y="20" width="82" height="62" rx="10" fill="#E5E7EB" />
          <rect x="32" y="8" width="42" height="18" rx="5" fill="#C7D2FE" />
          <rect x="30" y="36" width="44" height="18" rx="5" fill="#BFDBFE" />
          <rect x="42" y="58" width="20" height="18" rx="5" fill="#E0F2FE" />
        </g>

        <g transform="translate(820,420)" filter="url(#softShadow)">
          <rect x="0" y="72" width="120" height="20" rx="8" fill="#D1D5DB" />
          <rect x="18" y="22" width="84" height="60" rx="10" fill="#E5E7EB" />
          <rect x="26" y="32" width="68" height="14" rx="4" fill="#BFDBFE" />
          <rect x="26" y="54" width="52" height="12" rx="4" fill="#DBEAFE" />
          <path d="M38 20 C50 6, 72 6, 84 20" fill="none" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />
          <rect x="42" y="0" width="14" height="28" rx="7" fill="#10B981" />
        </g>

        <g transform="translate(780,260)" filter="url(#softShadow)">
          <path d="M0 180 L78 180 L110 210 L32 210 Z" fill="#7DD3FC" opacity="0.25" />
          <path d="M34 182 L74 182 L78 146 L30 146 Z" fill="#0F172A" opacity="0.12" />
          <rect x="92" y="100" width="8" height="110" rx="3" fill="#94A3B8" />
          <motion.g animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '94px 100px' }}>
            <rect x="58" y="102" width="80" height="8" rx="4" fill="#94A3B8" />
            <path d="M52 108 L76 108 L82 164 L44 164 Z" fill="#64748B" opacity="0.9" />
            <path d="M46 164 C62 178, 75 178, 88 164" fill="none" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          </motion.g>
        </g>

        <g transform="translate(420,350)" filter="url(#softShadow)">
          <motion.g animate={{ y: [0, -7, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
            <rect x="16" y="130" width="18" height="72" rx="8" fill="#0F172A" opacity="0.82" />
            <rect x="72" y="130" width="18" height="72" rx="8" fill="#0F172A" opacity="0.82" />
            <rect x="16" y="196" width="24" height="14" rx="6" fill="#F59E0B" />
            <rect x="66" y="196" width="24" height="14" rx="6" fill="#F59E0B" />
            <rect x="0" y="82" width="106" height="58" rx="20" fill="url(#primaryGrad)" opacity="0.92" />
            <path d="M44 82 L88 82 L104 112 L28 112 Z" fill="#E0F2FE" opacity="0.4" />
            <circle cx="54" cy="52" r="30" fill="#F3CBA8" />
            <path d="M22 56 C27 24, 80 24, 86 56 L90 62 L20 62 Z" fill="#F8FAFC" />
            <path d="M5 58 C18 38, 34 28, 54 28 C75 28, 90 38, 103 58" fill="none" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
            <circle cx="44" cy="54" r="3" fill="#0F172A" />
            <circle cx="64" cy="54" r="3" fill="#0F172A" />
            <path d="M44 66 Q54 73 65 66" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            <motion.g animate={{ rotate: [-11, -2, -11] }} transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '18px 92px' }}>
              <rect x="-28" y="92" width="46" height="54" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
              <line x1="-16" y1="108" x2="11" y2="108" stroke="#2563EB" strokeWidth="2.5" />
              <line x1="-16" y1="118" x2="11" y2="118" stroke="#2563EB" strokeWidth="2.5" />
              <line x1="-16" y1="128" x2="2" y2="128" stroke="#2563EB" strokeWidth="2.5" />
            </motion.g>
          </motion.g>
        </g>

        <g transform="translate(530,456)" filter="url(#softShadow)">
          <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}>
            <rect x="0" y="0" width="74" height="54" rx="12" fill="#DDE7F6" />
            <rect x="10" y="14" width="46" height="10" rx="4" fill="#2563EB" opacity="0.7" />
            <rect x="10" y="28" width="52" height="8" rx="4" fill="#22D3EE" opacity="0.8" />
            <rect x="10" y="40" width="34" height="8" rx="4" fill="#10B981" opacity="0.7" />
            <path d="M52 4 L68 4 L68 50 L52 50 Z" fill="#D1D5DB" />
            <path d="M52 0 L68 0 L68 4 L52 4 Z" fill="#94A3B8" />
            <path d="M54 12 L60 12 L60 42 L54 42 Z" fill="#E2E8F0" />
          </motion.g>
        </g>

        <g>
          {particles.map((p) => (
            <motion.circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill={p.color}
              animate={{ opacity: [0.15, 0.9, 0.15], y: [0, -18, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
            />
          ))}
        </g>

        <g>
          {leaves.map((leaf, index) => (
            <motion.g
              key={index}
              transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rot}) scale(${leaf.scale})`}
              animate={{ rotate: [leaf.rot, leaf.rot + 18, leaf.rot] }}
              transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
            >
              <path d="M0 0 C18 -18, 36 0, 0 30 C-16 18, -18 -6, 0 0 Z" fill="#10B981" />
              <path d="M0 0 L0 30" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round" />
            </motion.g>
          ))}
        </g>

        <g transform="translate(260,560)" opacity="0.96">
          <rect x="0" y="0" width="172" height="26" rx="13" fill="#E2E8F0" opacity="0.72" />
          <rect x="26" y="6" width="72" height="14" rx="7" fill="#10B981" opacity="0.7" />
          <rect x="108" y="6" width="46" height="14" rx="7" fill="#2563EB" opacity="0.75" />
        </g>

        <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}>
          <path d="M100 610 L168 610 L174 642 L94 642 Z" fill="#D1D5DB" />
          <rect x="108" y="552" width="58" height="60" rx="8" fill="#E5E7EB" />
          <rect x="118" y="562" width="38" height="12" rx="5" fill="#2563EB" opacity="0.72" />
        </motion.g>
      </motion.g>
    </svg>
  )
}

export default AboutIllustration
