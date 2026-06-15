import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`relative flex min-h-screen items-center justify-center overflow-hidden pt-[64px] sm:pt-[72px] ${
      isDark ? 'bg-brand-navy' : 'bg-brand-light'
    }`}>

      {/* Background image — dark mode only */}
      {isDark && (
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center select-none"
          />
          <div className="absolute inset-0 bg-brand-navy/70" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-navy to-transparent" />
        </div>
      )}

      {/* Light mode background — subtle grid texture */}
      {!isDark && (
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(15,23,42,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.8) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-4 text-center sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center w-full"
        >

          {/* Headline */}
          <h1 className={`mb-3 text-3xl font-display font-semibold leading-[1.04] tracking-tight sm:mb-4 sm:text-4xl lg:text-[3.2rem] ${
            isDark ? 'text-white' : 'text-brand-primary'
          }`}>
            Save more.<br />
            Pay nothing.<br />
            <span className="text-brand-accent">Bank with confidence.</span>
          </h1>

          {/* Subhead */}
          <p className={`mb-5 max-w-md text-sm leading-relaxed font-light sm:mb-6 sm:text-[1rem] ${
            isDark ? 'text-white/50' : 'text-brand-secondary/70'
          }`}>
            Earn 5.25% APY on savings with zero monthly fees, zero minimums, and FDIC insurance up to $250,000.
          </p>

          {/* CTA */}
          <Link
            to="/login"
            className="mb-4 flex items-center gap-2 rounded-sm bg-brand-accent px-6 py-3 text-sm font-medium tracking-wide text-white transition-all hover:bg-brand-accent/90 active:scale-[0.98] group sm:mb-5 sm:px-7 sm:py-3.5"
          >
            Open an account
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Trust line */}
          <div className={`mb-5 flex items-center gap-2 text-xs sm:mb-6 ${
            isDark ? 'text-white/30' : 'text-brand-secondary/40'
          }`}>
            <ShieldCheck size={13} className="text-brand-accent shrink-0" />
            <span>FDIC insured · No credit check · Cancel anytime</span>
          </div>

          {/* Stat row */}
          <div className={`grid w-full grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:pt-6 ${
            isDark
              ? 'border-white/8 sm:divide-white/8'
              : 'border-brand-dark sm:divide-brand-dark'
          }`}>
            {[
              { val: '5.25%', label: 'HYSA APY' },
              { val: '$0',    label: 'Monthly fee' },
              { val: '$250K', label: 'FDIC insured' },
              { val: '1M+',   label: 'Customers' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 sm:px-8">
                <span className={`text-xl sm:text-2xl font-semibold tracking-tight ${
                  isDark ? 'text-white' : 'text-brand-primary'
                }`}>{s.val}</span>
                <span className={`text-[10px] uppercase tracking-[2px] ${
                  isDark ? 'text-white/30' : 'text-brand-secondary/40'
                }`}>{s.label}</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>

    </section>
  );
}