import React from 'react';
import { Link } from 'react-router';
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

export function Footer() {
  const { language } = useApp();
  const t = translations[language];

  return (
    <footer className="bg-[#080808] text-gray-400 border-t border-[#c9a84c]/20">
      {/* Gold divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 border border-[#c9a84c] flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#c9a84c]" />
              </div>
              <span
                className="text-lg tracking-[0.25em] uppercase text-white"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
              >
                Chrono <span className="text-[#c9a84c]">Luxe</span>
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed text-gray-500 mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {t.footerDesc}
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-gray-700 flex items-center justify-center text-gray-500 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-white text-xs tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              {t.quickLinks}
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: t.home },
                { to: '/shop', label: t.shop },
                { to: '/about', label: t.about },
                { to: '/contact', label: t.contact },
                { to: '/cart', label: t.cart },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-[#c9a84c] transition-colors duration-300 flex items-center gap-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <span className="w-4 h-px bg-[#c9a84c] opacity-0 hover:opacity-100 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-white text-xs tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              {t.services}
            </h3>
            <ul className="space-y-3">
              {[t.watchService, t.authentication, t.valuation, t.consultation].map(service => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-sm text-gray-500 hover:text-[#c9a84c] transition-colors duration-300"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-white text-xs tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              {t.contact}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#c9a84c] mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  15 Rue de la Paix, Tashkent 100000, Uzbekistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#c9a84c] flex-shrink-0" />
                <a
                  href="tel:+998712345678"
                  className="text-sm text-gray-500 hover:text-[#c9a84c] transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  +998 71 234 56 78
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#c9a84c] flex-shrink-0" />
                <a
                  href="mailto:info@chronoluxe.uz"
                  className="text-sm text-gray-500 hover:text-[#c9a84c] transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  info@chronoluxe.uz
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-gray-600"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            © {new Date().getFullYear()} Chrono Luxe. {t.rights}
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-gray-600 hover:text-[#c9a84c] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {t.privacy}
            </a>
            <a
              href="#"
              className="text-xs text-gray-600 hover:text-[#c9a84c] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
