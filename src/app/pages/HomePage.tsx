import React, { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ChevronRight, Star, Award, Shield, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { watches, brands } from '../data/watches';
import { WatchCard } from '../components/WatchCard';
import { motion } from 'motion/react';

const heroImage = 'https://images.unsplash.com/photo-1670404160620-a3a86428560e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMHN1Ym1hcmluZXIlMjBwcmVtaXVtJTIwd2F0Y2h8ZW58MXx8fHwxNzczMzgzMDA5fDA&ixlib=rb-4.1.0&q=80&w=1080';
const lifestyleImage = 'https://images.unsplash.com/photo-1770662368952-b624117e3775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaWZlc3R5bGUlMjBtYW4lMjB3ZWFyaW5nJTIwd2F0Y2h8ZW58MXx8fHwxNzczMzgzMDEzfDA&ixlib=rb-4.1.0&q=80&w=1080';
const storeImage = 'https://images.unsplash.com/photo-1764512680324-048f158cab2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRjaCUyMGJvdXRpcXVlJTIwc3RvcmUlMjBsdXh1cnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzMzODMwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080';

const reviewData = [
  { name: 'Alexander V.', role: 'Verified Buyer', text: 'An exceptional shopping experience. The Patek Philippe I purchased arrived in perfect condition, exactly as described. The authentication certificate was a wonderful touch of assurance.', rating: 5, avatar: 'A' },
  { name: 'Sofia M.', role: 'Collector', text: 'Chrono Luxe has become my go-to destination for luxury timepieces. Their curation is impeccable and the service is truly white-glove. I\'ve purchased three watches and each experience was flawless.', rating: 5, avatar: 'S' },
  { name: 'James R.', role: 'Watch Enthusiast', text: 'The level of expertise and passion their team brings is remarkable. They helped me find exactly the right Rolex for my collection. Highly recommended to any serious collector.', rating: 5, avatar: 'J' },
];

export function HomePage() {
  const { language } = useApp();
  const t = translations[language];
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredWatches = watches.filter(w => w.isFeatured).slice(0, 4);
  const newWatches = watches.filter(w => w.isNew).slice(0, 4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury watch hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 dark:from-black/90 dark:via-black/60 dark:to-black/30" />
        </div>

        {/* Gold accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#c9a84c] to-transparent opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#c9a84c]" />
              <span
                className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                Exclusive Collection 2026
              </span>
            </div>

            <h1
              className="text-white mb-6 leading-tight"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                lineHeight: 1.1,
              }}
            >
              {t.heroTitle}
            </h1>

            <p
              className="text-gray-300 mb-10 max-w-xl leading-relaxed"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.95rem' }}
            >
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 bg-[#c9a84c] hover:bg-[#b8943f] text-black px-8 py-4 transition-all duration-300 hover:gap-4"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.8rem' }}
              >
                {t.shopNow}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 border border-white/40 hover:border-[#c9a84c] text-white hover:text-[#c9a84c] px-8 py-4 transition-all duration-300 backdrop-blur-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.1em', fontSize: '0.8rem' }}
              >
                {t.exploreCollection}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#c9a84c] animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-[#c9a84c]" />
        </div>

        {/* Stats */}
        <div className="absolute bottom-0 left-0 right-0 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 w-fit ml-auto">
              {[
                { value: '500+', label: 'Premium Timepieces' },
                { value: '50+', label: 'Luxury Brands' },
                { value: '10K+', label: 'Happy Clients' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="px-8 py-4 text-center border-l border-white/10 bg-black/40 backdrop-blur-sm"
                >
                  <div
                    className="text-[#c9a84c] text-2xl mb-1"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-white/60 text-xs tracking-widest uppercase"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 dark:bg-[#0d0d0d] border-b border-gray-100 dark:border-gray-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { Icon: Award, label: 'Certified Authentic' },
              { Icon: Shield, label: '5-Year Warranty' },
              { Icon: Truck, label: 'Free Insured Shipping' },
              { Icon: Star, label: '5-Star Service' },
            ].map(({ Icon, label }, i) => (
              <div key={i} className="flex items-center gap-3 justify-center">
                <Icon size={18} className="text-[#c9a84c] flex-shrink-0" />
                <span
                  className="text-xs tracking-[0.1em] uppercase text-gray-600 dark:text-gray-400"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Watches */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#c9a84c]" />
              <span
                className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                Selection
              </span>
            </div>
            <h2
              className="text-gray-900 dark:text-white"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              {t.featuredWatches}
            </h2>
            <p
              className="text-gray-500 dark:text-gray-400 mt-2"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.85rem' }}
            >
              {t.featuredDesc}
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-[#c9a84c] hover:gap-3 transition-all duration-300 text-sm"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWatches.map(watch => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>
      </section>

      {/* Popular Brands */}
      <section className="bg-gray-50 dark:bg-[#0d0d0d] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#c9a84c]" />
              <span
                className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                Brands
              </span>
              <div className="h-px w-8 bg-[#c9a84c]" />
            </div>
            <h2
              className="text-gray-900 dark:text-white mb-2"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              {t.popularBrands}
            </h2>
            <p
              className="text-gray-500 dark:text-gray-400"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.85rem' }}
            >
              {t.brandsDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {brands.map(brand => (
              <Link
                key={brand}
                to={`/shop?brand=${brand}`}
                className="group flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-800 hover:border-[#c9a84c]/50 bg-white dark:bg-[#111111] transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a84c]/5 aspect-square"
              >
                <div
                  className="text-center text-gray-700 dark:text-gray-300 group-hover:text-[#c9a84c] transition-colors duration-300 text-xs tracking-wider"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '0.7rem' }}
                >
                  {brand}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#c9a84c]" />
              <span
                className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                Just In
              </span>
            </div>
            <h2
              className="text-gray-900 dark:text-white"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              {t.newArrivals}
            </h2>
            <p
              className="text-gray-500 dark:text-gray-400 mt-2"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.85rem' }}
            >
              {t.newArrivalsDesc}
            </p>
          </div>
          <Link
            to="/shop?filter=new"
            className="hidden md:flex items-center gap-2 text-[#c9a84c] hover:gap-3 transition-all duration-300 text-sm"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newWatches.map(watch => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={lifestyleImage}
            alt="Luxury lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-lg">
            <div className="h-px w-12 bg-[#c9a84c] mb-6" />
            <h2
              className="text-white mb-4"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
              }}
            >
              {t.promoTitle}
            </h2>
            <p
              className="text-gray-300 mb-8 leading-relaxed"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.9rem' }}
            >
              {t.promoDesc}
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-[#c9a84c] hover:bg-[#b8943f] text-black px-8 py-4 transition-all duration-300"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.8rem' }}
            >
              {t.learnMore} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#c9a84c]" />
            <span
              className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              Testimonials
            </span>
            <div className="h-px w-8 bg-[#c9a84c]" />
          </div>
          <h2
            className="text-gray-900 dark:text-white mb-2"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
          >
            {t.reviews}
          </h2>
          <p
            className="text-gray-500 dark:text-gray-400"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.85rem' }}
          >
            {t.reviewsDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewData.map((review, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#111111] border border-gray-100 dark:border-gray-800/60 p-8 relative"
            >
              <div className="text-[#c9a84c] text-5xl absolute top-4 left-6 opacity-20" style={{ fontFamily: 'Georgia, serif' }}>"</div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={12} className="fill-[#c9a84c] text-[#c9a84c]" />
                ))}
              </div>
              <p
                className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
              >
                {review.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#c9a84c] flex items-center justify-center">
                  <span
                    className="text-black font-bold"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {review.avatar}
                  </span>
                </div>
                <div>
                  <div
                    className="text-gray-900 dark:text-white text-sm"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                  >
                    {review.name}
                  </div>
                  <div
                    className="text-gray-400 text-xs"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {review.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#080808] dark:bg-[#050505] py-20 border-t border-[#c9a84c]/20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#c9a84c]" />
            <div className="w-2 h-2 bg-[#c9a84c] rotate-45" />
            <div className="h-px w-8 bg-[#c9a84c]" />
          </div>
          <h2
            className="text-white mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
          >
            {t.newsletter}
          </h2>
          <p
            className="text-gray-500 mb-8"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.85rem' }}
          >
            {t.newsletterDesc}
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-[#c9a84c]">
              <Shield size={16} />
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, fontSize: '0.85rem' }}>
                You're now a member of the Inner Circle
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="flex-1 bg-[#111111] border border-gray-700 border-r-0 text-white px-5 py-4 text-sm focus:outline-none focus:border-[#c9a84c] placeholder-gray-600"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
                required
              />
              <button
                type="submit"
                className="bg-[#c9a84c] hover:bg-[#b8943f] text-black px-8 py-4 transition-colors duration-300 whitespace-nowrap"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.75rem' }}
              >
                {t.subscribe}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
