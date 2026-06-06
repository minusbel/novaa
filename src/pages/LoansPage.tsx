import { motion } from 'motion/react';
import Loans from '../components/sections/Loans';
import FinancialTools from '../components/sections/FinancialTools';
import FinalCta from '../components/sections/FinalCta';

export default function LoansPage() {
  return (
    <div className="w-full relative">
      {/* Page Hero */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 flex items-center bg-brand-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop" 
            alt="Loans and Financing" 
            className="w-full h-full object-cover grayscale opacity-50"
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
              Financing For <br/><span className="text-brand-accent">Your Aspirations</span>
            </h1>
            <p className="text-lg lg:text-xl text-brand-light/80 leading-relaxed mb-10">
              Competitive rates and transparent terms for personal loans, mortgages, and business expansion.
            </p>
          </motion.div>
        </div>
      </section>

      <Loans />
      <FinancialTools />
      <FinalCta />
    </div>
  );
}
