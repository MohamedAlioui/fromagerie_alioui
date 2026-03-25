export interface WeightOption {
  _id?: string;
  label: string;
  priceInTND: number;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  origin: string;
  pairing: string;
  notes: string;
  tags: string[];
  image: string;
  weightOptions: WeightOption[];
  flavorOptions: string[];
  isAvailable: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  slug: string;
  image: string;
  weightLabel: string;
  flavorLabel: string;
  priceInTND: number;
  quantity: number;
}

export interface Customer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  weightLabel: string;
  flavorLabel: string;
  priceInTND: number;
  quantity: number;
  subtotal: number;
}

export type OrderStatus =
  | 'en_attente'
  | 'confirmee'
  | 'en_preparation'
  | 'expediee'
  | 'livree'
  | 'annulee';

export interface Order {
  _id: string;
  orderNumber: string;
  status: OrderStatus;
  customer: Customer;
  items: OrderItem[];
  totalTND: number;
  deliveryFeeTND: number;
  grandTotalTND: number;
  createdAt: string;
}

export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'commercial';
  createdAt: string;
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  en_attente: 'En attente',
  confirmee: 'Confirmée',
  en_preparation: 'En préparation',
  expediee: 'Expédiée',
  livree: 'Livrée',
  annulee: 'Annulée',
};

export const STATUS_STEPS: OrderStatus[] = [
  'en_attente',
  'confirmee',
  'en_preparation',
  'expediee',
  'livree',
];
