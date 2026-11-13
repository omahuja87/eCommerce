import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, RotateCcw, ShieldCheck, Sparkles, Truck, Wallet } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { ProductCard } from '../components/ProductCard';
import { BRAND_IMAGES } from '../data/images';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

const CATEGORIES = [
  {
    title: "Men's Formal Shirts",
    subtitle: 'Egyptian Cotton & Twill',
    href: '/mens-formal-shirts',
    image: BRAND_IMAGES.mensShirtWhite,
    alt: "Tailored men's white formal shirt in crisp cotton poplin",
  },
  {
    title: "Men's Formal Trousers",
    subtitle: 'Pleated & Flat-Front',
    href: '/mens-formal-trousers',
    image: BRAND_IMAGES.mensTrousers,
    alt: "Tailored men's charcoal pleated formal office trousers",
  },
  {
    title: "Women's Formal Shirts",
    subtitle: 'Silk-Cotton & Poplin',
    href: '/womens-formal-shirts',
    image: BRAND_IMAGES.womensShirt,
    alt: "Tailored women's ivory silk-cotton formal office shirt",
  },
  {
    title: "Women's Formal Trousers",
    subtitle: 'Wide-Leg & Cigarette',
    href: '/womens-formal-trousers',
    image: BRAND_IMAGES.womensTrousers,
    alt: "Tailored women's high-waisted warm beige formal trousers",
  },
  {
    title: "Women's Formal Blazers",
    subtitle: 'Structured Tailoring',
    href: '/womens-formal-blazers',
    image: BRAND_IMAGES.womensBlazerBeige,
    alt: "Tailored women's camel beige double-breasted formal blazer",
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Switching to VESTORA shirts and Kensington trousers cut my morning wardrobe routine in half. Even after a flight from Bengaluru to Mumbai, the poplin holds a clean collar line.',
    name: 'Rohan Kulkarni',
    role: 'Principal Consultant · Bengaluru',
  },
  {
    quote:
      'Finding structured women’s blazers tailored for Indian proportions used to mean bespoke tailoring. Amelia fits impeccably off the rack, and Cash on Delivery made trying my first order effortless.',
    name: 'Meera Nair',
    role: 'VP of Corporate Strategy · Mumbai',
  },
  {
    quote:
      'The Celeste co-ord set has become my go-to for board presentations. Breathable suiting fabric for Delhi summers without losing sharp shoulder structure.',
    name: 'Anjali Deshmukh',
    role: 'Corporate Legal Counsel · New Delhi',
  },
];

export function HomePage() {
  const { newsletterEmail, subscribeNewsletter } = useStore();
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');

  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);
  const mensPreview = PRODUCTS.filter((p) => p.gender === 'men').slice(0, 4);
  const womensPreview = PRODUCTS.filter((p) => p.gender === 'women').slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.trim())) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    subscribeNewsletter(emailInput.trim());
    setEmailInput('');
  };

  return (
    <>
      <SeoHead
        title="VESTORA – Men's & Women's Formal Wear in India"
        description="Shop premium formal wear for modern Indian professionals. Explore tailored formal shirts, trousers, blazers, waistcoats, and co-ord sets with Cash on Delivery."
        path="/"
        image={BRAND_IMAGES.heroEditorial}
      />

      {/* Hero Section */}
      <section className="relative bg-[#111111] overflow-hidden">
        <div className="relative min-h-[540px] lg:min-h-[640px] max-w-[1600px] mx-auto flex items-end lg:items-center">
          <img
            src={BRAND_IMAGES.heroEditorial}
            alt="Indian male and female professionals wearing tailored VESTORA formal blazers and trousers in a sunlit architectural gallery"
            loading="eager"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15 lg:bg-gradient-to-r lg:from-black/80 lg:via-black/45 lg:to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
            <div className="max-w-xl space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E3D4BC]">
                Tailored Office Wear · India
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[58px] font-semibold text-white leading-[1.08] text-balance">
                Dress Sharp. Lead Confidently.
              </h1>
              <p className="text-base sm:text-lg text-[#EAE4DA] leading-relaxed max-w-lg">
                Discover premium formal wear designed for modern professionals. Architectural silhouettes in breathable Egyptian cotton and fine worsted wool.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/mens-formal-wear"
                  className="inline-flex items-center gap-2 bg-white text-[#111111] px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#EAE4DA] transition-colors whitespace-nowrap"
                >
                  Shop Men <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/womens-formal-wear"
                  className="inline-flex items-center gap-2 border border-white text-white px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  Shop Women <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#EAE5DC]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">
              Curated Wardrobe Pillars
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/mens-formal-wear"
            className="text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-[#8C7355] inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            View All Tailoring <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-8">
          {CATEGORIES.map((cat) => (
            <Link key={cat.href} to={cat.href} className="group block">
              <div className="aspect-[3/4] bg-[#F8F6F2] overflow-hidden border border-[#EAE5DC]">
                <img
                  src={cat.image}
                  alt={cat.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="text-sm font-semibold text-[#111111] mt-3 group-hover:underline underline-offset-4">
                {cat.title}
              </h3>
              <p className="text-xs text-[#6B655E] mt-0.5">{cat.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestselling Products */}
      <section className="bg-[#F8F6F2] border-y border-[#EAE5DC] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E0D9CD]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">
                Executive Favourites
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
                Bestselling Formal Wear
              </h2>
            </div>
            <Link
              to="/womens-formal-wear"
              className="text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-[#8C7355] inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              Explore Bestsellers <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#EAE5DC]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">
              Season Edit
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/mens-formal-wear"
            className="text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-[#8C7355] inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            Shop Latest Releases <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Men's & Women's Formal Collections Showcase */}
      <section className="border-t border-[#EAE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16">
          {/* Men's Collection */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#EAE5DC]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">
                  Boardroom Precision
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
                  Men&apos;s Formal Collection
                </h2>
              </div>
              <Link
                to="/mens-formal-wear"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2B2824] transition-colors whitespace-nowrap"
              >
                Shop Men&apos;s Formal Wear <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {mensPreview.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Women's Collection */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#EAE5DC]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">
                  Contemporary Leadership
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
                  Women&apos;s Formal Collection
                </h2>
              </div>
              <Link
                to="/womens-formal-wear"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2B2824] transition-colors whitespace-nowrap"
              >
                Shop Women&apos;s Formal Wear <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {womensPreview.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#F8F6F2] border-y border-[#EAE5DC] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl pb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">
              The VESTORA Standard
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
              Why Professionals Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'Premium Quality',
                desc: 'Two-ply Egyptian cotton, mulberry silk blends, and breathable worsted suiting.',
              },
              {
                icon: ShieldCheck,
                title: 'Perfect Fit',
                desc: 'Patterned specifically for Indian body proportions with sharp shoulder and waist lines.',
              },
              {
                icon: Check,
                title: 'Affordable Luxury',
                desc: 'Direct-to-wardrobe atelier craftsmanship without inflated retail markups.',
              },
              {
                icon: RotateCcw,
                title: 'Easy Returns',
                desc: '15-day hassle-free size exchanges and straightforward return pickup.',
              },
              {
                icon: Wallet,
                title: 'Cash on Delivery',
                desc: 'Pay confidently at your doorstep across India on orders of every size.',
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="bg-white border border-[#EAE5DC] p-6 space-y-3">
                  <Icon className="w-5 h-5 text-[#8C7355]" />
                  <h3 className="text-sm font-semibold text-[#111111]">{pillar.title}</h3>
                  <p className="text-xs text-[#524D46] leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">
              Client Stories (Sample Testimonials)
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
              Worn Across India&apos;s Boardrooms
            </h2>
          </div>
          <p className="text-xs text-[#6B655E] inline-flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#8C7355]" /> Free delivery above ₹999
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="border border-[#EAE5DC] bg-white p-7 flex flex-col justify-between space-y-5"
            >
              <p className="text-sm text-[#3F3B36] leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <footer className="pt-4 border-t border-[#F1EDE6]">
                <p className="text-sm font-semibold text-[#111111]">{t.name}</p>
                <p className="text-xs text-[#6B655E] mt-0.5">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#EFECE6] border-t border-[#E5E0D8] py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">
            The Executive Brief
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111]">
            Receive Seasonal Tailoring Releases
          </h2>
          <p className="text-sm text-[#524D46] max-w-xl mx-auto">
            Join professionals across Mumbai, Bengaluru, and Delhi for early access to limited wool-silk runs and formal styling notes.
          </p>

          {newsletterEmail ? (
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-[#D5CEC2] text-sm text-[#111111] mt-2">
              <Check className="w-4 h-4 text-[#8C7355]" />
              <span>Subscribed with {newsletterEmail}</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto pt-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="Enter your work or personal email"
                  aria-label="Email address for newsletter"
                  className="flex-1 px-4 py-3 text-sm bg-white border border-[#D5CEC2] text-[#111111] focus:outline-none focus:border-[#111111]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2B2824] transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              {emailError && <p className="text-xs text-[#9E2A2B] mt-2 text-left">{emailError}</p>}
            </form>
          )}
        </div>
      </section>
    </>
  );
}
