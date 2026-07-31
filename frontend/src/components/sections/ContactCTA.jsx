function ContactCTA() {
  return (
    <section id="contact" className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-blue-600/20 via-slate-900/70 to-emerald-500/20 px-6 py-16 text-center shadow-[0_0_80px_rgba(37,99,235,0.12)] backdrop-blur-xl sm:px-10">
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">Ready to build sustainable concrete?</h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">Start the journey with an explainable and premium AI experience designed for the next generation of engineering products.</p>
      <div className="mt-8 flex justify-center">
        <a href="#home" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]">
          Start Prediction
        </a>
      </div>
    </section>
  )
}

export default ContactCTA
