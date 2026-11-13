import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User, X, ArrowRight, Package } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, formatINR } from '../data/products';

const NAV_LINKS = [
  { label: 'Men', to: '/mens-formal-wear' },
  { label: 'Women', to: '/womens-formal-wear' },
  { label: 'Shirts', to: '/mens-formal-shirts' },
  { label: 'Trousers', to: '/womens-formal-trousers' },
  { label: 'Blazers', to: '/womens-formal-blazers' },
];

export function Header() {
  const {
    cartCount,
    orders,
    searchOpen,
    setSearchOpen,
    accountOpen,
    setAccountOpen,
    toast,
  } = useStore();

  const [bannerVisible, setBannerVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, setSearchOpen]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q) ||
        p.colors.some((c) => c.name.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [searchQuery]);

  return (
    <>
      {bannerVisible && (
        <div className="bg-[#111111] text-white h-8 px-4 flex items-center justify-center relative text-xs tracking-wide">
          <p className="text-center truncate pr-6">Free Shipping on Orders Above ₹999 · Cash on Delivery Available</p>
          <button
            type="button"
            onClick={() => setBannerVisible(false)}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 -ml-2 text-[#111111] hover:bg-[#F8F6F2] rounded-md transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link
              to="/"
              className="font-display text-2xl sm:text-[26px] font-semibold tracking-[0.14em] text-[#111111] whitespace-nowrap shrink-0"
            >
              VESTORA
            </Link>
          </div>

          {/* Zone 2: Concise Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-sm font-medium whitespace-nowrap shrink-0 transition-colors underline-offset-8 ${
                    isActive
                      ? 'text-[#111111] underline decoration-[#8C7355]'
                      : 'text-[#524D46] hover:text-[#111111] hover:underline decoration-[#D6CFC3]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Search, Account, Cart */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search formal wear"
              className="p-2.5 text-[#111111] hover:bg-[#F8F6F2] rounded-md transition-colors"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              aria-label="View account and local orders"
              className="p-2.5 text-[#111111] hover:bg-[#F8F6F2] rounded-md transition-colors"
            >
              <User className="w-[18px] h-[18px]" />
            </button>

            <Link
              to="/cart"
              aria-label={`Shopping bag with ${cartCount} items`}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#111111] hover:bg-[#F8F6F2] rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              <span className="tabular-nums text-xs font-semibold bg-[#111111] text-white px-1.5 py-0.5 rounded-sm min-w-[20px] text-center">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative w-80 max-w-[85vw] bg-white h-full flex flex-col justify-between p-6 overflow-y-auto shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E5E0D8]">
                <span className="font-display text-2xl font-semibold tracking-[0.14em] text-[#111111]">
                  VESTORA
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 text-[#111111]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#8C7355] mb-3">
                    Men&apos;s Formal Wear
                  </p>
                  <ul className="space-y-2.5 text-sm">
                    <li><Link to="/mens-formal-wear" className="block py-1 text-[#111111] font-medium">All Men&apos;s Collection</Link></li>
                    <li><Link to="/mens-formal-shirts" className="block py-1 text-[#524D46]">Men&apos;s Formal Shirts</Link></li>
                    <li><Link to="/mens-formal-trousers" className="block py-1 text-[#524D46]">Men&apos;s Formal Trousers</Link></li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#8C7355] mb-3">
                    Women&apos;s Formal Wear
                  </p>
                  <ul className="space-y-2.5 text-sm">
                    <li><Link to="/womens-formal-wear" className="block py-1 text-[#111111] font-medium">All Women&apos;s Collection</Link></li>
                    <li><Link to="/womens-formal-shirts" className="block py-1 text-[#524D46]">Women&apos;s Formal Shirts</Link></li>
                    <li><Link to="/womens-formal-trousers" className="block py-1 text-[#524D46]">Women&apos;s Formal Trousers</Link></li>
                    <li><Link to="/womens-formal-blazers" className="block py-1 text-[#524D46]">Women&apos;s Formal Blazers</Link></li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E5E0D8]">
                  <ul className="space-y-2.5 text-sm text-[#524D46]">
                    <li><Link to="/about-us" className="block py-1">About Us</Link></li>
                    <li><Link to="/contact-us" className="block py-1">Contact Us</Link></li>
                    <li><Link to="/shipping-policy" className="block py-1">Shipping Policy</Link></li>
                    <li><Link to="/return-policy" className="block py-1">Return &amp; Refund Policy</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E0D8]">
              <Link
                to="/cart"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#111111] text-white py-3 px-4 text-sm font-medium rounded-sm"
              >
                View Shopping Bag ({cartCount})
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            className="relative w-full max-w-2xl bg-white border border-[#E5E0D8] shadow-2xl p-6"
          >
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E5E0D8]">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-5 h-5 text-[#6B655E]" />
                <input
                  type="search"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search formal shirts, trousers, blazers, co-ord sets..."
                  className="w-full text-sm sm:text-base text-[#111111] placeholder:text-[#9A9389] focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="p-2 text-[#524D46] hover:text-[#111111]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium text-[#6B655E] mb-3">
                {searchQuery.trim() ? `Matching pieces (${searchResults.length})` : 'Popular formal essentials'}
              </p>

              {searchResults.length === 0 ? (
                <p className="py-8 text-center text-sm text-[#6B655E]">
                  No garments matched &ldquo;{searchQuery}&rdquo;. Try searching for shirts, blazers, or trousers.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto">
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        navigate(`/product/${item.slug}`);
                      }}
                      className="flex items-center gap-3 p-2.5 text-left border border-transparent hover:border-[#E5E0D8] hover:bg-[#F8F6F2] transition-colors"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.altText}
                        referrerPolicy="no-referrer"
                        className="w-14 h-16 object-cover bg-[#F8F6F2] shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-wider text-[#8C7355]">{item.category}</p>
                        <p className="text-sm font-medium text-[#111111] truncate">{item.name}</p>
                        <p className="text-xs text-[#524D46] tabular-nums mt-0.5">{formatINR(item.sellingPrice)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Account & Local Demo Orders Drawer */}
      {accountOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setAccountOpen(false)}
            aria-hidden="true"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Account and local order history"
            className="relative w-full max-w-md bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8]">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-[#111111]">Client Profile</h2>
                  <p className="text-xs text-[#6B655E]">Local Demonstration Session</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAccountOpen(false)}
                  aria-label="Close account panel"
                  className="p-2 text-[#524D46] hover:text-[#111111]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-[#111111] mb-3">Recent COD Orders (Stored Locally)</h3>
                {orders.length === 0 ? (
                  <div className="p-5 bg-[#F8F6F2] border border-[#E5E0D8] text-sm text-[#524D46]">
                    <p>You have not placed any demonstration orders in this browser yet.</p>
                    <Link
                      to="/mens-formal-wear"
                      onClick={() => setAccountOpen(false)}
                      className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-[#111111] underline underline-offset-4"
                    >
                      Explore Collections <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((ord) => (
                      <div key={ord.orderId} className="p-4 border border-[#E5E0D8] bg-[#F8F6F2]">
                        <div className="flex items-center justify-between text-xs text-[#6B655E]">
                          <span className="font-semibold text-[#111111] tabular-nums">{ord.orderId}</span>
                          <span>{ord.paymentMethod}</span>
                        </div>
                        <p className="text-sm font-medium text-[#111111] mt-1">{ord.customer.fullName}</p>
                        <p className="text-xs text-[#524D46] mt-0.5 tabular-nums">
                          {ord.items.length} item(s) · {formatINR(ord.totalAmount)}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#8C7355]">
                            <Package className="w-3.5 h-3.5" /> {ord.estimatedDelivery}
                          </span>
                          <Link
                            to="/thank-you"
                            state={{ orderId: ord.orderId }}
                            onClick={() => setAccountOpen(false)}
                            className="text-xs font-medium text-[#111111] underline underline-offset-4"
                          >
                            View Receipt
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E0D8] text-xs text-[#6B655E] space-y-2">
              <p>Note: VESTORA is a frontend demonstration storefront. Cart and COD order records stay locally in your browser.</p>
            </div>
          </aside>
        </div>
      )}

      {/* Subtle Toast Confirmation */}
      {toast.visible && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-[#111111] text-white px-4 py-3 text-xs sm:text-sm shadow-lg flex items-center gap-4 border border-white/10"
        >
          <span>{toast.message}</span>
          <Link
            to="/cart"
            className="text-[#E5D3B3] font-semibold underline underline-offset-4 whitespace-nowrap"
          >
            View Bag
          </Link>
        </div>
      )}
    </>
  );
}
