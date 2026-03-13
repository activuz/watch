import React from 'react';
import { Link } from 'react-router';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Watch } from '../context/AppContext';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

interface WatchCardProps {
  watch: Watch;
  compact?: boolean;
}

export function WatchCard({ watch, compact = false }: WatchCardProps) {
  const { addToCart, wishlist, toggleWishlist, language } = useApp();
  const t = translations[language];
  const isWishlisted = wishlist.includes(watch.id);

  return (
    <div className="group relative bg-white dark:bg-[#111111] border border-gray-100 dark:border-gray-800/60 overflow-hidden transition-all duration-500 hover:border-[#c9a84c]/40 hover:shadow-2xl hover:shadow-[#c9a84c]/5">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {watch.isNew && (
          <span
            className="bg-[#c9a84c] text-black text-[10px] tracking-[0.15em] uppercase px-2 py-0.5"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            New
          </span>
        )}
        {watch.originalPrice && (
          <span
            className="bg-red-600 text-white text-[10px] tracking-[0.15em] uppercase px-2 py-0.5"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            Sale
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(watch.id)}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/80 dark:bg-black/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-[#c9a84c] hover:text-[#c9a84c]"
      >
        <Heart
          size={14}
          className={isWishlisted ? 'fill-[#c9a84c] text-[#c9a84c]' : 'text-gray-500 dark:text-gray-400'}
        />
      </button>

      {/* Image */}
      <Link to={`/product/${watch.id}`} className="block overflow-hidden aspect-square bg-gray-50 dark:bg-[#0d0d0d]">
        <img
          src={watch.image}
          alt={`${watch.brand} ${watch.name}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </Link>

      {/* Info */}
      <div className={`p-4 ${compact ? 'p-3' : 'p-5'}`}>
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
          >
            {watch.brand}
          </span>
          <div className="flex items-center gap-1">
            <Star size={11} className="fill-[#c9a84c] text-[#c9a84c]" />
            <span
              className="text-xs text-gray-500 dark:text-gray-400"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {watch.rating}
            </span>
          </div>
        </div>

        <Link to={`/product/${watch.id}`}>
          <h3
            className={`text-gray-900 dark:text-white mb-3 hover:text-[#c9a84c] dark:hover:text-[#c9a84c] transition-colors duration-200 ${compact ? 'text-base' : 'text-lg'}`}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
          >
            {watch.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            {watch.originalPrice && (
              <span
                className="text-xs text-gray-400 line-through mr-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                ${watch.originalPrice.toLocaleString()}
              </span>
            )}
            <span
              className="text-gray-900 dark:text-white"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: compact ? '0.9rem' : '1rem' }}
            >
              ${watch.price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => addToCart(watch)}
            className="flex items-center gap-2 bg-transparent border border-gray-300 dark:border-gray-700 hover:border-[#c9a84c] hover:bg-[#c9a84c] hover:text-black text-gray-600 dark:text-gray-300 px-3 py-2 transition-all duration-300 text-xs"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
          >
            <ShoppingCart size={12} />
            <span className="hidden sm:inline">{t.addToCart}</span>
          </button>
        </div>

        {!watch.inStock && (
          <p
            className="text-xs text-red-500 mt-2"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {t.outOfStock}
          </p>
        )}
      </div>
    </div>
  );
}
