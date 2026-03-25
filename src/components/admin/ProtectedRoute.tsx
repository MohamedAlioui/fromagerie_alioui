import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getMe } from '@/api/admin';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<'loading' | 'ok' | 'fail'>('loading');

  useEffect(() => {
    const token = localStorage.getItem('fromagerie_admin_token');
    if (!token) { setStatus('fail'); return; }
    getMe()
      .then(() => setStatus('ok'))
      .catch(() => setStatus('fail'));
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (status === 'fail') return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
