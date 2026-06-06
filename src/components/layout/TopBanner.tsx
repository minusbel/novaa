import { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, TrendingUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WARNINGS_AND_PROMOS = [
  {
    type: 'fraud',
    icon: AlertTriangle,
    text: 'FRAUD ALERT: Nova Finance will NEVER ask for your password, PIN, or 2FA codes via phone call, SMS, or email.',
    color: 'text-amber-500',
  },
  {
    type: 'promo',
    icon: TrendingUp,
    text: 'NOW LIVE: Experience up to 5.25% APY on elite high-yield Savings Vaults. Standard terms apply.',
    color: 'text-emerald-500',
  },
  {
    type: 'security',
    icon: ShieldCheck,
    text: 'STAY SECURE: Set up advanced biometric authorization and instant push alerts inside your account workstation.',
    color: 'text-cyan-500',
  },
  {
    type: 'info',
    icon: Info,
    text: 'INSURED APY: All deposits are federally backed by FDIC insurance programs up to maximum legal limits.',
    color: 'text-blue-500',
  }
];

export default function TopBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % WARNINGS_AND_PROMOS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentItem = WARNINGS_AND_PROMOS[index];
  const IconComponent = currentItem.icon;

  return (
    <div className="w-full bg-brand-navy border-b border-white/5 text-white py-2 px-4 text-[11px] sm:text-xs font-sans relative z-50 flex items-center justify-between select-none">
      {/* Left Designator Badge */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 font-extrabold tracking-wider text-white bg-brand-accent/25 hover:bg-brand-accent/45 px-2 py-0.5 rounded text-[10px] select-none uppercase border border-brand-accent/20">
          <ShieldCheck size={12} className="text-brand-accent animate-pulse" />
          Member FDIC
        </span>
        <span className="hidden sm:inline-block text-brand-accent/70 font-semibold uppercase tracking-wider text-[9px]">
          Equal Housing Lender 🏠
        </span>
      </div>

      {/* Center Cycling Warnings & Promos */}
      <div className="flex-1 max-w-xl mx-auto px-4 overflow-hidden relative h-5 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex items-center justify-center gap-2 text-center"
          >
            <IconComponent size={14} className={`${currentItem.color} shrink-0`} />
            <span className="text-white/90 text-[10px] sm:text-xs font-mono font-medium tracking-wide truncate max-w-xs md:max-w-md lg:max-w-xl">
              {currentItem.text}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Designation Code */}
      <div className="hidden lg:flex items-center gap-2 text-white/50 font-mono text-[9px] font-bold">
        <span>EST: #4812-N</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
        <span className="text-brand-accent">SYSTEMS SECURE</span>
      </div>
    </div>
  );
}
