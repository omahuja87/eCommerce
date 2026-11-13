import { useEffect } from 'react';
import { BreadcrumbItem, Product } from '../types';
import { BRAND_IMAGES } from '../data/images';

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  breadcrumbs?: BreadcrumbItem[];
  product?: Product;
  noindex?: boolean;
}

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function SeoHead({
  title,
  description,
  path,
  image,
  breadcrumbs,
  product,
  noindex = false,
}: SeoHeadProps) {
  useEffect(() => {
    const origin = window.location.origin;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${origin}${normalizedPath}`;
    const ogImage = image ? (image.startsWith('http') ? image : `${origin}${image}`) : `${origin}${BRAND_IMAGES.heroEditorial}`;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    upsertLink('canonical', canonicalUrl);

    upsertMeta('property', 'og:type', product ? 'product' : 'website');
    upsertMeta('property', 'og:site_name', 'VESTORA');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', ogImage);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);

    // Structured Data JSON-LD
    const existingScripts = document.head.querySelectorAll('script[data-vestora-ld="true"]');
    existingScripts.forEach((node) => node.remove());

    const schemas: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'VESTORA',
        url: origin,
        logo: `${origin}${BRAND_IMAGES.heroEditorial}`,
        description:
          "Premium men's and women's formal wear brand in India offering tailored shirts, trousers, blazers, waistcoats, and co-ord sets.",
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mumbai',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'concierge@vestora.in',
          areaServed: 'IN',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'VESTORA',
        url: origin,
      },
    ];

    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.label,
          item: crumb.href ? `${origin}${crumb.href}` : canonicalUrl,
        })),
      });
    }

    if (product) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        sku: product.sku,
        image: product.images.map((img) => (img.startsWith('http') ? img : `${origin}${img}`)),
        description: product.description,
        brand: {
          '@type': 'Brand',
          name: 'VESTORA',
        },
        category: product.category,
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: 'INR',
          price: product.sellingPrice,
          availability: product.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
      });
    }

    schemas.forEach((schemaObj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-vestora-ld', 'true');
      script.textContent = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });
  }, [title, description, path, image, breadcrumbs, product, noindex]);

  return null;
}
