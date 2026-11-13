import { X } from 'lucide-react';
import { GenderCategory, ProductCategory } from '../types';

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
  gender: GenderCategory;
  category: ProductCategory;
}

export function SizeGuideModal({ open, onClose, gender, category }: SizeGuideModalProps) {
  if (!open) return null;

  const isTrousers = category === 'Formal Trousers';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/45" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="VESTORA Size Guide"
        className="relative w-full max-w-xl bg-white border border-[#E5E0D8] p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#111111]">
              {gender === 'men' ? "Men's" : "Women's"} {category} Size Guide
            </h2>
            <p className="text-xs text-[#6B655E] mt-0.5">All garment measurements in inches (Indian tailored sizing)</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="p-2 text-[#524D46] hover:text-[#111111]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 overflow-x-auto">
          {gender === 'men' && isTrousers ? (
            <table className="w-full text-left text-xs sm:text-sm border-collapse tabular-nums">
              <thead>
                <tr className="border-b border-[#E5E0D8] text-[#6B655E]">
                  <th className="py-2.5 pr-4 font-medium">Size</th>
                  <th className="py-2.5 px-4 font-medium">Waist (in)</th>
                  <th className="py-2.5 px-4 font-medium">Hip (in)</th>
                  <th className="py-2.5 pl-4 font-medium">Outseam (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1EDE6] text-[#111111]">
                {[
                  ['28', '28.5', '36.5', '41.0'],
                  ['30', '30.5', '38.5', '41.5'],
                  ['32', '32.5', '40.5', '42.0'],
                  ['34', '34.5', '42.5', '42.5'],
                  ['36', '36.5', '44.5', '43.0'],
                  ['38', '38.5', '46.5', '43.0'],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="py-2.5 pr-4 font-semibold">{row[0]}</td>
                    <td className="py-2.5 px-4">{row[1]}</td>
                    <td className="py-2.5 px-4">{row[2]}</td>
                    <td className="py-2.5 pl-4">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : gender === 'men' ? (
            <table className="w-full text-left text-xs sm:text-sm border-collapse tabular-nums">
              <thead>
                <tr className="border-b border-[#E5E0D8] text-[#6B655E]">
                  <th className="py-2.5 pr-4 font-medium">Size</th>
                  <th className="py-2.5 px-4 font-medium">Chest (in)</th>
                  <th className="py-2.5 px-4 font-medium">Shoulder (in)</th>
                  <th className="py-2.5 pl-4 font-medium">Length (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1EDE6] text-[#111111]">
                {[
                  ['S (38)', '38.0 – 39.0', '17.2', '28.5'],
                  ['M (40)', '40.0 – 41.0', '17.8', '29.2'],
                  ['L (42)', '42.0 – 43.0', '18.5', '30.0'],
                  ['XL (44)', '44.0 – 45.0', '19.2', '30.8'],
                  ['XXL (46)', '46.0 – 47.0', '19.8', '31.5'],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="py-2.5 pr-4 font-semibold">{row[0]}</td>
                    <td className="py-2.5 px-4">{row[1]}</td>
                    <td className="py-2.5 px-4">{row[2]}</td>
                    <td className="py-2.5 pl-4">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : isTrousers ? (
            <table className="w-full text-left text-xs sm:text-sm border-collapse tabular-nums">
              <thead>
                <tr className="border-b border-[#E5E0D8] text-[#6B655E]">
                  <th className="py-2.5 pr-4 font-medium">Size</th>
                  <th className="py-2.5 px-4 font-medium">Waist (in)</th>
                  <th className="py-2.5 px-4 font-medium">Hip (in)</th>
                  <th className="py-2.5 pl-4 font-medium">Length (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1EDE6] text-[#111111]">
                {[
                  ['XS (26)', '26.0', '35.5', '39.0'],
                  ['S (28)', '28.0', '37.5', '39.5'],
                  ['M (30)', '30.0', '39.5', '40.0'],
                  ['L (32)', '32.0', '41.5', '40.5'],
                  ['XL (34)', '34.5', '44.0', '41.0'],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="py-2.5 pr-4 font-semibold">{row[0]}</td>
                    <td className="py-2.5 px-4">{row[1]}</td>
                    <td className="py-2.5 px-4">{row[2]}</td>
                    <td className="py-2.5 pl-4">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs sm:text-sm border-collapse tabular-nums">
              <thead>
                <tr className="border-b border-[#E5E0D8] text-[#6B655E]">
                  <th className="py-2.5 pr-4 font-medium">Size</th>
                  <th className="py-2.5 px-4 font-medium">Bust (in)</th>
                  <th className="py-2.5 px-4 font-medium">Waist (in)</th>
                  <th className="py-2.5 pl-4 font-medium">Shoulder (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1EDE6] text-[#111111]">
                {[
                  ['XS', '32.0 – 33.0', '26.0', '14.2'],
                  ['S', '34.0 – 35.0', '28.0', '14.8'],
                  ['M', '36.0 – 37.0', '30.0', '15.3'],
                  ['L', '38.0 – 39.5', '32.0', '15.8'],
                  ['XL', '40.5 – 42.0', '34.5', '16.4'],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="py-2.5 pr-4 font-semibold">{row[0]}</td>
                    <td className="py-2.5 px-4">{row[1]}</td>
                    <td className="py-2.5 px-4">{row[2]}</td>
                    <td className="py-2.5 pl-4">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="mt-5 text-xs text-[#6B655E] leading-relaxed">
          Fit Advice: Our garments follow a modern Indian tailored block. Between sizes? Size up for a relaxed layering fit over shirts or knitwear.
        </p>
      </div>
    </div>
  );
}
