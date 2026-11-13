import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Check, Minus, Plus, Ruler, ShieldCheck, Star, Truck, RotateCcw } from 'lucide-react';
import { PRODUCTS, formatINR } from '../data/products';
import { useStore } from '../context/StoreContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { SizeGuideModal } from '../components/SizeGuideModal';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const product = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'shipping'>('specs');

  useEffect(() => {
    if (product) {
      setActiveImageIdx(0);
      setSelectedColor(product.colors[0]);
      setSelectedSize(null);
      setQuantity(1);
      setSizeError(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <SeoHead
          title="Product Not Found – VESTORA"
          description="The formal garment you requested could not be found. Browse VESTORA collections."
          path={`/product/${slug ?? ''}`}
          noindex
        />
        <h1 className="font-display text-4xl font-semibold text-[#111111]">Garment Not Found</h1>
        <p className="text-sm text-[#524D46]">
          The formal piece you are looking for may have moved or is currently unavailable.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link to="/mens-formal-wear" className="px-5 py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider">
            Shop Men
          </Link>
          <Link to="/womens-formal-wear" className="px-5 py-3 border border-[#111111] text-[#111111] text-xs font-semibold uppercase tracking-wider">
            Shop Women
          </Link>
        </div>
      </div>
    );
  }

  const genderRoute = product.gender === 'men' ? '/mens-formal-wear' : '/womens-formal-wear';
  const genderLabel = product.gender === 'men' ? "Men's Formal Wear" : "Women's Formal Wear";

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: genderLabel, href: genderRoute },
    { label: product.name },
  ];

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  const handlePurchase = (mode: 'cart' | 'buy') => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, selectedColor || product.colors[0], quantity);
    if (mode === 'buy') {
      navigate('/checkout');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SeoHead
        title={`${product.name} – VESTORA`}
        description={`${product.description.slice(0, 140)} Buy online at VESTORA with Cash on Delivery.`}
        path={`/product/${product.slug}`}
        image={product.images[0]}
        breadcrumbs={breadcrumbs}
        product={product}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-2">
        {/* Left Sticky Image Gallery */}
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-24 flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-3 sm:w-20 shrink-0 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  aria-label={`View image ${idx + 1} of ${product.name}`}
                  className={`w-16 sm:w-20 aspect-[3/4] bg-[#F8F6F2] border overflow-hidden shrink-0 transition-opacity ${
                    activeImageIdx === idx
                      ? 'border-[#111111] opacity-100'
                      : 'border-[#E5E0D8] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>

            <div className="flex-1 aspect-[3/4] bg-[#F8F6F2] border border-[#EAE5DC] overflow-hidden">
              <img
                src={product.images[activeImageIdx]}
                alt={product.altText}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Right Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2.5 border-b border-[#EAE5DC] pb-5">
            <div className="flex items-center justify-between text-xs text-[#6B655E]">
              <span className="uppercase tracking-wider text-[#8C7355] font-medium">
                {product.category} · {product.sku}
              </span>
              <span className="inline-flex items-center gap-1 tabular-nums" title="Sample customer rating data">
                <Star className="w-3.5 h-3.5 fill-[#8C7355] text-[#8C7355]" />
                <span className="font-semibold text-[#111111]">{product.rating.toFixed(1)}</span>
                <span>({product.reviewCount} sample reviews)</span>
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111] leading-tight text-balance">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 pt-1 tabular-nums">
              <span className="text-2xl font-semibold text-[#111111]">
                {formatINR(product.sellingPrice)}
              </span>
              <span className="text-base text-[#8E877D] line-through">
                {formatINR(product.originalPrice)}
              </span>
              <span className="text-xs font-semibold text-[#8C7355] uppercase tracking-wide">
                {product.discountPercent}% Off
              </span>
            </div>
            <p className="text-xs text-[#6B655E]">Inclusive of all taxes · Free shipping above ₹999</p>
          </div>

          <p className="text-sm text-[#3F3B36] leading-relaxed">{product.description}</p>

          {/* Colour Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#111111]">
                Colour: <span className="text-[#524D46]">{selectedColor?.name}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((color) => {
                const active = selectedColor?.name === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select colour ${color.name}`}
                    aria-pressed={active}
                    className={`w-8 h-8 rounded-full border transition-transform ${
                      active
                        ? 'ring-2 ring-offset-2 ring-[#111111] border-[#111111]'
                        : 'border-[#CFC8BC] hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
          </div>

          {/* Size Selector (Required before Add to Cart / Buy Now) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className={`font-medium ${sizeError ? 'text-[#9E2A2B]' : 'text-[#111111]'}`}>
                {sizeError ? 'Please select a size before adding to bag' : 'Select Size'}
              </span>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="inline-flex items-center gap-1.5 text-[#111111] underline underline-offset-4 hover:text-[#8C7355]"
              >
                <Ruler className="w-3.5 h-3.5" /> Size Guide
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const active = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    aria-pressed={active}
                    className={`min-w-[48px] h-11 px-3.5 text-sm font-medium border transition-colors ${
                      active
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : sizeError
                          ? 'bg-white text-[#111111] border-[#9E2A2B]'
                          : 'bg-white text-[#111111] border-[#D5CEC2] hover:border-[#111111]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Availability */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[#111111]">Quantity</span>
              <div className="inline-flex items-center border border-[#D5CEC2] bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2.5 text-[#111111] hover:bg-[#F8F6F2]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium tabular-nums">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="p-2.5 text-[#111111] hover:bg-[#F8F6F2]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#3F3B36]">
              <Check className="w-3.5 h-3.5 text-[#8C7355]" />
              {product.stockNote}
            </span>
          </div>

          {/* Primary Purchase Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => handlePurchase('cart')}
              className="py-3.5 px-6 border border-[#111111] bg-white text-[#111111] text-xs font-semibold uppercase tracking-wider hover:bg-[#F8F6F2] transition-colors cursor-pointer"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => handlePurchase('buy')}
              className="py-3.5 px-6 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2B2824] transition-colors cursor-pointer"
            >
              Buy Now
            </button>
          </div>

          {/* Delivery Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#F8F6F2] border border-[#EAE5DC] text-xs text-[#524D46]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#8C7355] shrink-0" />
              <span>Free delivery above ₹999</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8C7355] shrink-0" />
              <span>Cash on Delivery available</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#8C7355] shrink-0" />
              <span>15-day easy exchange</span>
            </div>
          </div>

          {/* Details & Shipping Tabs */}
          <div className="pt-2">
            <div className="flex border-b border-[#EAE5DC]">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`pb-3 pr-6 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'specs'
                    ? 'border-[#111111] text-[#111111]'
                    : 'border-transparent text-[#6B655E] hover:text-[#111111]'
                }`}
              >
                Product Details &amp; Specifications
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('shipping')}
                className={`pb-3 px-6 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'shipping'
                    ? 'border-[#111111] text-[#111111]'
                    : 'border-transparent text-[#6B655E] hover:text-[#111111]'
                }`}
              >
                Shipping &amp; Returns
              </button>
            </div>

            {activeTab === 'specs' ? (
              <dl className="divide-y divide-[#F1EDE6] text-xs sm:text-sm pt-2">
                {[
                  ['Fabric Composition', product.specs.fabric],
                  ['Fit Profile', product.specs.fit],
                  ['Weave & Pattern', product.specs.pattern],
                  ['Wash & Care', product.specs.care],
                  ['Origin', product.specs.origin],
                ].map(([label, val]) => (
                  <div key={label} className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#6B655E]">{label}</dt>
                    <dd className="text-[#111111] font-medium text-right">{val}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="pt-4 space-y-2.5 text-xs sm:text-sm text-[#524D46] leading-relaxed">
                <p>
                  <strong className="text-[#111111]">Pan-India Dispatch:</strong> Orders are dispatched within 24–48 business hours and typically delivered within 5–7 business days.
                </p>
                <p>
                  <strong className="text-[#111111]">Shipping Charges:</strong> Free shipping on all orders above ₹999. Orders under ₹999 carry a flat ₹79 shipping fee.
                </p>
                <p>
                  <strong className="text-[#111111]">Returns &amp; Exchanges:</strong> Eligible for a 15-day return or size exchange on unworn garments with original tags intact.{' '}
                  <Link to="/return-policy" className="text-[#111111] underline underline-offset-4">
                    Read Return Policy
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-20 pt-12 border-t border-[#EAE5DC]">
        <div className="flex items-end justify-between pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">
              Complete the Wardrobe
            </p>
            <h2 className="font-display text-3xl font-semibold text-[#111111] mt-1">
              Related Formal Pieces
            </h2>
          </div>
          <Link
            to={genderRoute}
            className="text-xs font-semibold uppercase tracking-wider text-[#111111] underline underline-offset-4"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <SizeGuideModal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        gender={product.gender}
        category={product.category}
      />
    </div>
  );
}
