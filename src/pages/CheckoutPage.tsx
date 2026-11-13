import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/products';
import { CustomerDetails } from '../types';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CheckoutForm } from '../components/CheckoutForm';
import { CartSummary } from '../components/CartSummary';

export function CheckoutPage() {
  const { cart, cartCount, subtotal, shippingCharges, totalAmount, placeCodOrder } = useStore();
  const navigate = useNavigate();

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shopping Cart', href: '/cart' },
    { label: 'Checkout' },
  ];

  const handleOrderSubmit = (customerDetails: CustomerDetails) => {
    const createdOrder = placeCodOrder(customerDetails);
    navigate('/thank-you', { state: { orderId: createdOrder.orderId } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SeoHead
        title="Checkout – Cash on Delivery | VESTORA"
        description="Complete your VESTORA formal wear order securely with Cash on Delivery across India."
        path="/checkout"
        breadcrumbs={breadcrumbs}
        noindex
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="pb-6 mb-8 border-b border-[#EAE5DC]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">
          Cash on Delivery Checkout
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#111111] mt-1">
          Complete Your Order
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="py-16 px-6 bg-[#F8F6F2] border border-[#EAE5DC] text-center max-w-2xl mx-auto space-y-5">
          <ShoppingBag className="w-10 h-10 text-[#8C7355] mx-auto" />
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-semibold text-[#111111]">
              No Items in Your Bag
            </h2>
            <p className="text-sm text-[#524D46]">
              Add formal wear items to your shopping bag before proceeding to checkout.
            </p>
          </div>
          <Link
            to="/mens-formal-wear"
            className="inline-block px-6 py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2B2824]"
          >
            Browse Formal Wear
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Customer Details & COD Form */}
          <div className="lg:col-span-7">
            <CheckoutForm onSubmitOrder={handleOrderSubmit} />
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:col-span-5">
            <div className="bg-[#F8F6F2] border border-[#EAE5DC] p-6 space-y-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between pb-3 border-b border-[#E0D9CD]">
                <h2 className="font-display text-2xl font-semibold text-[#111111]">Order Summary</h2>
                <Link to="/cart" className="text-xs text-[#111111] underline underline-offset-4">
                  Edit Bag
                </Link>
              </div>

              <ul className="divide-y divide-[#EAE5DC] max-h-[340px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <li
                    key={`${item.productId}-${item.size}-${item.color.name}`}
                    className="py-3.5 flex items-start gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-14 aspect-[3/4] object-cover object-top bg-white border border-[#EAE5DC] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#111111] truncate">{item.name}</p>
                      <p className="text-xs text-[#6B655E] mt-0.5">
                        Size {item.size} · {item.color.name} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-[#111111] tabular-nums shrink-0">
                      {formatINR(item.sellingPrice * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <CartSummary
                subtotal={subtotal}
                shippingCharges={shippingCharges}
                totalAmount={totalAmount}
                itemCount={cartCount}
              />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
