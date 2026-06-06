import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, BarChart3, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] pt-32 pb-20 lg:pt-40 lg:pb-32 flex items-center bg-brand-muted overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-brand-accent/5 rounded-full blur-[10rem] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Block: Content */}
          <div className="lg:col-span-6 relative z-10 text-left">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-primary text-xs font-semibold tracking-wide mb-6">
                The Future of Corporate Banking
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-medium text-brand-primary leading-[1.1] tracking-tight mb-6">
                Banking Built Around <span className="text-brand-accent font-black">Your Future</span>
              </h1>
              <p className="text-base sm:text-lg text-[#0369a1]/80 leading-relaxed mb-10 max-w-xl font-medium">
                Manage high-volume operational liquidity, grow reserves securely, and drive corporate wealth transformation through one powerful terminal workstation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-12">
                <button className="px-8 py-4 rounded-full bg-brand-accent text-white font-bold hover:bg-brand-accent/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl hover:shadow-brand-accent/20 flex items-center justify-center gap-2 group cursor-pointer text-sm">
                  Open Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-full bg-white text-[#0369a1] border border-brand-secondary hover:bg-brand-muted transition-all flex items-center justify-center font-bold shadow-sm text-sm cursor-pointer">
                  Explore Services
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-brand-secondary/40">
                {[
                  { icon: ShieldCheck, text: "Secure Vaulting" },
                  { icon: Zap, text: "Instant Settles" },
                  { icon: BarChart3, text: "Yield Analytics" },
                  { icon: Clock, text: "Dedicated Desk" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#0369a1]">
                    <item.icon size={18} className="text-brand-accent shrink-0 animate-pulse" />
                    <span className="text-xs sm:text-sm font-bold tracking-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Block: Crisp Clean Hero Image */}
          <div className="lg:col-span-6 relative flex justify-center items-center z-10 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
              className="w-full h-[320px] sm:h-[460px] lg:h-[520px] rounded-[3rem] overflow-hidden border border-brand-secondary/60 shadow-[0_25px_60px_-15px_rgba(2,132,199,0.12)] relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2000&auto=format&fit=crop" 
                alt="Premium Bank HQ Architecture" 
                className="w-full h-full object-cover select-none"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
