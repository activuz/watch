import React, { useState } from 'react';
import { Link } from 'react-router';
import { Minus, Plus, X, ShoppingBag, ChevronRight, Shield, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, language } = useApp();
  const t = translations[language];
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', country: '', zip: '',
    cardNumber: '', expiry: '', cvv: ''
  });

  const tax = cartTotal * 0.1;
  const total = cartTotal + tax;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  if (checkoutStep === 'success') {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-[#c9a84c] flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-black" />
          </div>
          <h2
            className="text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '2rem' }}
          >
            {t.orderPlaced}
          </h2>
          <p
            className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.9rem' }}
          >
            {t.orderThank}
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#c9a84c] text-black px-8 py-4"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.8rem' }}
          >
            {t.continueShopping}
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && checkoutStep === 'cart') {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <ShoppingBag size={48} className="text-gray-300 dark:text-gray-700 mx-auto mb-6" />
          <h2
            className="text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '2rem' }}
          >
            {t.cartEmpty}
          </h2>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#c9a84c] text-black px-8 py-4"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.8rem' }}
          >
            {t.continueShopping}
          </Link>
        </div>
      </div>
    );
  }

  const InputField = ({
    label, name, type = 'text', placeholder, required = true,
    className = ''
  }: {
    label: string; name: string; type?: string; placeholder?: string; required?: boolean; className?: string;
  }) => (
    <div className={className}>
      <label
        className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5"
        style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={(form as any)[name]}
        onChange={handleFormChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      />
    </div>
  );

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-[#0d0d0d] border-b border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <span>Home</span><ChevronRight size={12} />
            <span className="text-[#c9a84c]">{checkoutStep === 'cart' ? t.shoppingCart : t.checkoutTitle}</span>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px w-8 bg-[#c9a84c]" />
          </div>
          <h1
            className="text-gray-900 dark:text-white"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {checkoutStep === 'cart' ? t.shoppingCart : t.checkoutTitle}
          </h1>

          {/* Steps */}
          <div className="flex items-center gap-4 mt-4">
            {[{ label: t.shoppingCart, step: 'cart' }, { label: t.checkoutTitle, step: 'checkout' }].map((s, i) => (
              <React.Fragment key={s.step}>
                {i > 0 && <ChevronRight size={14} className="text-gray-400" />}
                <span
                  className={`text-xs tracking-wider ${checkoutStep === s.step ? 'text-[#c9a84c]' : 'text-gray-400'}`}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: checkoutStep === s.step ? 600 : 400 }}
                >
                  {s.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {checkoutStep === 'cart' ? (
              <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-800/60">
                {cart.map(item => (
                  <div key={item.watch.id} className="flex gap-4 py-6">
                    <Link to={`/product/${item.watch.id}`} className="w-24 h-24 flex-shrink-0 bg-gray-50 dark:bg-[#111111] overflow-hidden">
                      <img
                        src={item.watch.image}
                        alt={item.watch.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div
                            className="text-[#c9a84c] text-xs tracking-widest uppercase mb-1"
                            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                          >
                            {item.watch.brand}
                          </div>
                          <Link to={`/product/${item.watch.id}`}>
                            <h3
                              className="text-gray-900 dark:text-white hover:text-[#c9a84c] transition-colors"
                              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '1.2rem' }}
                            >
                              {item.watch.name}
                            </h3>
                          </Link>
                          <p
                            className="text-xs text-gray-400 mt-1"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                          >
                            {item.watch.mechanism} · {item.watch.material}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.watch.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200 dark:border-gray-700">
                          <button
                            onClick={() => updateQuantity(item.watch.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white"
                          >
                            <Minus size={12} />
                          </button>
                          <span
                            className="w-8 h-8 flex items-center justify-center text-gray-900 dark:text-white text-sm border-x border-gray-200 dark:border-gray-700"
                            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.watch.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span
                          className="text-gray-900 dark:text-white"
                          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                        >
                          ${(item.watch.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handlePlaceOrder} className="space-y-8">
                <div>
                  <h3
                    className="text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-100 dark:border-gray-800"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.5rem' }}
                  >
                    Shipping Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label={t.firstName} name="firstName" />
                    <InputField label={t.lastName} name="lastName" />
                    <InputField label={t.email} name="email" type="email" className="sm:col-span-2" />
                    <InputField label={t.phone} name="phone" type="tel" className="sm:col-span-2" />
                    <InputField label={t.address} name="address" className="sm:col-span-2" />
                    <InputField label={t.city} name="city" />
                    <InputField label={t.zipCode} name="zip" />
                    <div className="sm:col-span-2">
                      <label
                        className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5"
                        style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                      >
                        {t.country}
                      </label>
                      <select
                        name="country"
                        value={form.country}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        <option value="">Select country</option>
                        <option>Uzbekistan</option>
                        <option>Russia</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Germany</option>
                        <option>France</option>
                        <option>UAE</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    className="text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-100 dark:border-gray-800"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.5rem' }}
                  >
                    {t.paymentInfo}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label={t.cardNumber} name="cardNumber" placeholder="•••• •••• •••• ••••" className="sm:col-span-2" />
                    <InputField label={t.expiryDate} name="expiry" placeholder="MM / YY" />
                    <InputField label={t.cvv} name="cvv" placeholder="•••" />
                  </div>

                  <div className="flex items-center gap-2 mt-4 p-3 bg-gray-50 dark:bg-[#111111]">
                    <Shield size={14} className="text-[#c9a84c]" />
                    <span className="text-xs text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Your payment information is encrypted and secure
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c9a84c] hover:bg-[#b8943f] text-black py-4 transition-colors duration-300 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.8rem' }}
                >
                  <Shield size={16} /> {t.placeOrder}
                </button>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-[#0d0d0d] border border-gray-100 dark:border-gray-800 p-6 sticky top-28">
              <h3
                className="text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-800"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.3rem' }}
              >
                {t.orderSummary}
              </h3>

              {/* Items preview */}
              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div key={item.watch.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                      <img src={item.watch.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-900 dark:text-white truncate" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
                        {item.watch.brand} {item.watch.name}
                      </div>
                      <div className="text-xs text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        ×{item.quantity}
                      </div>
                    </div>
                    <span className="text-xs text-gray-900 dark:text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                      ${(item.watch.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t.subtotal}</span>
                  <span className="text-gray-900 dark:text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t.shipping}</span>
                  <span className="text-[#c9a84c]" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t.complimentaryShipping}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t.tax} (10%)</span>
                  <span className="text-gray-900 dark:text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>${tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <span
                  className="text-gray-900 dark:text-white text-sm"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                >
                  {t.total}
                </span>
                <span
                  className="text-gray-900 dark:text-white"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '1.3rem' }}
                >
                  ${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>

              {checkoutStep === 'cart' && (
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full bg-[#c9a84c] hover:bg-[#b8943f] text-black py-4 transition-colors duration-300 flex items-center justify-center gap-2 mb-3"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.8rem' }}
                >
                  {t.checkout}
                </button>
              )}

              <Link
                to="/shop"
                className="block text-center text-xs text-gray-500 hover:text-[#c9a84c] transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {t.continueShopping}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
