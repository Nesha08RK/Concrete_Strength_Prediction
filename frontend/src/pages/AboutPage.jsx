import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Target, BrainCircuit, Leaf, BarChart3, ArrowRight } from "lucide-react";
import AboutIllustration from "../components/AboutIllustration";

const capabilities = [
  { icon: BrainCircuit, title: "Strength Prediction", description: "Predict concrete compressive strength instantly using AI-powered machine learning." },
  { icon: Sparkles, title: "Explainable AI", description: "Understand every prediction with SHAP-based feature explanations." },
  { icon: Leaf, title: "Sustainability Analysis", description: "Estimate material cost and carbon emissions for greener construction." },
  { icon: BarChart3, title: "Mix Optimization", description: "Discover optimized concrete mixes balancing strength, cost, and sustainability." },
];

const workflow = ["Input Concrete Mix", "AI Prediction", "Explainability", "Optimization", "Final Recommendation"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14 space-y-16">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/60 p-10 backdrop-blur-xl"
      >
        {/* ambient glow, matches HeroSection */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.2),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.15),transparent_30%)]" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm text-cyan-300">
              <Sparkles size={16} />
              About SmartCrete AI
            </span>
            <h1 className="mt-6 text-4xl font-bold text-white">Smarter Concrete Design with Artificial Intelligence</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              SmartCrete AI is an intelligent platform that helps engineers design stronger, smarter, and more sustainable concrete mixes. By combining machine learning, explainable AI, and optimization, it enables faster and more informed decision-making throughout the concrete mix design process.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative rounded-[1.6rem] border border-white/10 bg-slate-950/70 p-6"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-emerald-500/15 blur-3xl" />
            <AboutIllustration
              className="relative w-full"
              style={{
                "--primary": "#2563eb",
                "--accent": "#22d3ee",
                "--dark": "#0f172a",
              }}
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-10 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <Target className="text-emerald-400" />
          <h2 className="text-3xl font-semibold text-white">Our Mission</h2>
        </div>
        <p className="mt-6 text-slate-300 leading-8 text-lg">
          Our mission is to simplify concrete mix design using AI-driven intelligence, making sustainable construction more accessible. SmartCrete AI empowers engineers with accurate predictions, explainable insights, and optimized recommendations while reducing cost, time, and environmental impact.
        </p>
      </motion.section>

      <section>
        <h2 className="mb-8 text-center text-3xl font-semibold text-white">Core Capabilities</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((item) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              key={item.title}
              className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl"
            >
              <item.icon className="text-cyan-400" size={34} />
              <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-10 backdrop-blur-xl"
      >
        <h2 className="text-3xl font-semibold text-white text-center">How SmartCrete AI Works</h2>
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {workflow.map((step, index) => (
            <div key={step} className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300 font-semibold">
                {index + 1}
              </div>
              <p className="font-medium text-white">{step}</p>
              {index !== workflow.length - 1 && <ArrowRight className="hidden lg:block text-slate-500" />}
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        className="rounded-[2rem] border border-cyan-500/20 bg-gradient-to-r from-blue-600/10 to-emerald-600/10 p-10 text-center backdrop-blur-xl"
      >
        <h2 className="text-3xl font-bold text-white">Ready to Build Better Concrete?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Experience AI-powered concrete mix prediction, explainability, sustainability analysis, and optimization in one intelligent platform.
        </p>
        <Link
          to="/predict"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 font-medium text-white transition hover:scale-105"
        >
          Start Prediction
          <ArrowRight size={18} />
        </Link>
      </motion.section>
    </div>
  );
}