import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem, CustomerDetails, OrderRecord, Product, ProductColor } from '../types';
import { calculateShipping } from '../data/products';

const CART_STORAGE_KEY = 'vestora_cart_v1';
const ORDERS_STORAGE_KEY = 'vestora_orders_v1';
const NEWSLETTER_STORAGE_KEY = 'vestora_newsletter_v1';

interface ToastState {
  message: string;
  visible: boolean;
}

interface StoreContextValue {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  shippingCharges: number;
  totalAmount: number;
  orders: OrderRecord[];
  latestOrder: OrderRecord | null;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  accountOpen: boolean;
  setAccountOpen: (open: boolean) => void;
  toast: ToastState;
  showToast: (message: string) => void;
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  updateQuantity: (productId: string, size: string, colorName: string, delta: number) => void;
  removeFromCart: (productId: string, size: string, colorName: string) => void;
  clearCart: () => void;
  placeCodOrder: (customer: CustomerDetails) => OrderRecord;
  newsletterEmail: string | null;
  subscribeNewsletter: (email: string) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function safeReadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => safeReadStorage<CartItem[]>(CART_STORAGE_KEY, []));
  const [orders, setOrders] = useState<OrderRecord[]>(() => safeReadStorage<OrderRecord[]>(ORDERS_STORAGE_KEY, []));
  const [newsletterEmail, setNewsletterEmail] = useState<string | null>(() =>
    safeReadStorage<string | null>(NEWSLETTER_STORAGE_KEY, null)
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore storage quota errors
    }
  }, [orders]);

  useEffect(() => {
    if (!toast.visible) return;
    const timer = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [toast.visible, toast.message]);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
  };

  const addToCart = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.productId === product.id && item.size === size && item.color.name === color.name
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity };
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          image: product.images[0],
          sellingPrice: product.sellingPrice,
          originalPrice: product.originalPrice,
          size,
          color,
          quantity,
          category: product.category,
        },
      ];
    });
    showToast(`Added ${product.name} (Size ${size}) to bag`);
  };

  const updateQuantity = (productId: string, size: string, colorName: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId && item.size === size && item.color.name === colorName) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (productId: string, size: string, colorName: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.size === size && item.color.name === colorName)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.sellingPrice * item.quantity, 0),
    [cart]
  );
  const shippingCharges = useMemo(() => calculateShipping(subtotal), [subtotal]);
  const totalAmount = subtotal + shippingCharges;

  const placeCodOrder = (customer: CustomerDetails): OrderRecord => {
    const randomPart = Math.floor(100000 + Math.random() * 900000);
    const orderId = `VST-2026-${randomPart}`;
    const newOrder: OrderRecord = {
      orderId,
      createdAt: new Date().toISOString(),
      paymentMethod: 'Cash on Delivery',
      estimatedDelivery: '5–7 business days',
      customer,
      items: [...cart],
      subtotal,
      shippingCharges,
      totalAmount,
      isDemoOrder: true,
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const subscribeNewsletter = (email: string) => {
    setNewsletterEmail(email);
    try {
      window.localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(email));
    } catch {
      // ignore
    }
    showToast('Subscribed to VESTORA private updates');
  };

  const latestOrder = orders.length > 0 ? orders[0] : null;

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        shippingCharges,
        totalAmount,
        orders,
        latestOrder,
        searchOpen,
        setSearchOpen,
        accountOpen,
        setAccountOpen,
        toast,
        showToast,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        placeCodOrder,
        newsletterEmail,
        subscribeNewsletter,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
}
