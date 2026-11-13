import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BRAND_IMAGES } from '../data/images';

export function AboutPage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'About Us' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SeoHead
        title="About VESTORA – Modern Indian Formal Tailoring"
        description="Learn how VESTORA crafts tailored men's and women's formal wear in India using Egyptian cotton, worsted wool, and contemporary silhouettes."
        path="/about-us"
        image={BRAND_IMAGES.heroEditorial}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-2 pb-14 border-b border-[#EAE5DC]">
        <div className="lg:col-span-6 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">
            Our Heritage &amp; Craft
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#111111] leading-tight text-balance">
            Tailored for the Ambition of Modern India.
          </h1>
          <p className="text-base text-[#3F3B36] leading-relaxed">
            Founded with a singular focus on structured office clothing, VESTORA bridges bespoke atelier precision and everyday accessibility for working professionals across India.
          </p>
          <p className="text-sm text-[#524D46] leading-relaxed">
            From humid coastal commutes in Mumbai to crisp winter mornings in Delhi, our fabrics—two-ply Egyptian cotton poplins, breathable Tencel-viscose trousers, and half-canvas merino wool blazers—are calibrated for all-day composure.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/mens-formal-wear"
              className="px-6 py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Explore Men&apos;s Wear
            </Link>
            <Link
              to="/womens-formal-wear"
              className="px-6 py-3 border border-[#111111] text-[#111111] text-xs font-semibold uppercase tracking-wider"
            >
              Explore Women&apos;s Wear
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 aspect-[16/10] bg-[#F8F6F2] border border-[#EAE5DC] overflow-hidden">
          <img
            src={BRAND_IMAGES.heroEditorial}
            alt="VESTORA creative studio formal tailoring campaign"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-14">
        <div className="border border-[#EAE5DC] p-7 space-y-2.5">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">01. Fabric First</h2>
          <p className="text-sm text-[#524D46] leading-relaxed">
            We partner directly with heritage textile mills to source high-twist cottons, mulberry silk blends, and crease-recovery worsted suiting.
          </p>
        </div>
        <div className="border border-[#EAE5DC] p-7 space-y-2.5">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">02. Indian Fit Blocks</h2>
          <p className="text-sm text-[#524D46] leading-relaxed">
            Every collar, shoulder pad, and trouser rise is graded specifically around Indian executive proportions for effortless off-the-rack fit.
          </p>
        </div>
        <div className="border border-[#EAE5DC] p-7 space-y-2.5">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">03. Trust-First Service</h2>
          <p className="text-sm text-[#524D46] leading-relaxed">
            With pan-India Cash on Delivery, free shipping above ₹999, and 15-day size exchanges, building a sharper wardrobe stays risk-free.
          </p>
        </div>
      </section>
    </div>
  );
}
