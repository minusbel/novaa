import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, BarChart3, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] pt-32 pb-20 lg:pt-40 lg:pb-32 flex items-center bg-brand-navy overflow-hidden">

      {/* Grid overlay — institutional, not decorative */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Single restrained glow — far right, not centred */}
      <div className="absolute right-0 top-1/3 w-[32rem] h-[32rem] bg-brand-accent/8 rounded-full blur-[8rem] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left — Content */}
          <div className="lg:col-span-6 relative z-10 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-block w-6 h-px bg-brand-accent" />
                <span className="text-brand-accent text-[10px] font-semibold tracking-[3px] uppercase">
                  Corporate Banking Platform
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-display font-semibold text-white leading-[1.08] tracking-tight mb-6">
                Banking built<br />for what comes<br />
                <span className="text-brand-accent">next.</span>
              </h1>

              <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-10 max-w-lg font-light">
                Manage operational liquidity, grow reserves securely, and access institutional-grade analytics — all through one platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <button className="px-8 py-4 rounded-sm bg-brand-accent text-white font-semibold hover:bg-brand-accent/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer text-sm tracking-wide">
                  Open an Account
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-sm bg-transparent text-white/70 border border-white/10 hover:border-white/25 hover:text-white transition-all flex items-center justify-center font-normal text-sm cursor-pointer tracking-wide">
                  Explore Services
                </button>
              </div>

              {/* Trust bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/8">
                {[
                  { icon: ShieldCheck, text: "Secure Vaulting" },
                  { icon: Zap, text: "Instant Settles" },
                  { icon: BarChart3, text: "Yield Analytics" },
                  { icon: Clock, text: "Dedicated Desk" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/40">
                    <item.icon size={15} className="text-brand-accent shrink-0" />
                    <span className="text-xs font-normal tracking-wide">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Hero card */}
          <div className="lg:col-span-6 relative flex justify-center items-center z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
              className="w-full"
            >
              {/* Rate card overlay — like the Ally redesign */}
              <div className="w-full rounded-xl overflow-hidden border border-white/8 bg-brand-secondary relative">

                {/* Top accent line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />

                {/* Image */}
                <div className="h-[260px] sm:h-[340px] overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2000&auto=format&fit=crop"
                    alt="Premium Bank Architecture"
                    className="w-full h-full object-cover select-none opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-brand-secondary/30 to-transparent" />
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 divide-x divide-white/8 border-t border-white/8">
                  {[
                    { val: "5.25%", label: "HYSA APY" },
                    { val: "$250K", label: "FDIC Insured" },
                    { val: "$0", label: "Monthly Fee" },
                  ].map((s) => (
                    <div key={s.label} className="px-5 py-5 flex flex-col gap-1">
                      <span className="font-display text-2xl font-semibold text-white tracking-tight">{s.val}</span>
                      <span className="text-[10px] text-white/35 uppercase tracking-widest">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}