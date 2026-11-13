import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#111111] text-[#E5E0D8] border-t border-[#262421]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="font-display text-3xl font-semibold tracking-[0.14em] text-white inline-block"
            >
              VESTORA
            </Link>
            <p className="text-sm text-[#B8B0A4] max-w-sm leading-relaxed">
              Modern formal tailoring crafted for India&apos;s working professionals. Engineered for crisp office presence, breathable comfort, and enduring silhouettes.
            </p>
            <div className="text-xs text-[#9A9389] space-y-1 pt-2">
              <p>Cash on Delivery available pan-India · Free Shipping above ₹999</p>
              <p>Customer Care: concierge@vestora.in · +91 22 4890 3210</p>
            </div>
          </div>

          {/* Shop Men */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C8B08E] mb-4">
              Men&apos;s Formal Wear
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D1CBC1]">
              <li>
                <Link to="/mens-formal-wear" className="hover:text-white transition-colors">
                  All Men&apos;s Collection
                </Link>
              </li>
              <li>
                <Link to="/mens-formal-shirts" className="hover:text-white transition-colors">
                  Men&apos;s Formal Shirts
                </Link>
              </li>
              <li>
                <Link to="/mens-formal-trousers" className="hover:text-white transition-colors">
                  Men&apos;s Formal Trousers
                </Link>
              </li>
              <li>
                <Link to="/mens-formal-wear?category=Formal+Blazers" className="hover:text-white transition-colors">
                  Men&apos;s Formal Blazers
                </Link>
              </li>
              <li>
                <Link to="/mens-formal-wear?category=Formal+Waistcoats" className="hover:text-white transition-colors">
                  Men&apos;s Waistcoats
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Women */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C8B08E] mb-4">
              Women&apos;s Formal Wear
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D1CBC1]">
              <li>
                <Link to="/womens-formal-wear" className="hover:text-white transition-colors">
                  All Women&apos;s Collection
                </Link>
              </li>
              <li>
                <Link to="/womens-formal-shirts" className="hover:text-white transition-colors">
                  Women&apos;s Formal Shirts
                </Link>
              </li>
              <li>
                <Link to="/womens-formal-trousers" className="hover:text-white transition-colors">
                  Women&apos;s Formal Trousers
                </Link>
              </li>
              <li>
                <Link to="/womens-formal-blazers" className="hover:text-white transition-colors">
                  Women&apos;s Formal Blazers
                </Link>
              </li>
              <li>
                <Link to="/womens-formal-wear?category=Formal+Co-ord+Sets" className="hover:text-white transition-colors">
                  Women&apos;s Co-ord Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Policies */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C8B08E] mb-4">
              Company &amp; Policies
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D1CBC1]">
              <li>
                <Link to="/about-us" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-white transition-colors">
                  Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9A9389]">
          <p>&copy; {new Date().getFullYear()} VESTORA Apparel India. Frontend E-Commerce Demonstration.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/cart" className="hover:text-white transition-colors">Shopping Bag</Link>
            <Link to="/checkout" className="hover:text-white transition-colors">COD Checkout</Link>
            <a href="/sitemap.xml" className="hover:text-white transition-colors">XML Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
