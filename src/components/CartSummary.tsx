import { FREE_SHIPPING_THRESHOLD, formatINR } from '../data/products';

interface CartSummaryProps {
  subtotal: number;
  shippingCharges: number;
  totalAmount: number;
  itemCount: number;
}

export function CartSummary({
  subtotal,
  shippingCharges,
  totalAmount,
  itemCount,
}: CartSummaryProps) {
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="space-y-4">
      {subtotal > 0 && remainingForFreeShipping > 0 ? (
        <div className="p-3 bg-[#EFECE6] text-xs text-[#3F3B36] border border-[#E5E0D8]">
          Add <span className="font-semibold text-[#111111] tabular-nums">{formatINR(remainingForFreeShipping)}</span> more to qualify for Free Shipping.
        </div>
      ) : subtotal >= FREE_SHIPPING_THRESHOLD ? (
        <div className="p-3 bg-[#F8F6F2] text-xs text-[#111111] border border-[#E5E0D8]">
          Your order qualifies for <span className="font-semibold">Free Express Shipping</span> across India.
        </div>
      ) : null}

      <dl className="space-y-2.5 text-sm border-t border-[#EAE5DC] pt-4">
        <div className="flex items-center justify-between text-[#524D46]">
          <dt>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</dt>
          <dd className="tabular-nums font-medium text-[#111111]">{formatINR(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between text-[#524D46]">
          <dt>Shipping Charges</dt>
          <dd className="tabular-nums font-medium text-[#111111]">
            {shippingCharges === 0 ? 'Free' : formatINR(shippingCharges)}
          </dd>
        </div>
        <div className="flex items-center justify-between text-base font-semibold text-[#111111] border-t border-[#EAE5DC] pt-3">
          <dt>Total Payable</dt>
          <dd className="tabular-nums">{formatINR(totalAmount)}</dd>
        </div>
      </dl>
    </div>
  );
}
