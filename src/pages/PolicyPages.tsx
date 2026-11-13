import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function PrivacyPolicyPage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SeoHead
        title="Privacy Policy – VESTORA Formal Wear"
        description="Read how VESTORA handles customer contact details, browser localStorage preferences, and Cash on Delivery order privacy."
        path="/privacy-policy"
        breadcrumbs={breadcrumbs}
      />
      <Breadcrumbs items={breadcrumbs} />

      <article className="space-y-6 pt-2">
        <header className="pb-6 border-b border-[#EAE5DC]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">Legal &amp; Trust</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#111111] mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#6B655E] mt-2">Last updated: November 2026</p>
        </header>

        <section className="space-y-3 text-sm text-[#3F3B36] leading-relaxed">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">1. Information We Collect</h2>
          <p>
            When you browse VESTORA or complete a demonstration Cash on Delivery checkout, we collect only the delivery details you provide—such as your full name, mobile number, shipping address, and optional email address.
          </p>
        </section>

        <section className="space-y-3 text-sm text-[#3F3B36] leading-relaxed">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">2. Local Browser Storage</h2>
          <p>
            This frontend demonstration stores your shopping bag items and sample order confirmation records exclusively in your browser&apos;s <code className="text-xs bg-[#F8F6F2] px-1.5 py-0.5 border border-[#EAE5DC]">localStorage</code> so your selections persist across page reloads. No payment card or UPI credentials are ever collected.
          </p>
        </section>

        <section className="space-y-3 text-sm text-[#3F3B36] leading-relaxed">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">3. Contact &amp; Data Requests</h2>
          <p>
            You may clear your locally stored data at any time via your browser settings or contact concierge@vestora.in for privacy inquiries.
          </p>
        </section>
      </article>
    </div>
  );
}

export function ReturnPolicyPage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Return & Refund Policy' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SeoHead
        title="Return & Refund Policy – VESTORA India"
        description="15-day hassle-free returns and size exchanges on VESTORA men's and women's formal wear across India."
        path="/return-policy"
        breadcrumbs={breadcrumbs}
      />
      <Breadcrumbs items={breadcrumbs} />

      <article className="space-y-6 pt-2">
        <header className="pb-6 border-b border-[#EAE5DC]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">Client Assurance</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#111111] mt-1">
            Return &amp; Refund Policy
          </h1>
        </header>

        <section className="space-y-3 text-sm text-[#3F3B36] leading-relaxed">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">15-Day Easy Exchange &amp; Return Window</h2>
          <p>
            We want every VESTORA garment to fit like it was tailored for you. Unworn formal shirts, trousers, blazers, waistcoats, and co-ord sets with original price tags and garment sleeves intact can be exchanged or returned within 15 days of delivery.
          </p>
        </section>

        <section className="space-y-3 text-sm text-[#3F3B36] leading-relaxed">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">Size Exchanges</h2>
          <p>
            Need a different chest size or trouser waist? Reverse pickup is arranged free of cost for your first size exchange on any order across serviceable Indian PIN codes.
          </p>
        </section>

        <section className="space-y-3 text-sm text-[#3F3B36] leading-relaxed">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">Cash on Delivery Refunds</h2>
          <p>
            For Cash on Delivery orders, approved refunds after quality inspection are issued via direct NEFT/IMPS bank transfer or store credit within 5–7 business days.
          </p>
        </section>
      </article>
    </div>
  );
}

export function ShippingPolicyPage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Shipping Policy' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SeoHead
        title="Shipping Policy – Free Delivery Above ₹999 | VESTORA"
        description="Learn about VESTORA shipping rates, free delivery above ₹999, pan-India Cash on Delivery availability, and 5–7 day delivery timelines."
        path="/shipping-policy"
        breadcrumbs={breadcrumbs}
      />
      <Breadcrumbs items={breadcrumbs} />

      <article className="space-y-6 pt-2">
        <header className="pb-6 border-b border-[#EAE5DC]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">Pan-India Fulfilment</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#111111] mt-1">
            Shipping Policy
          </h1>
        </header>

        <section className="space-y-3 text-sm text-[#3F3B36] leading-relaxed">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">Free Shipping &amp; Standard Charges</h2>
          <p>
            VESTORA offers complimentary standard shipping on all orders above ₹999 across India. Orders totalling ₹999 or less carry a flat shipping fee of ₹79.
          </p>
        </section>

        <section className="space-y-3 text-sm text-[#3F3B36] leading-relaxed">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">Delivery Timelines</h2>
          <p>
            Orders are packed in protective garment sleeves and dispatched within 24–48 business hours. Metro cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Pune, Kolkata) typically receive deliveries within 3–5 business days, and other serviceable Indian PIN codes within 5–7 business days.
          </p>
        </section>

        <section className="space-y-3 text-sm text-[#3F3B36] leading-relaxed">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">Cash on Delivery (COD)</h2>
          <p>
            Cash on Delivery is available pan-India with zero extra COD surcharge. Please keep the exact invoice amount ready when our courier partner arrives.
          </p>
        </section>
      </article>
    </div>
  );
}
