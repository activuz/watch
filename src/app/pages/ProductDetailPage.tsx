import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ShoppingCart, Heart, Star, Shield, Truck, Award, ChevronRight, Minus, Plus, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { watches } from '../data/watches';
import { WatchCard } from '../components/WatchCard';

export function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, wishlist, toggleWishlist, language } = useApp();
  const t = translations[language];

  const watch = watches.find(w => w.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  const related = watches.filter(w => w.id !== Number(id) && (w.brand === watch?.brand || w.category === watch?.category)).slice(0, 4);

  if (!watch) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <p className="text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>Watch not found.</p>
        <Link to="/shop" className="text-[#c9a84c] mt-4 inline-block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(watch.id);

  const handleAddToCart = () => {
    addToCart(watch, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const reviewsData = [
    { name: 'Marcus T.', rating: 5, date: 'February 2026', text: 'Absolutely stunning timepiece. Every detail is impeccable. The packaging alone was worth the price.', avatar: 'M' },
    { name: 'Elena P.', rating: 5, date: 'January 2026', text: 'I purchased this as a gift and the recipient was speechless. The quality is exceptional and it arrived in perfect condition.', avatar: 'E' },
    { name: 'David C.', rating: 4, date: 'December 2025', text: 'Beautiful watch, exactly as described. The authentication certificate gives peace of mind. Would highly recommend.', avatar: 'D' },
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-xs text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          <Link to="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-[#c9a84c] transition-colors">{t.shop}</Link>
          <ChevronRight size={12} />
          <span className="text-[#c9a84c]">{watch.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Gallery */}
          <div>
            <div className="aspect-square bg-gray-50 dark:bg-[#0d0d0d] border border-gray-100 dark:border-gray-800 overflow-hidden mb-4 relative group">
              <img
                src={watch.images[activeImage]}
                alt={watch.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {watch.isNew && (
                <div className="absolute top-4 left-4 bg-[#c9a84c] text-black px-3 py-1 text-xs tracking-widest uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                  New
                </div>
              )}
            </div>
            {watch.images.length > 1 && (
              <div className="flex gap-3">
                {watch.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 border-2 overflow-hidden transition-all duration-200 ${
                      activeImage === i ? 'border-[#c9a84c]' : 'border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="mb-2">
              <span
                className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                {watch.brand}
              </span>
            </div>

            <h1
              className="text-gray-900 dark:text-white mb-4"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                lineHeight: 1.15,
              }}
            >
              {watch.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < Math.floor(watch.rating) ? 'fill-[#c9a84c] text-[#c9a84c]' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {watch.rating} ({watch.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
              {watch.originalPrice && (
                <span className="text-gray-400 line-through text-xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  ${watch.originalPrice.toLocaleString()}
                </span>
              )}
              <span
                className="text-gray-900 dark:text-white"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '2.2rem' }}
              >
                ${watch.price.toLocaleString()}
              </span>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: t.mechanism, value: watch.mechanism },
                { label: t.material, value: watch.material },
                { label: 'Category', value: watch.category },
                { label: 'Color', value: watch.color },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 dark:bg-[#111111] p-3">
                  <div className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.label}</div>
                  <div className="text-sm text-gray-900 dark:text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span
                  className="w-12 h-12 flex items-center justify-center text-gray-900 dark:text-white border-x border-gray-200 dark:border-gray-700"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!watch.inStock}
                className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 transition-all duration-300 ${
                  watch.inStock
                    ? addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-[#c9a84c] hover:bg-[#b8943f] text-black'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.8rem' }}
              >
                {addedToCart ? (
                  <><Check size={16} /> {t.addedToCart}</>
                ) : (
                  <><ShoppingCart size={16} /> {watch.inStock ? t.addToCart : t.outOfStock}</>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(watch.id)}
                className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
                  isWishlisted
                    ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]'
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-[#c9a84c] hover:text-[#c9a84c]'
                }`}
              >
                <Heart size={16} className={isWishlisted ? 'fill-[#c9a84c]' : ''} />
              </button>
            </div>

            {/* Trust */}
            <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-6">
              {[
                { Icon: Shield, text: 'Certified authentic with full provenance documentation' },
                { Icon: Truck, text: 'Complimentary insured worldwide shipping' },
                { Icon: Award, text: '5-year manufacturer warranty included' },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Icon size={14} className="text-[#c9a84c] flex-shrink-0" />
                  <span className="text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex border-b border-gray-100 dark:border-gray-800 mb-8">
            {(['description', 'specifications', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-200 border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'border-[#c9a84c] text-[#c9a84c]'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                {tab === 'description' ? t.description : tab === 'specifications' ? t.specifications : t.customerReviews}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <p
              className="text-gray-600 dark:text-gray-400 leading-loose max-w-3xl"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.9rem' }}
            >
              {watch.description}
            </p>
          )}

          {activeTab === 'specifications' && (
            <div className="max-w-2xl">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {Object.entries(watch.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center py-4">
                    <span
                      className="w-48 flex-shrink-0 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                    >
                      {key}
                    </span>
                    <span
                      className="text-gray-900 dark:text-white text-sm"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              {reviewsData.map((r, i) => (
                <div key={i} className="bg-gray-50 dark:bg-[#111111] p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#c9a84c] flex items-center justify-center">
                        <span className="text-black font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{r.avatar}</span>
                      </div>
                      <div>
                        <div className="text-gray-900 dark:text-white text-sm" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>{r.name}</div>
                        <div className="text-gray-400 text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>{r.date}</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} size={11} className="fill-[#c9a84c] text-[#c9a84c]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-8 bg-[#c9a84c]" />
              <h2
                className="text-gray-900 dark:text-white"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.8rem' }}
              >
                {t.relatedWatches}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(w => (
                <WatchCard key={w.id} watch={w} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
