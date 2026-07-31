function AboutPreview() {
  return (
    <section id="about" className="rounded-[2rem] border border-white/10 bg-slate-900/40 px-6 py-16 backdrop-blur-xl sm:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">About</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">A professional AI product for sustainable concrete engineering</h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          SmartCrete AI combines data-driven prediction, explainability, cost awareness, and carbon-conscious optimization into a single premium experience tailored for researchers, civil engineers, and modern infrastructure teams.
        </p>
      </div>
    </section>
  )
}

export default AboutPreview
