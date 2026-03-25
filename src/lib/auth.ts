export interface TokenPayload {
  id: string;
  username: string;
  role: 'admin' | 'commercial';
  exp: number;
}

export function getTokenPayload(): TokenPayload | null {
  try {
    const token = localStorage.getItem('fromagerie_admin_token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) return null;
    return payload as TokenPayload;
  } catch {
    return null;
  }
}

export function getCurrentRole(): 'admin' | 'commercial' | null {
  return getTokenPayload()?.role ?? null;
}
