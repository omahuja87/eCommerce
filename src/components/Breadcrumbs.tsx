import { Link } from 'react-router-dom';
import { BreadcrumbItem } from '../types';

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 text-xs text-[#6B655E]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
              {idx > 0 && (
                <span aria-hidden="true" className="text-[#B8B0A4]">
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span aria-current={isLast ? 'page' : undefined} className="text-[#111111] font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-[#111111] transition-colors underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
