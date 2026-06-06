import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Landmark } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import TopBanner from './TopBanner';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Return null if on private dashboard workstation
  if (location.pathname === '/dashboard') {
    return null;
  }

  const navLinks = [
    { label: 'Personal', href: '/personal' },
    { label: 'Business', href: '/business' },
    { label: 'Loans', href: '/loans' },
    { label: 'Investments', href: '/investments' },
    { label: 'Resources', href: '/resources' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Fraud Warning & Trust Banner */}
      <TopBanner />

      {/* Main Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 border-b border-brand-secondary backdrop-blur-md shadow-sm py-3'
            : 'bg-brand-muted/70 backdrop-blur-sm border-b border-brand-secondary/30 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 border border-brand-secondary">
                <Landmark size={22} className="text-white" />
              </div>
              <span className="font-display font-medium text-xl tracking-tight text-brand-primary">
                Nova<span className="text-brand-accent font-black">Finance</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-semibold transition-colors relative group text-[#0369a1] hover:text-brand-accent"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-sm font-semibold transition-colors text-brand-primary hover:text-brand-accent"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="px-5 py-2.5 rounded-full bg-brand-accent text-white text-sm font-bold hover:bg-brand-accent/90 transition-all shadow-md cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-semibold transition-colors text-brand-primary hover:text-brand-accent"
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    className="px-5 py-2.5 rounded-full bg-brand-accent text-white text-sm font-bold hover:bg-brand-accent/90 transition-all shadow-md cursor-pointer"
                  >
                    Open Account
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-brand-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-brand-secondary overflow-hidden mt-3"
            >
              <div className="px-4 pt-4 pb-6 space-y-4 shadow-xl">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block px-3 py-2 text-base font-bold text-brand-primary hover:text-brand-accent hover:bg-brand-muted rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 flex flex-col gap-3 border-t border-brand-secondary">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="px-3 py-2 text-base font-medium text-brand-primary text-center hover:text-brand-accent hover:bg-brand-muted rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full py-3 rounded-full bg-brand-accent text-white text-center text-base font-bold hover:bg-brand-accent/95 cursor-pointer transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="px-3 py-2 text-base font-medium text-brand-primary text-center hover:text-brand-accent hover:bg-brand-muted rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/login"
                        className="w-full py-3 rounded-full bg-brand-accent text-white text-center text-base font-bold hover:bg-brand-accent/95 cursor-pointer transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Open Account
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
