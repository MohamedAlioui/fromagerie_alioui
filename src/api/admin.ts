import { post, get, put, del } from './client';
import type { AdminUser } from '@/types/shop';

export const login = (username: string, password: string) =>
  post<{ token: string; role: string; username: string }>('/admin/login', { username, password });

export const getMe = () =>
  get<{ id: string; username: string; role: string }>('/admin/me');

// User management
export const getUsers = () => get<AdminUser[]>('/admin/users');

export const createUser = (data: { username: string; email: string; password: string; role: 'admin' | 'commercial' }) =>
  post<AdminUser>('/admin/users', data);

export const updateUser = (id: string, data: { username?: string; email?: string; role?: string; password?: string }) =>
  put<AdminUser>(`/admin/users/${id}`, data);

export const deleteUser = (id: string) => del<{ success: boolean }>(`/admin/users/${id}`);
