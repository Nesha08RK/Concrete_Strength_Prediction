import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Top */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold tracking-wide text-white">
              SMARTCRETE <span className="text-blue-400">AI</span>
            </h2>

            <p className="mt-2 max-w-md text-sm text-slate-400">
              Build stronger, smarter, and more sustainable concrete with the
              power of Artificial Intelligence.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-8 text-sm">
            <Link
              to="/"
              className="text-slate-400 transition hover:text-cyan-400"
            >
              Home
            </Link>

            <Link
              to="/predict"
              className="text-slate-400 transition hover:text-cyan-400"
            >
              Predict
            </Link>

            <Link
              to="/about"
              className="text-slate-400 transition hover:text-cyan-400"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-slate-400 transition hover:text-cyan-400"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-500 md:flex-row">
          <p>© 2026 SmartCrete AI. All Rights Reserved.</p>

          <p>
            Designed for Sustainable Concrete Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;