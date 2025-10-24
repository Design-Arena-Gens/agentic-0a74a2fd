'use client';

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const StadiumScene = dynamic(
  () => import("./StadiumScene").then((mod) => mod.StadiumScene),
  { ssr: false, loading: () => <div className="h-full w-full animate-pulse rounded-3xl bg-slate-900/50" /> }
);

export function StadiumCanvas() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-[640px] w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 shadow-stadium"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-glow/20 via-transparent to-slate-900/70" />
      <Suspense fallback={<div className="h-full w-full animate-pulse bg-slate-900/50" />}>
        <StadiumScene />
      </Suspense>
      <div className="pointer-events-none absolute inset-0">
        <div className="noise-overlay opacity-40" />
      </div>
    </motion.section>
  );
}
