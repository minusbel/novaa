import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import NovaaLogo from '../NovaaLogo';
import ThemeToggle from '../ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (location.pathname === '/dashboard') return null;

  // All pages that use a light navbar when theme is light
  // '/' is now included — hero is light in light mode, dark in dark mode
  const lightPages = ['/', '/personal', '/business', '/loans', '/investments', '/resources'];
  const isLightPage = lightPages.includes(location.pathname);

  // Determine navbar styling based on page and theme
  const shouldUseLightNavbar = isLightPage && theme === 'light' && !isScrolled;
  const textColorClass = shouldUseLightNavbar ? 'text-brand-primary' : 'text-white';
  const textMutedClass = shouldUseLightNavbar ? 'text-brand-primary/60' : 'text-white/50';
  const borderColorClass = shouldUseLightNavbar ? 'border-brand-dark/20' : 'border-white/8';
  const bgColorClass = isScrolled
    ? (isLightPage && theme === 'light' ? 'bg-brand-light/98' : 'bg-brand-primary/98')
    : 'bg-transparent';

  const navLinks = [
    { label: 'Home',        href: '/' },
    { label: 'Personal',    href: '/personal' },
    { label: 'Business',    href: '/business' },
    { label: 'Loans',       href: '/loans' },
    { label: 'Investments', href: '/investments' },
    { label: 'Resources',   href: '/resources' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      <div
        className={`transition-all duration-300 ${bgColorClass} backdrop-blur-md border-b ${borderColorClass} ${
          isScrolled ? 'py-3' : 'py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <NovaaLogo
                className={`text-xl ${shouldUseLightNavbar ? 'text-brand-primary' : 'text-white'}`}
                iconSize={28}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-4 py-2 text-sm font-normal tracking-wide transition-colors relative group ${
                    isActive(link.href)
                      ? textColorClass
                      : `${textMutedClass} hover:${textColorClass}`
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-brand-accent" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-1">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-4 py-2 text-sm ${textMutedClass} hover:${textColorClass} transition-colors font-normal tracking-wide`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className={`ml-2 px-5 py-2 rounded-sm ${
                      shouldUseLightNavbar
                        ? 'bg-brand-primary/8 border border-brand-primary/12 text-brand-primary hover:bg-brand-primary/14'
                        : 'bg-white/8 border border-white/12 text-white hover:bg-white/14'
                    } text-sm font-normal transition-all cursor-pointer tracking-wide`}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-4 py-2 text-sm ${textMutedClass} hover:${textColorClass} transition-colors font-normal tracking-wide`}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/login"
                    className="ml-2 px-5 py-2 rounded-sm bg-brand-accent text-white text-sm font-normal hover:bg-brand-accent/90 transition-all tracking-wide"
                  >
                    Open Account
                  </Link>
                </>
              )}
              <div className={`ml-2 pl-2 border-l ${
                shouldUseLightNavbar ? 'border-brand-dark/20' : 'border-white/10'
              } flex items-center`}>
                <ThemeToggle className={
                  shouldUseLightNavbar
                    ? 'text-brand-primary hover:bg-brand-primary/8'
                    : 'text-white hover:bg-white/10'
                } />
              </div>
            </div>

            {/* Mobile Toggle & Theme */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle className={
                shouldUseLightNavbar
                  ? 'text-brand-primary hover:bg-brand-primary/8'
                  : 'text-white hover:bg-white/10'
              } />
              <button
                className={`p-2 ${textMutedClass} hover:${textColorClass} transition-colors`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`md:hidden overflow-hidden border-t ${borderColorClass} mt-3 ${
                isLightPage && theme === 'light' ? 'bg-brand-light' : 'bg-brand-primary'
              }`}
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`flex items-center px-4 py-3 text-sm rounded-sm transition-colors border-l-2 ${
                      isActive(link.href)
                        ? `border-brand-accent ${shouldUseLightNavbar ? 'text-brand-primary bg-brand-primary/5' : 'text-white bg-white/6'}`
                        : `border-transparent ${shouldUseLightNavbar ? 'text-brand-primary/55 hover:text-brand-primary hover:bg-brand-primary/4' : 'text-white/55 hover:text-white hover:bg-white/4'}`
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}