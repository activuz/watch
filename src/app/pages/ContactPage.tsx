import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook, Youtube, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export function ContactPage() {
  const { language } = useApp();
  const t = translations[language];
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="bg-gray-50 dark:bg-[#0d0d0d] border-b border-gray-100 dark:border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
              Reach Out
            </span>
          </div>
          <h1
            className="text-gray-900 dark:text-white mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {t.contactTitle}
          </h1>
          <p
            className="text-gray-500 dark:text-gray-400"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.9rem' }}
          >
            {t.contactSubtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-10">
            <div>
              <h3
                className="text-gray-900 dark:text-white mb-5"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.4rem' }}
              >
                {t.visitUs}
              </h3>
              <div className="flex gap-3">
                <MapPin size={16} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                <p
                  className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
                >
                  15 Rue de la Paix<br />
                  Tashkent 100000<br />
                  Uzbekistan
                </p>
              </div>
              <p
                className="text-xs text-gray-400 mt-3 ml-7"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Mon–Sat: 10:00 AM – 8:00 PM<br />
                Sunday: 12:00 PM – 6:00 PM
              </p>
            </div>

            <div>
              <h3
                className="text-gray-900 dark:text-white mb-5"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.4rem' }}
              >
                {t.callUs}
              </h3>
              <div className="flex gap-3">
                <Phone size={16} className="text-[#c9a84c] flex-shrink-0" />
                <a
                  href="tel:+998712345678"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#c9a84c] dark:hover:text-[#c9a84c] text-sm transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
                >
                  +998 71 234 56 78
                </a>
              </div>
            </div>

            <div>
              <h3
                className="text-gray-900 dark:text-white mb-5"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.4rem' }}
              >
                {t.emailUs}
              </h3>
              <div className="flex gap-3">
                <Mail size={16} className="text-[#c9a84c] flex-shrink-0" />
                <a
                  href="mailto:info@chronoluxe.uz"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#c9a84c] dark:hover:text-[#c9a84c] text-sm transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
                >
                  info@chronoluxe.uz
                </a>
              </div>
            </div>

            <div>
              <h3
                className="text-gray-900 dark:text-white mb-4"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.4rem' }}
              >
                {t.followUs}
              </h3>
              <div className="flex gap-3">
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form + Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Map placeholder */}
            <div className="relative h-64 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <iframe
                  title="Store Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=69.2%2C41.29%2C69.34%2C41.33&amp;layer=mapnik"
                  className="w-full h-full border-0 opacity-80 dark:opacity-50"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 pointer-events-none border border-[#c9a84c]/20" />
            </div>

            {/* Contact Form */}
            <div>
              <h3
                className="text-gray-900 dark:text-white mb-6"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.5rem' }}
              >
                {t.contactForm}
              </h3>

              {sent ? (
                <div className="flex items-center gap-4 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <div className="w-10 h-10 bg-[#c9a84c] flex items-center justify-center flex-shrink-0">
                    <Check size={18} className="text-black" />
                  </div>
                  <div>
                    <div
                      className="text-gray-900 dark:text-white text-sm mb-1"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                    >
                      {t.messageSent}
                    </div>
                    <div
                      className="text-gray-500 text-xs"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      We will respond within 24 hours.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { label: t.name, name: 'name', type: 'text' },
                      { label: t.email, name: 'email', type: 'email' },
                    ].map(field => (
                      <div key={field.name}>
                        <label
                          className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5"
                          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={(form as any)[field.name]}
                          onChange={handleChange}
                          required
                          className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label
                      className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                    >
                      {t.subject}
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <option value="">Select a subject</option>
                      <option value="purchase">Purchase Inquiry</option>
                      <option value="service">Watch Service & Repair</option>
                      <option value="authentication">Authentication</option>
                      <option value="valuation">Valuation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                    >
                      {t.message}
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors resize-none"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#c9a84c] hover:bg-[#b8943f] text-black px-10 py-4 transition-colors duration-300"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.8rem' }}
                  >
                    {t.sendMessage}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
