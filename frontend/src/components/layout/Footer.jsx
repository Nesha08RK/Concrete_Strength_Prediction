import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-24 border-t border-[#D8D1C6] bg-[#F8F5EF]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Top */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold tracking-wide text-[#242329]">
              SMARTCRETE <span className="text-fuchsia-400">AI</span>
            </h2>

            <p className="mt-2 max-w-md text-sm text-[#625D57]">
              Build stronger, smarter, and more sustainable concrete with the
              power of Artificial Intelligence.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-8 text-sm">
            <Link
              to="/"
              className="text-[#625D57] transition hover:text-fuchsia-600"
            >
              Home
            </Link>

            <Link
              to="/predict"
              className="text-[#625D57] transition hover:text-fuchsia-600"
            >
              Predict
            </Link>

            <Link
              to="/about"
              className="text-[#625D57] transition hover:text-fuchsia-600"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-[#625D57] transition hover:text-fuchsia-600"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#D8D1C6] to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-[#858078] md:flex-row">
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