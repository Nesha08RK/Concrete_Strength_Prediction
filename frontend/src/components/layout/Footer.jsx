function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/60 px-4 py-10 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-white">Project</p>
          <p className="mt-3 text-sm text-slate-400">SmartCrete AI</p>
          <p className="mt-2 text-sm text-slate-400">Explainable Multi-Objective Concrete Mix Optimization</p>
        </div>
       
        <div>
          <p className="text-lg font-semibold text-white">Powered By</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-300">
            {['React', 'XGBoost', 'SHAP', 'Flask', 'Tailwind CSS'].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/10 px-3 py-1">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
