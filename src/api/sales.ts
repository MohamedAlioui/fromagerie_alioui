import { get, post, patch, del } from './client';

export interface SaleItem {
  productName: string;
  qty: number;
  price: number;
  subtotal: number;
}

export interface Sale {
  _id: string;
  date: string;
  clientName: string;
  items: SaleItem[];
  total: number;
  notes: string;
  paid: boolean;
  createdAt: string;
}

export interface Expense {
  _id: string;
  date: string;
  label: string;
  amount: number;
  createdAt: string;
}

export const getSales = (date: string) => get<Sale[]>(`/sales?date=${date}`);
export const createSale = (data: Omit<Sale, '_id' | 'createdAt' | 'total' | 'paid'> & { items: Omit<SaleItem, 'subtotal'>[]; customTotal?: number }) =>
  post<Sale>('/sales', data);
export const toggleSalePaid = (id: string) => patch<Sale>(`/sales/${id}/paid`, {});
export const deleteSale = (id: string) => del<{ success: boolean }>(`/sales/${id}`);

export const getExpenses = (date: string) => get<Expense[]>(`/sales/expenses?date=${date}`);
export const createExpense = (data: { date: string; label: string; amount: number }) =>
  post<Expense>('/sales/expenses', data);
export const deleteExpense = (id: string) => del<{ success: boolean }>(`/sales/expenses/${id}`);
