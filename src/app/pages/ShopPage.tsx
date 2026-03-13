import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { watches as allWatches, brands, categories, mechanisms, colors } from '../data/watches';
import { WatchCard } from '../components/WatchCard';
import { useSearchParams } from 'react-router';

const priceRanges = [
  { label: 'Under $5,000', min: 0, max: 5000 },
  { label: '$5,000 – $15,000', min: 5000, max: 15000 },
  { label: '$15,000 – $30,000', min: 15000, max: 30000 },
  { label: 'Over $30,000', min: 30000, max: Infinity },
];

export function ShopPage() {
  const { language } = useApp();
  const t = translations[language];
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMechanism, setSelectedMechanism] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState(-1);
  const [sortBy, setSortBy] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const brand = searchParams.get('brand');
    if (brand) setSelectedBrand(brand);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...allWatches];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(w =>
        w.name.toLowerCase().includes(q) ||
        w.brand.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q)
      );
    }
    if (selectedBrand) result = result.filter(w => w.brand === selectedBrand);
    if (selectedCategory) result = result.filter(w => w.category === selectedCategory);
    if (selectedMechanism) result = result.filter(w => w.mechanism === selectedMechanism);
    if (selectedColor) result = result.filter(w => w.color === selectedColor);
    if (selectedPriceRange >= 0) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter(w => w.price >= range.min && w.price < range.max);
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [search, selectedBrand, selectedCategory, selectedMechanism, selectedColor, selectedPriceRange, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedBrand('');
    setSelectedCategory('');
    setSelectedMechanism('');
    setSelectedColor('');
    setSelectedPriceRange(-1);
    setSortBy('featured');
  };

  const hasFilters = search || selectedBrand || selectedCategory || selectedMechanism || selectedColor || selectedPriceRange >= 0;

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-b border-gray-100 dark:border-gray-800 pb-5 mb-5">
      <h4
        className="text-xs tracking-[0.25em] uppercase text-gray-500 dark:text-gray-400 mb-3"
        style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
      >
        {title}
      </h4>
      {children}
    </div>
  );

  const FilterOption = ({ value, label, selected, onClick }: { value: string; label: string; selected: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`block w-full text-left text-sm py-1.5 transition-colors duration-200 ${
        selected
          ? 'text-[#c9a84c]'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
      }`}
      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: selected ? 500 : 400 }}
    >
      <span className={`mr-2 ${selected ? 'text-[#c9a84c]' : 'text-transparent'}`}>›</span>
      {label}
    </button>
  );

  const sidebar = (
    <div>
      <FilterSection title={t.brand}>
        {brands.map(b => (
          <FilterOption
            key={b}
            value={b}
            label={b}
            selected={selectedBrand === b}
            onClick={() => setSelectedBrand(selectedBrand === b ? '' : b)}
          />
        ))}
      </FilterSection>

      <FilterSection title={t.allPrices}>
        {priceRanges.map((range, i) => (
          <FilterOption
            key={i}
            value={range.label}
            label={range.label}
            selected={selectedPriceRange === i}
            onClick={() => setSelectedPriceRange(selectedPriceRange === i ? -1 : i)}
          />
        ))}
      </FilterSection>

      <FilterSection title={t.allTypes}>
        {categories.map(c => (
          <FilterOption
            key={c}
            value={c}
            label={c}
            selected={selectedCategory === c}
            onClick={() => setSelectedCategory(selectedCategory === c ? '' : c)}
          />
        ))}
      </FilterSection>

      <FilterSection title={t.allMechanisms}>
        {mechanisms.map(m => (
          <FilterOption
            key={m}
            value={m}
            label={m}
            selected={selectedMechanism === m}
            onClick={() => setSelectedMechanism(selectedMechanism === m ? '' : m)}
          />
        ))}
      </FilterSection>

      <FilterSection title={t.allColors}>
        {colors.map(c => (
          <FilterOption
            key={c}
            value={c}
            label={c}
            selected={selectedColor === c}
            onClick={() => setSelectedColor(selectedColor === c ? '' : c)}
          />
        ))}
      </FilterSection>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-xs text-red-500 hover:text-red-400 transition-colors"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          <X size={12} /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="pt-20 min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-50 dark:bg-[#0d0d0d] border-b border-gray-100 dark:border-gray-800/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <span>Home</span>
            <span>/</span>
            <span className="text-[#c9a84c]">{t.shop}</span>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px w-8 bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
              Collection
            </span>
          </div>
          <h1
            className="text-gray-900 dark:text-white"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {t.shop}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Sort Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.searchWatches}
              className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
          </div>

          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden flex items-center gap-2 border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:border-[#c9a84c] transition-colors"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <SlidersHorizontal size={15} /> {t.filters}
          </button>

          <div className="ml-auto flex items-center gap-3">
            <span
              className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {t.showing} <strong className="text-gray-900 dark:text-white">{filtered.length}</strong> {t.products}
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-[#c9a84c] cursor-pointer"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <option value="featured">{t.sortFeatured}</option>
                <option value="price-asc">{t.sortPriceLow}</option>
                <option value="price-desc">{t.sortPriceHigh}</option>
                <option value="newest">{t.sortNewest}</option>
                <option value="rating">{t.sortRating}</option>
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28">
              <h3
                className="text-gray-900 dark:text-white text-xs tracking-[0.3em] uppercase mb-6"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
              >
                {t.filters}
              </h3>
              {sidebar}
            </div>
          </aside>

          {/* Mobile Filters Drawer */}
          {filtersOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/60" onClick={() => setFiltersOpen(false)} />
              <div className="relative ml-auto w-72 bg-white dark:bg-[#0d0d0d] h-full overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-xs tracking-[0.3em] uppercase text-gray-900 dark:text-white"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                  >
                    {t.filters}
                  </h3>
                  <button onClick={() => setFiltersOpen(false)}>
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>
                {sidebar}
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  No watches found matching your criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-[#c9a84c] text-sm hover:underline"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(watch => (
                  <WatchCard key={watch.id} watch={watch} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
