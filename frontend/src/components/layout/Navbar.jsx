import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

const links = [
  { label: 'Home', href: '#' },
  { label: 'Predict', href: '#predict' },
  { label: 'Explainability', href: '#explainability' },
  { label: 'Optimization', href: '#optimization' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'}`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 px-4 py-3 backdrop-blur-xl transition-all ${scrolled ? 'bg-slate-900/70 shadow-[0_0_60px_rgba(37,99,235,0.15)]' : 'bg-white/5'}`}>
        <a href="#" className="text-lg font-semibold tracking-[0.2em] text-white">
          SMARTCRETE<span className="ml-2 text-blue-400">AI</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-white/10 bg-white/10 p-2 text-slate-200 transition hover:bg-white/20"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="rounded-full border border-white/10 bg-white/10 p-2 text-slate-200 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-3 rounded-2xl border border-white/10 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-3 text-sm text-slate-200">
            {links.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 transition hover:bg-white/10">
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

export default Navbar
