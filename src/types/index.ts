export type GenderCategory = 'men' | 'women';

export type ProductCategory =
  | 'Formal Shirts'
  | 'Formal Trousers'
  | 'Formal Blazers'
  | 'Formal Waistcoats'
  | 'Formal Co-ord Sets';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  gender: GenderCategory;
  category: ProductCategory;
  images: string[];
  altText: string;
  description: string;
  sellingPrice: number;
  originalPrice: number;
  discountPercent: number;
  sizes: string[];
  colors: ProductColor[];
  inStock: boolean;
  stockNote: string;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  popularityScore: number;
  specs: {
    fabric: string;
    fit: string;
    pattern: string;
    care: string;
    origin: string;
  };
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  sellingPrice: number;
  originalPrice: number;
  size: string;
  color: ProductColor;
  quantity: number;
  category: ProductCategory;
}

export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
  email: string;
  houseNumber: string;
  streetArea: string;
  city: string;
  state: string;
  pinCode: string;
  orderNotes: string;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  paymentMethod: 'Cash on Delivery';
  estimatedDelivery: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  shippingCharges: number;
  totalAmount: number;
  isDemoOrder: true;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
