import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Info, PackageCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/products';
import { SeoHead } from '../components/SeoHead';

export function ThankYouPage() {
  const { orders, latestOrder } = useStore();
  const location = useLocation();
  const state = location.state as { orderId?: string } | null;

  const order =
    (state?.orderId ? orders.find((o) => o.orderId === state.orderId) : undefined) || latestOrder;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SeoHead
        title="Order Confirmed – Thank You | VESTORA"
        description="Thank you for shopping with VESTORA. View your Cash on Delivery order confirmation details."
        path="/thank-you"
        noindex
      />

      {!order ? (
        <div className="bg-[#F8F6F2] border border-[#EAE5DC] p-8 sm:p-12 text-center space-y-5">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111]">
            No Recent Order Found
          </h1>
          <p className="text-sm text-[#524D46] max-w-md mx-auto">
            It looks like you haven&apos;t placed an order yet in this session. Browse our formal wear collections to begin.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider"
          >
            Return to Homepage <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Confirmation Header */}
          <div className="bg-[#F8F6F2] border border-[#EAE5DC] p-7 sm:p-10 text-center space-y-4">
            <CheckCircle2 className="w-11 h-11 text-[#111111] mx-auto" />
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7355]">
                Order Confirmation
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#111111]">
                Thank You for Shopping With Us!
              </h1>
              <p className="text-base text-[#3F3B36]">Your order has been successfully placed.</p>
            </div>

            <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-2 text-xs sm:text-sm font-medium text-[#111111]">
              <span className="px-3.5 py-1.5 bg-white border border-[#D5CEC2] tabular-nums">
                Order ID: <strong>{order.orderId}</strong>
              </span>
              <span className="px-3.5 py-1.5 bg-white border border-[#D5CEC2]">
                Payment Method: <strong>{order.paymentMethod}</strong>
              </span>
            </div>
          </div>

          {/* Transparent Frontend Demo Notice */}
          <div className="flex items-start gap-3 p-4 bg-white border border-[#D5CEC2] text-xs sm:text-sm text-[#524D46]">
            <Info className="w-4 h-4 text-[#8C7355] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#111111]">Frontend Demonstration Notice:</strong> This order confirmation is stored locally in your browser for demonstration purposes. No real shipment or external backend fulfilment request has been triggered.
            </p>
          </div>

          {/* Order & Delivery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#EAE5DC] p-6 space-y-3">
              <h2 className="font-display text-2xl font-semibold text-[#111111] pb-2 border-b border-[#F1EDE6]">
                Delivery Details
              </h2>
              <div className="text-sm text-[#3F3B36] space-y-1">
                <p className="font-semibold text-[#111111]">{order.customer.fullName}</p>
                <p>{order.customer.houseNumber}, {order.customer.streetArea}</p>
                <p>
                  {order.customer.city}, {order.customer.state} –{' '}
                  <span className="tabular-nums">{order.customer.pinCode}</span>
                </p>
                <p className="pt-1 tabular-nums">Mobile: +91 {order.customer.mobileNumber}</p>
                {order.customer.email && <p>Email: {order.customer.email}</p>}
                {order.customer.orderNotes && (
                  <p className="pt-2 text-xs text-[#6B655E]">Note: {order.customer.orderNotes}</p>
                )}
              </div>
            </div>

            <div className="border border-[#EAE5DC] p-6 space-y-3">
              <h2 className="font-display text-2xl font-semibold text-[#111111] pb-2 border-b border-[#F1EDE6]">
                Payment &amp; Dispatch
              </h2>
              <dl className="text-sm space-y-2">
                <div className="flex justify-between">
                  <dt className="text-[#6B655E]">Payment Method</dt>
                  <dd className="font-semibold text-[#111111]">Payment Method: Cash on Delivery</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#6B655E]">Estimated Delivery</dt>
                  <dd className="font-medium text-[#111111] inline-flex items-center gap-1.5">
                    <PackageCheck className="w-4 h-4 text-[#8C7355]" />
                    {order.estimatedDelivery}
                  </dd>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F1EDE6]">
                  <dt className="text-[#6B655E]">Total Payable on Delivery</dt>
                  <dd className="text-lg font-semibold text-[#111111] tabular-nums">
                    {formatINR(order.totalAmount)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Itemized Order Summary */}
          <div className="border border-[#EAE5DC] p-6 space-y-4">
            <h2 className="font-display text-2xl font-semibold text-[#111111]">Order Summary</h2>
            <ul className="divide-y divide-[#F1EDE6]">
              {order.items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}-${item.color.name}`}
                  className="py-3.5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 aspect-[3/4] object-cover object-top bg-[#F8F6F2] border border-[#EAE5DC] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#111111] truncate">{item.name}</p>
                      <p className="text-xs text-[#6B655E]">
                        Size: {item.size} · Colour: {item.color.name} · Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[#111111] tabular-nums shrink-0">
                    {formatINR(item.sellingPrice * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="border-t border-[#EAE5DC] pt-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-[#524D46]">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{formatINR(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between text-[#524D46]">
                <dt>Shipping Charges</dt>
                <dd className="tabular-nums">
                  {order.shippingCharges === 0 ? 'Free' : formatINR(order.shippingCharges)}
                </dd>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#111111] pt-2 border-t border-[#F1EDE6]">
                <dt>Total Payable Amount</dt>
                <dd className="tabular-nums">{formatINR(order.totalAmount)}</dd>
              </div>
            </dl>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2B2824] transition-colors"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
