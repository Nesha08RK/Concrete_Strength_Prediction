import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Predict', href: '/predict' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

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
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#E1E5DC] px-4 py-3 backdrop-blur-xl transition-all ${scrolled ? 'bg-white/90 shadow-lg' : 'bg-white/70'}`}>
        <Link to="/" className="text-lg font-semibold tracking-[0.2em] text-[#202124]">
          SMARTCRETE<span className="ml-2 text-[#8B5CF6]">AI</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[#6B6F68] md:flex">
          {links.map((link) => {
            const active = location.pathname === link.href
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`transition ${active ? 'font-semibold text-[#8B5CF6]' : 'hover:text-[#8B5CF6]'}`}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="rounded-full border border-[#E1E5DC] bg-white p-2 text-[#202124] md:hidden"
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
          className="mx-4 mt-3 rounded-2xl border border-[#E1E5DC] bg-white/95 p-4 shadow-lg backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-3 text-sm text-[#625D57]">
            {links.map((link) => {
              const active = location.pathname === link.href
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2 transition ${active ? 'bg-violet-500/10 text-violet-700' : 'hover:bg-violet-500/10'}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

export default Navbar
