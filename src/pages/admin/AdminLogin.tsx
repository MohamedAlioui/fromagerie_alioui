import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api/admin';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await login(username, password);
      localStorage.setItem('fromagerie_admin_token', token);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all';
  const inputStyle = { background: '#f9fafb', borderColor: '#e5e7eb', color: '#111' };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #1B3A2D 0%, #0E1A15 100%)' }}>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1B3A2D' }}>
            Fromagerie Alioui
          </p>
          <p className="text-sm text-gray-500 mt-1">Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Nom d'utilisateur</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Mot de passe</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              className={inputClass}
              style={inputStyle}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-white transition-all disabled:opacity-60"
            style={{ background: '#1B3A2D' }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
