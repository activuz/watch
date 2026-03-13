import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ShoppingCart, Sun, Moon, Menu, X, Heart } from 'lucide-react';
import { useApp, Language } from '../../context/AppContext';
import { translations } from '../../data/translations';

export function Header() {
  const { theme, toggleTheme, language, setLanguage, cartCount } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const t = translations[language];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t.home },
    { to: '/shop', label: t.shop },
    { to: '/about', label: t.about },
    { to: '/contact', label: t.contact },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg border-b border-[#c9a84c]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border border-[#c9a84c] flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
              <div className="w-3 h-3 bg-[#c9a84c]" />
            </div>
            <span
              className="text-xl tracking-[0.25em] uppercase text-gray-900 dark:text-white"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
            >
              Soat <span className="text-[#c9a84c]">Do'kon</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm tracking-[0.15em] uppercase transition-all duration-300 relative group ${
                  isActive(link.to)
                    ? 'text-[#c9a84c]'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#c9a84c] dark:hover:text-[#c9a84c]'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-[#c9a84c] transition-all duration-300 ${
                  isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center gap-1">
              {(['en', 'ru', 'uz'] as Language[]).map((lang, i) => (
                <React.Fragment key={lang}>
                  {i > 0 && <span className="text-gray-400 dark:text-gray-600 text-xs">|</span>}
                  <button
                    onClick={() => setLanguage(lang)}
                    className={`text-xs tracking-widest uppercase transition-colors duration-200 px-1 ${
                      language === lang
                        ? 'text-[#c9a84c] font-medium'
                        : 'text-gray-500 dark:text-gray-400 hover:text-[#c9a84c] dark:hover:text-[#c9a84c]'
                    }`}
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {lang.toUpperCase()}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#c9a84c] hover:text-[#c9a84c] dark:hover:text-[#c9a84c] transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#c9a84c] hover:text-[#c9a84c] dark:hover:text-[#c9a84c] transition-all duration-300"
            >
              <ShoppingCart size={15} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c9a84c] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-gray-700 dark:text-gray-300"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0a0a0a] border-t border-[#c9a84c]/20">
          <div className="px-6 py-6 space-y-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block text-sm tracking-[0.15em] uppercase ${
                  isActive(link.to)
                    ? 'text-[#c9a84c]'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
              {(['en', 'ru', 'uz'] as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-xs tracking-widest uppercase px-2 py-1 border ${
                    language === lang
                      ? 'border-[#c9a84c] text-[#c9a84c]'
                      : 'border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
