'use client';

import { motion } from "framer-motion";

const features = [
  {
    title: "Aurora Bowl",
    description: "A flowing bowl of 80,000 seats engineered for perfect sightlines and an enveloping sonic experience.",
    metric: "80K",
    tag: "capacity"
  },
  {
    title: "Immersive Halo",
    description: "Floating LED halo triggers choreographed light, data, and holographic overlays that respond to the match rhythm.",
    metric: "360°",
    tag: "experience"
  },
  {
    title: "Sustainable Core",
    description: "Solar skin, geo-thermal cooling, and rain-harvesting deliver a net-positive energy footprint.",
    metric: "+22%",
    tag: "energy yield"
  },
  {
    title: "Connected Plaza",
    description: "An interactive fan plaza with AR navigators, biometric access, and real-time broadcast hubs.",
    metric: "24/7",
    tag: "activation"
  }
];

export function FeatureGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {features.map((feature, index) => (
        <motion.article
          key={feature.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: index * 0.08, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6"
        >
          <span className="inline-flex items-center rounded-full border border-glow/60 bg-glow/10 px-3 py-1 text-xs uppercase tracking-widest text-glow/90">
            {feature.tag}
          </span>
          <h3 className="mt-4 font-display text-2xl font-semibold text-white">{feature.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{feature.description}</p>
          <div className="mt-6 flex items-baseline gap-2 font-display text-4xl text-glow">
            {feature.metric}
            <span className="text-xs uppercase text-slate-400">signature</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-glow/0 via-transparent to-slate-900/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </motion.article>
      ))}
    </div>
  );
}
