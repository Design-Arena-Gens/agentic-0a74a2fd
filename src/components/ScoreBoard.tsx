'use client';

import { motion } from "framer-motion";

export function ScoreBoard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto mt-12 flex w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 px-6 py-5 backdrop-blur"
    >
      <div className="noise-overlay opacity-20" />
      <div className="relative flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-display text-xs uppercase tracking-[0.3em] text-slate-400">Match Feed</span>
          <p className="mt-1 font-display text-3xl text-white">Aurora City FC 3 &ndash; 1 Skyline United</p>
        </div>
        <div className="grid grid-cols-2 items-center gap-4 text-center font-display text-white">
          <ScorePill label="possession" home="62%" away="38%" />
          <ScorePill label="xG" home="2.9" away="1.1" />
          <ScorePill label="shots" home="16" away="9" />
          <ScorePill label="top speed" home="35.4 km/h" away="33.8 km/h" />
        </div>
      </div>
    </motion.div>
  );
}

function ScorePill({ label, home, away }: { label: string; home: string; away: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="text-xs uppercase tracking-wide text-slate-400">{label}</span>
      <div className="flex items-center justify-between font-semibold">
        <span className="text-glow">{home}</span>
        <span className="text-slate-300">{away}</span>
      </div>
    </div>
  );
}
