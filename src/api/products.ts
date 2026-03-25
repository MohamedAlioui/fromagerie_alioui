import { get, del, postForm, putForm } from './client';
import type { Product } from '@/types/shop';

export const getProducts = () => get<Product[]>('/products');
export const getProduct = (slug: string) => get<Product>(`/products/${slug}`);
export const getAdminProducts = () => get<Product[]>('/products/admin');
export const createProduct = (formData: FormData) => postForm<Product>('/products', formData);
export const updateProduct = (id: string, formData: FormData) => putForm<Product>(`/products/${id}`, formData);
export const deleteProduct = (id: string) => del(`/products/${id}`);
