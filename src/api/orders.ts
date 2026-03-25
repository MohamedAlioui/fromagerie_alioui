import { get, post, patch } from './client';
import type { Order, Customer, CartItem } from '@/types/shop';

interface CreateOrderPayload {
  customer: Customer;
  items: Array<Pick<CartItem, 'productId' | 'productName' | 'weightLabel' | 'quantity'>>;
  deliveryFeeTND?: number;
}

export interface CreateOrderResponse {
  orderNumber: string;
  grandTotalTND: number;
  items: Order['items'];
  customer: { fullName: string; email: string };
}

export const createOrder = (payload: CreateOrderPayload) =>
  post<CreateOrderResponse>('/orders', payload);

export const trackByPhone = (phone: string) =>
  get<Partial<Order>[]>(`/orders/track?phone=${encodeURIComponent(phone)}`);

export const getAdminOrders = (status?: string) =>
  get<Order[]>(`/orders${status ? `?status=${status}` : ''}`);

export const getAdminOrder = (id: string) => get<Order>(`/orders/${id}`);

export const updateOrderStatus = (id: string, status: string) =>
  patch<Order>(`/orders/${id}/status`, { status });
