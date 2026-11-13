import { useSearchParams, Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductListing } from '../components/ProductListing';
import { PRODUCTS } from '../data/products';
import { BreadcrumbItem, GenderCategory, ProductCategory } from '../types';

export interface CollectionPageProps {
  path: string;
  seoTitle: string;
  seoDescription: string;
  heading: string;
  subheading: string;
  gender: GenderCategory;
  fixedCategory?: ProductCategory;
  breadcrumbs: BreadcrumbItem[];
  relatedLinks: { label: string; to: string }[];
}

export function CollectionPage({
  path,
  seoTitle,
  seoDescription,
  heading,
  subheading,
  gender,
  fixedCategory,
  breadcrumbs,
  relatedLinks,
}: CollectionPageProps) {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category') || 'All';

  const collectionProducts = PRODUCTS.filter((p) => {
    if (p.gender !== gender) return false;
    if (fixedCategory && p.category !== fixedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        path={path}
        image={collectionProducts[0]?.images[0]}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <header className="pb-8 mb-8 border-b border-[#EAE5DC]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">
          {gender === 'men' ? "Men's Formal Tailoring" : "Women's Formal Tailoring"}
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#111111] mt-1.5 text-balance">
          {heading}
        </h1>
        <p className="text-sm sm:text-base text-[#524D46] max-w-2xl mt-3 leading-relaxed">
          {subheading}
        </p>

        {/* Internal Cross-Links */}
        <div className="flex flex-wrap items-center gap-3 mt-5 text-xs">
          <span className="text-[#6B655E]">Explore:</span>
          {relatedLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[#111111] font-medium underline underline-offset-4 decoration-[#D5CEC2] hover:decoration-[#111111]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </header>

      <ProductListing
        products={collectionProducts}
        allowCategoryFilter={!fixedCategory}
        initialCategory={!fixedCategory ? categoryQuery : 'All'}
      />
    </div>
  );
}
