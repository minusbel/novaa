import { motion } from 'motion/react';
import Products from '../components/sections/Products';
import InterestRatePromos from '../components/sections/InterestRatePromos';
import SmartMoney from '../components/sections/SmartMoney';
import FinalCta from '../components/sections/FinalCta';

export default function Personal() {
  return (
    <div className="w-full relative">
      {/* Page Hero */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 flex items-center bg-brand-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2000&auto=format&fit=crop" 
            alt="Personal Banking" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/80 via-brand-primary/50 to-brand-primary/10"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white mb-6">
              Empowering Your <br/><span className="text-brand-accent">Personal Finances</span>
            </h1>
            <p className="text-lg lg:text-xl text-brand-light/80 leading-relaxed mb-10">
              Achieve your financial goals with personalized checking, high-yield savings, and intuitive money management tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reusing sections for content */}
      <Products />
      <InterestRatePromos />
      <SmartMoney />
      <FinalCta />
    </div>
  );
}
