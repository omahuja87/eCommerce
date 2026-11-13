import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/products';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CartSummary } from '../components/CartSummary';

export function CartPage() {
  const {
    cart,
    cartCount,
    subtotal,
    shippingCharges,
    totalAmount,
    updateQuantity,
    removeFromCart,
  } = useStore();

  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Shopping Cart' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SeoHead
        title="Shopping Cart – VESTORA Formal Wear"
        description="Review your selected formal shirts, trousers, blazers, and co-ord sets in your VESTORA shopping cart before Cash on Delivery checkout."
        path="/cart"
        breadcrumbs={breadcrumbs}
        noindex
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="pb-6 mb-8 border-b border-[#EAE5DC]">
        <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#111111]">
          Shopping Bag
        </h1>
        <p className="text-sm text-[#6B655E] mt-1 tabular-nums">
          {cartCount} {cartCount === 1 ? 'item' : 'items'} in your bag
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="py-16 px-6 bg-[#F8F6F2] border border-[#EAE5DC] text-center max-w-2xl mx-auto space-y-5">
          <ShoppingBag className="w-10 h-10 text-[#8C7355] mx-auto" />
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-semibold text-[#111111]">
              Your Shopping Bag is Empty
            </h2>
            <p className="text-sm text-[#524D46]">
              Explore our tailored men&apos;s and women&apos;s formal collections to build your workwear wardrobe.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/mens-formal-wear"
              className="px-6 py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2B2824] transition-colors"
            >
              Continue Shopping · Men
            </Link>
            <Link
              to="/womens-formal-wear"
              className="px-6 py-3 border border-[#111111] text-[#111111] bg-white text-xs font-semibold uppercase tracking-wider hover:bg-[#EFECE6] transition-colors"
            >
              Continue Shopping · Women
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Line Items */}
          <div className="lg:col-span-8 divide-y divide-[#EAE5DC] border-t border-b border-[#EAE5DC]">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.size}-${item.color.name}`}
                className="py-6 flex gap-4 sm:gap-6"
              >
                <Link
                  to={`/product/${item.slug}`}
                  className="w-24 sm:w-28 aspect-[3/4] bg-[#F8F6F2] border border-[#EAE5DC] shrink-0 overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-[#8C7355]">
                        {item.category}
                      </p>
                      <h2 className="text-base font-semibold text-[#111111] mt-0.5">
                        <Link to={`/product/${item.slug}`} className="hover:underline underline-offset-4">
                          {item.name}
                        </Link>
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#524D46] mt-1.5">
                        <span>Size: <strong className="text-[#111111]">{item.size}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1.5">
                          Colour:
                          <span
                            className="inline-block w-3 h-3 rounded-full border border-[#CFC8BC]"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <strong className="text-[#111111]">{item.color.name}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right tabular-nums shrink-0">
                      <p className="text-base font-semibold text-[#111111]">
                        {formatINR(item.sellingPrice * item.quantity)}
                      </p>
                      <p className="text-xs text-[#6B655E]">
                        {formatINR(item.sellingPrice)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-2">
                    <div className="inline-flex items-center border border-[#D5CEC2] bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.size, item.color.name, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="p-2 text-[#111111] hover:bg-[#F8F6F2]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-9 text-center text-xs font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.size, item.color.name, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="p-2 text-[#111111] hover:bg-[#F8F6F2]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId, item.size, item.color.name)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#6B655E] hover:text-[#9E2A2B] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <aside className="lg:col-span-4">
            <div className="bg-[#F8F6F2] border border-[#EAE5DC] p-6 space-y-6 lg:sticky lg:top-24">
              <h2 className="font-display text-2xl font-semibold text-[#111111]">Order Summary</h2>

              <CartSummary
                subtotal={subtotal}
                shippingCharges={shippingCharges}
                totalAmount={totalAmount}
                itemCount={cartCount}
              />

              <div className="space-y-3 pt-2">
                <Link
                  to="/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2B2824] transition-colors"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/mens-formal-wear"
                  className="w-full inline-flex items-center justify-center py-3 px-5 border border-[#111111] bg-white text-[#111111] text-xs font-semibold uppercase tracking-wider hover:bg-[#EFECE6] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>

              <p className="text-[11px] text-[#6B655E] leading-relaxed">
                Cash on Delivery (COD) is available on all orders across India. Estimated delivery within 5–7 business days.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
