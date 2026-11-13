import { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductListingProps {
  products: Product[];
  allowCategoryFilter?: boolean;
  initialCategory?: string;
}

type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'newest';
type PriceRangeOption = 'all' | 'under-2500' | '2500-4999' | '5000-plus';

export function ProductListing({
  products,
  allowCategoryFilter = false,
  initialCategory = 'All',
}: ProductListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<PriceRangeOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...unique];
  }, [products]);

  const sizes = useMemo(() => {
    const all = products.flatMap((p) => p.sizes);
    return ['All', ...Array.from(new Set(all))];
  }, [products]);

  const colors = useMemo(() => {
    const all = products.flatMap((p) => p.colors.map((c) => c.name));
    return ['All', ...Array.from(new Set(all))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const result = products.filter((p) => {
      if (allowCategoryFilter && selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      if (selectedSize !== 'All' && !p.sizes.includes(selectedSize)) {
        return false;
      }
      if (selectedColor !== 'All' && !p.colors.some((c) => c.name === selectedColor)) {
        return false;
      }
      if (priceRange === 'under-2500' && p.sellingPrice >= 2500) {
        return false;
      }
      if (priceRange === '2500-4999' && (p.sellingPrice < 2500 || p.sellingPrice > 4999)) {
        return false;
      }
      if (priceRange === '5000-plus' && p.sellingPrice < 5000) {
        return false;
      }
      return true;
    });

    const sorted = [...result];
    if (sortBy === 'popularity') {
      sorted.sort((a, b) => b.popularityScore - a.popularityScore);
    } else if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.sellingPrice - b.sellingPrice);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.sellingPrice - a.sellingPrice);
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => Number(Boolean(b.isNewArrival)) - Number(Boolean(a.isNewArrival)));
    }
    return sorted;
  }, [
    products,
    allowCategoryFilter,
    selectedCategory,
    selectedSize,
    selectedColor,
    priceRange,
    sortBy,
  ]);

  const hasActiveFilters =
    (allowCategoryFilter && selectedCategory !== 'All') ||
    selectedSize !== 'All' ||
    selectedColor !== 'All' ||
    priceRange !== 'all';

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setPriceRange('all');
    setSortBy('popularity');
  };

  const filterControls = (
    <div className="space-y-6">
      {allowCategoryFilter && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111111] mb-3">
            Category
          </h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`block w-full text-left text-sm py-1 transition-colors ${
                  selectedCategory === cat
                    ? 'text-[#111111] font-semibold underline underline-offset-4 decoration-[#8C7355]'
                    : 'text-[#524D46] hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111111] mb-3">
          Size
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`px-2.5 py-1.5 text-xs font-medium border transition-colors ${
                selectedSize === size
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#524D46] border-[#DDD6CA] hover:border-[#111111]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111111] mb-3">
          Price Range
        </h3>
        <div className="space-y-2 text-sm">
          {[
            { value: 'all', label: 'All Prices' },
            { value: 'under-2500', label: 'Under ₹2,500' },
            { value: '2500-4999', label: '₹2,500 – ₹4,999' },
            { value: '5000-plus', label: '₹5,000 & Above' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setPriceRange(opt.value as PriceRangeOption)}
              className={`block w-full text-left py-1 transition-colors ${
                priceRange === opt.value
                  ? 'text-[#111111] font-semibold underline underline-offset-4 decoration-[#8C7355]'
                  : 'text-[#524D46] hover:text-[#111111]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111111] mb-3">
          Colour
        </h3>
        <select
          aria-label="Filter by colour"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-full border border-[#DDD6CA] bg-white px-3 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c === 'All' ? 'All Colours' : c}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={resetFilters}
          className="w-full py-2 px-3 text-xs font-medium border border-[#111111] text-[#111111] hover:bg-[#F8F6F2] transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10">
      {/* Desktop Sidebar Filters */}
      <aside className="hidden lg:block lg:col-span-1 pr-4 border-r border-[#EAE5DC]">
        {filterControls}
      </aside>

      {/* Main Grid */}
      <div className="lg:col-span-3">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#EAE5DC]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium border border-[#111111] text-[#111111]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
            </button>
            <p className="text-sm text-[#524D46] tabular-nums">
              Showing <span className="font-semibold text-[#111111]">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs text-[#6B655E] whitespace-nowrap">
              Sort by
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-[#DDD6CA] bg-white px-3 py-1.5 text-xs sm:text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
            >
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 px-6 text-center bg-[#F8F6F2] border border-[#EAE5DC]">
            <p className="font-display text-2xl text-[#111111]">No matching formal pieces found</p>
            <p className="text-sm text-[#6B655E] mt-2">
              Try adjusting your size, colour, or price filter to view more garments.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 px-5 py-2.5 text-xs font-medium bg-[#111111] text-white hover:bg-[#2B2824] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx < 3} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-start">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full p-6 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#EAE5DC]">
              <h2 className="font-display text-2xl font-semibold text-[#111111]">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="p-1.5 text-[#111111]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterControls}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full py-3 text-xs font-semibold bg-[#111111] text-white"
            >
              Apply Filters ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
