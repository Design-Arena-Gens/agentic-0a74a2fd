import { FeatureGrid } from "@/components/FeatureGrid";
import { ScoreBoard } from "@/components/ScoreBoard";
import { StadiumCanvas } from "@/components/StadiumCanvas";
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 sm:px-10">
      <div className="absolute inset-x-0 top-0 flex h-48 justify-center blur-3xl">
        <div className="h-full w-3/4 rounded-full bg-glow/40 opacity-40" />
      </div>
      <header className="relative flex flex-col gap-12">
        <nav className="flex items-center justify-between text-sm text-slate-300">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg text-glow">Aurora Stadium</span>
            <span className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-widest text-xs text-slate-400">
              concept
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#vision" className="transition hover:text-white">
              Vision
            </Link>
            <Link href="#features" className="transition hover:text-white">
              Features
            </Link>
            <Link href="#experience" className="transition hover:text-white">
              Experience
            </Link>
          </div>
        </nav>
        <div className="grid items-start gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="font-display text-sm uppercase tracking-[0.45em] text-slate-400">Future of Football</p>
            <h1 className="font-display text-5xl leading-tight text-white sm:text-6xl">
              A luminous cathedral where sport, sound, and skyline merge.
            </h1>
            <p className="text-lg leading-relaxed text-slate-300">
              Aurora Stadium is a next-generation football arena that choreographs atmosphere and analytics in real-time.
              Engineered for energy positivity and built for spectacle, every match radiates through an adaptive lighting
              halo, responsive seating bowl, and immersive fan journey.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#experience"
                className="rounded-full bg-glow px-6 py-3 font-display text-sm uppercase tracking-[0.35em] text-slate-950 transition hover:scale-105"
              >
                enter the stadium
              </Link>
              <span className="text-sm uppercase tracking-[0.4em] text-slate-400">Kickoff 2029</span>
            </div>
          </div>
          <div id="vision" className="rounded-3xl border border-white/10 bg-slate-950/40 p-6">
            <h2 className="font-display text-2xl text-white">Design Pillars</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
              <li>
                <strong className="text-white">Immersion:</strong> 360° halo syncs with match data to orchestrate light and
                atmospheric audio.
              </li>
              <li>
                <strong className="text-white">Performance:</strong> Aerodynamic shell anchors acoustics while keeping crowd
                energy on the pitch.
              </li>
              <li>
                <strong className="text-white">Sustainability:</strong> Renewable energy microgrid powers local districts
                beyond match day.
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section id="experience" className="relative">
        <StadiumCanvas />
      </section>

      <section id="features" className="relative space-y-10">
        <div className="flex flex-col gap-3">
          <p className="font-display text-sm uppercase tracking-[0.4em] text-slate-400">Experience Ecosystem</p>
          <h2 className="font-display text-4xl text-white">Crafted for peak matchday intensity</h2>
          <p className="max-w-3xl text-base leading-relaxed text-slate-300">
            From the kinetic arrival plaza to intelligent seating bands, the stadium is alive with responsive surfaces,
            ambient storytelling, and analytics woven into every guest touchpoint.
          </p>
        </div>
        <FeatureGrid />
      </section>

      <ScoreBoard />

      <footer className="relative mt-12 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.4em] text-slate-500">
        Crafted for the beautiful game &mdash; Aurora Design Collective
      </footer>
    </main>
  );
}
