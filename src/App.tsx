import { useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage, ReturnPolicyPage, ShippingPolicyPage } from './pages/PolicyPages';
import { SeoHead } from './components/SeoHead';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-5">
      <SeoHead
        title="Page Not Found – VESTORA"
        description="The page you requested could not be found. Browse VESTORA men's and women's formal wear."
        path="/404"
        noindex
      />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7355]">404</p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#111111]">
        Page Not Found
      </h1>
      <p className="text-sm text-[#524D46]">
        Return to our collections to discover tailored formal wear for men and women.
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Link
          to="/"
          className="px-6 py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider"
        >
          Back to Homepage
        </Link>
        <Link
          to="/mens-formal-wear"
          className="px-6 py-3 border border-[#111111] text-[#111111] text-xs font-semibold uppercase tracking-wider"
        >
          Shop Men
        </Link>
        <Link
          to="/womens-formal-wear"
          className="px-6 py-3 border border-[#111111] text-[#111111] text-xs font-semibold uppercase tracking-wider"
        >
          Shop Women
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-[#111111]">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route
                path="/mens-formal-wear"
                element={
                  <CollectionPage
                    path="/mens-formal-wear"
                    seoTitle="Men's Formal Wear – Shirts, Trousers & Blazers | VESTORA"
                    seoDescription="Shop tailored men's formal wear in India. Explore Egyptian cotton shirts, pleated trousers, structured blazers, and waistcoats with COD."
                    heading="Men's Formal Wear"
                    subheading="Tailored shirts, pleated trousers, structured blazers, and waistcoats crafted for corporate poise and lasting comfort."
                    gender="men"
                    breadcrumbs={[{ label: 'Home', href: '/' }, { label: "Men's Formal Wear" }]}
                    relatedLinks={[
                      { label: "Men's Formal Shirts", to: '/mens-formal-shirts' },
                      { label: "Men's Formal Trousers", to: '/mens-formal-trousers' },
                      { label: "Women's Formal Wear", to: '/womens-formal-wear' },
                    ]}
                  />
                }
              />

              <Route
                path="/womens-formal-wear"
                element={
                  <CollectionPage
                    path="/womens-formal-wear"
                    seoTitle="Women's Formal Wear & Office Clothing | VESTORA India"
                    seoDescription="Discover women's office wear at VESTORA. Shop silk-cotton formal shirts, high-waisted trousers, tailored blazers, and co-ord sets with COD."
                    heading="Women's Formal Wear"
                    subheading="Contemporary office clothing tailored with architectural lines—fluid silk-cotton shirts, wide-leg trousers, blazers, and power co-ord sets."
                    gender="women"
                    breadcrumbs={[{ label: 'Home', href: '/' }, { label: "Women's Formal Wear" }]}
                    relatedLinks={[
                      { label: "Women's Formal Shirts", to: '/womens-formal-shirts' },
                      { label: "Women's Formal Trousers", to: '/womens-formal-trousers' },
                      { label: "Women's Formal Blazers", to: '/womens-formal-blazers' },
                    ]}
                  />
                }
              />

              <Route
                path="/mens-formal-shirts"
                element={
                  <CollectionPage
                    path="/mens-formal-shirts"
                    seoTitle="Men's Formal Shirts – Egyptian Cotton & Twill | VESTORA"
                    seoDescription="Buy crisp men's formal shirts crafted from two-ply Egyptian cotton and wrinkle-resistant twill. Free delivery above ₹999 and Cash on Delivery."
                    heading="Men's Formal Shirts"
                    subheading="Breathable two-ply Egyptian cotton poplins, micro-herringbone weaves, and wrinkle-resistant twill shirts tailored for all-day crispness."
                    gender="men"
                    fixedCategory="Formal Shirts"
                    breadcrumbs={[
                      { label: 'Home', href: '/' },
                      { label: "Men's Formal Wear", href: '/mens-formal-wear' },
                      { label: 'Formal Shirts' },
                    ]}
                    relatedLinks={[
                      { label: "Men's Formal Trousers", to: '/mens-formal-trousers' },
                      { label: "All Men's Wear", to: '/mens-formal-wear' },
                    ]}
                  />
                }
              />

              <Route
                path="/mens-formal-trousers"
                element={
                  <CollectionPage
                    path="/mens-formal-trousers"
                    seoTitle="Men's Formal Trousers – Pleated & Slim Fit | VESTORA"
                    seoDescription="Shop tailored men's formal trousers in merino wool blends and four-way stretch suiting. Ideal for office wear with Cash on Delivery."
                    heading="Men's Formal Trousers"
                    subheading="Precision-creased pleated and flat-front trousers with internal shirt-grip waistbands and breathable tropical suiting weaves."
                    gender="men"
                    fixedCategory="Formal Trousers"
                    breadcrumbs={[
                      { label: 'Home', href: '/' },
                      { label: "Men's Formal Wear", href: '/mens-formal-wear' },
                      { label: 'Formal Trousers' },
                    ]}
                    relatedLinks={[
                      { label: "Men's Formal Shirts", to: '/mens-formal-shirts' },
                      { label: "All Men's Wear", to: '/mens-formal-wear' },
                    ]}
                  />
                }
              />

              <Route
                path="/womens-formal-shirts"
                element={
                  <CollectionPage
                    path="/womens-formal-shirts"
                    seoTitle="Women's Formal Shirts – Silk-Cotton & Poplin | VESTORA"
                    seoDescription="Shop women's formal shirts in mulberry silk-cotton and concealed-placket Supima poplin. Refined office wear delivered with COD across India."
                    heading="Women's Formal Shirts"
                    subheading="Refined button-downs and concealed-placket office shirts with sculpted darts and French seams for seamless blazer layering."
                    gender="women"
                    fixedCategory="Formal Shirts"
                    breadcrumbs={[
                      { label: 'Home', href: '/' },
                      { label: "Women's Formal Wear", href: '/womens-formal-wear' },
                      { label: 'Formal Shirts' },
                    ]}
                    relatedLinks={[
                      { label: "Women's Formal Trousers", to: '/womens-formal-trousers' },
                      { label: "Women's Formal Blazers", to: '/womens-formal-blazers' },
                    ]}
                  />
                }
              />

              <Route
                path="/womens-formal-trousers"
                element={
                  <CollectionPage
                    path="/womens-formal-trousers"
                    seoTitle="Women's Formal Trousers – High-Waisted & Tailored | VESTORA"
                    seoDescription="Discover women's formal trousers in wide-leg Tencel and tapered ankle silhouettes. Tailored Indian fit with Cash on Delivery."
                    heading="Women's Formal Trousers"
                    subheading="High-waisted wide-leg and sleek cigarette trousers engineered with contoured waistbands and fluid crease-resistant drape."
                    gender="women"
                    fixedCategory="Formal Trousers"
                    breadcrumbs={[
                      { label: 'Home', href: '/' },
                      { label: "Women's Formal Wear", href: '/womens-formal-wear' },
                      { label: 'Formal Trousers' },
                    ]}
                    relatedLinks={[
                      { label: "Women's Formal Shirts", to: '/womens-formal-shirts' },
                      { label: "Women's Formal Blazers", to: '/womens-formal-blazers' },
                    ]}
                  />
                }
              />

              <Route
                path="/womens-formal-blazers"
                element={
                  <CollectionPage
                    path="/womens-formal-blazers"
                    seoTitle="Women's Formal Blazers – Structured Suiting | VESTORA"
                    seoDescription="Elevate your executive wardrobe with women's formal blazers in camel wool-blend and jet-black suiting. Shop online with Cash on Delivery."
                    heading="Women's Formal Blazers"
                    subheading="Single and double-breasted formal blazers cut with sharp shoulder definition, breathable linings, and versatile office tones."
                    gender="women"
                    fixedCategory="Formal Blazers"
                    breadcrumbs={[
                      { label: 'Home', href: '/' },
                      { label: "Women's Formal Wear", href: '/womens-formal-wear' },
                      { label: 'Formal Blazers' },
                    ]}
                    relatedLinks={[
                      { label: "Women's Formal Trousers", to: '/womens-formal-trousers' },
                      { label: "All Women's Wear", to: '/womens-formal-wear' },
                    ]}
                  />
                }
              />

              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/return-policy" element={<ReturnPolicyPage />} />
              <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </StoreProvider>
    </BrowserRouter>
  );
}
