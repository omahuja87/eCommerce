import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../data/products';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart } = useStore();
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizePrompt, setSizePrompt] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAction = (mode: 'cart' | 'buy') => {
    if (!selectedSize) {
      setSizePrompt(true);
      return;
    }
    setSizePrompt(false);
    addToCart(product, selectedSize, selectedColor, 1);
    if (mode === 'buy') {
      navigate('/checkout');
    }
  };

  const tagLabel = product.isBestseller
    ? 'Bestseller'
    : product.isNewArrival
      ? 'New Arrival'
      : null;

  return (
    <article className="group flex flex-col justify-between bg-white border border-[#EAE5DC] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div>
        {/* Product Media */}
        <Link
          to={`/product/${product.slug}`}
          className="block relative aspect-[3/4] bg-[#F8F6F2] overflow-hidden"
        >
          {!imgError ? (
            <>
              <img
                src={product.images[0]}
                alt={product.altText}
                loading={priority ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
              {product.images[1] && (
                <img
                  src={product.images[1]}
                  alt={`${product.name} alternate view`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F8F6F2] to-[#EBE5DA]">
              <span className="font-display text-xl text-[#111111]">{product.name}</span>
              <span className="text-xs text-[#6B655E] mt-1">{product.category}</span>
            </div>
          )}

          {tagLabel && (
            <span className="absolute top-3 left-3 bg-white/95 text-[#111111] px-2.5 py-1 text-[11px] font-medium tracking-wide border border-[#E5E0D8]">
              {tagLabel}
            </span>
          )}
        </Link>

        {/* Product Info */}
        <div className="p-4 pb-3 space-y-2">
          <div className="flex items-center justify-between gap-2 text-xs text-[#6B655E]">
            <span className="uppercase tracking-wider text-[11px] truncate">{product.category}</span>
            <span className="inline-flex items-center gap-1 tabular-nums shrink-0" title="Sample rating data">
              <Star className="w-3 h-3 fill-[#8C7355] text-[#8C7355]" />
              <span className="text-[#111111] font-medium">{product.rating.toFixed(1)}</span>
              <span>({product.reviewCount} sample)</span>
            </span>
          </div>

          <h3 className="text-[15px] font-semibold text-[#111111] leading-snug line-clamp-2 min-h-[2.6rem]">
            <Link to={`/product/${product.slug}`} className="hover:underline underline-offset-4">
              {product.name}
            </Link>
          </h3>

          <div className="flex flex-wrap items-baseline gap-2 tabular-nums">
            <span className="text-base font-semibold text-[#111111]">{formatINR(product.sellingPrice)}</span>
            <span className="text-xs text-[#8E877D] line-through">{formatINR(product.originalPrice)}</span>
            <span className="text-xs font-medium text-[#8C7355]">{product.discountPercent}% off</span>
          </div>

          {/* Color Swatches */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5" role="group" aria-label="Select colour">
              {product.colors.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    aria-label={`Colour ${color.name}`}
                    aria-pressed={isSelected}
                    className={`w-4 h-4 rounded-full border transition-transform ${
                      isSelected
                        ? 'ring-1 ring-offset-2 ring-[#111111] border-[#111111] scale-105'
                        : 'border-[#CFC8BC] hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
              <span className="text-[11px] text-[#6B655E] ml-1 truncate max-w-[100px]">
                {selectedColor.name}
              </span>
            </div>
            <span className="text-[11px] text-[#524D46] whitespace-nowrap">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Size Picker + Action Buttons */}
      <div className="px-4 pb-4 pt-2 border-t border-[#F1EDE6] space-y-2.5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-[11px] font-medium ${sizePrompt ? 'text-[#9E2A2B]' : 'text-[#6B655E]'}`}>
              {sizePrompt ? 'Select a size to continue' : 'Select Size'}
            </span>
            {selectedSize && (
              <span className="text-[11px] font-semibold text-[#111111]">Size: {selectedSize}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => {
              const active = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setSelectedSize(size);
                    setSizePrompt(false);
                  }}
                  aria-pressed={active}
                  className={`min-w-[34px] h-7 px-2 text-xs font-medium border transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : sizePrompt
                        ? 'bg-white text-[#111111] border-[#9E2A2B]/60 hover:border-[#111111]'
                        : 'bg-white text-[#3F3B36] border-[#DDD6CA] hover:border-[#111111]'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => handleAction('cart')}
            className="py-2 px-3 text-xs font-medium border border-[#111111] text-[#111111] bg-white hover:bg-[#F8F6F2] transition-colors whitespace-nowrap disabled:opacity-50"
          >
            Add to Cart
          </button>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => handleAction('buy')}
            className="py-2 px-3 text-xs font-medium bg-[#111111] text-white hover:bg-[#2B2824] transition-colors whitespace-nowrap disabled:opacity-50"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
