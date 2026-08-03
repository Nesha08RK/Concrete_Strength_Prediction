import { createContext, useEffect, useMemo, useState } from 'react'

const defaultTheme = 'dark'
const ThemeContext = createContext({ theme: defaultTheme, toggleTheme: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext
