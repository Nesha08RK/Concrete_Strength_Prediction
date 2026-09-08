import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(184,224,74,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.08),_transparent_30%),linear-gradient(135deg,_rgba(245,247,242,0.96),_rgba(238,241,234,1))] text-[#242329]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
