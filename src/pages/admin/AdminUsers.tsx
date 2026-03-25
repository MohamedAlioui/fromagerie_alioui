import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, X, Shield, Briefcase } from 'lucide-react';
import { getUsers, createUser, updateUser, deleteUser } from '@/api/admin';
import { getTokenPayload } from '@/lib/auth';
import type { AdminUser } from '@/types/shop';

const ROLE_BADGE: Record<string, { label: string; color: string }> = {
  admin:      { label: 'Admin',      color: 'bg-emerald-100 text-emerald-800' },
  commercial: { label: 'Commercial', color: 'bg-blue-100 text-blue-800' },
};

interface UserFormProps {
  initial?: AdminUser | null;
  onClose: () => void;
}

const UserForm = ({ initial, onClose }: UserFormProps) => {
  const qc = useQueryClient();
  const isEdit = !!initial;
  const [form, setForm] = useState({
    username: initial?.username ?? '',
    email: initial?.email ?? '',
    role: (initial?.role ?? 'commercial') as 'admin' | 'commercial',
    password: '',
  });
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: () =>
      isEdit
        ? updateUser(initial!._id, { ...form, password: form.password || undefined })
        : createUser(form),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-users'] }); onClose(); },
    onError: (e: Error) => setError(e.message),
  });

  const field = (label: string, key: keyof typeof form, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-semibold mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        value={form[key] as string}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            {isEdit ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
          </h2>
          <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
        </div>

        {field('Nom d\'utilisateur', 'username', 'text', 'ex: commercial1')}
        {field('Email', 'email', 'email', 'ex: user@fromagerie.tn')}

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Mot de passe {isEdit && '(laisser vide = inchangé)'}</label>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            placeholder={isEdit ? '••••••••' : 'Mot de passe'}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Rôle</label>
          <div className="flex gap-3">
            {(['admin', 'commercial'] as const).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setForm(f => ({ ...f, role: r }))}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                  form.role === r
                    ? r === 'admin'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {r === 'admin' ? <Shield size={15} /> : <Briefcase size={15} />}
                {r === 'admin' ? 'Admin' : 'Commercial'}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {form.role === 'admin'
              ? 'Accès complet : produits, commandes, utilisateurs'
              : 'Accès limité : commandes uniquement'}
          </p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 mt-1">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-colors disabled:opacity-60"
            style={{ background: '#1B3A2D' }}
          >
            {mutation.isPending ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer'}
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminUsers = () => {
  const qc = useQueryClient();
  const { data: users, isLoading } = useQuery({ queryKey: ['admin-users'], queryFn: getUsers });
  const [editing, setEditing] = useState<AdminUser | null | undefined>(undefined);
  const me = getTokenPayload();

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const handleDelete = (user: AdminUser) => {
    if (!confirm(`Supprimer "${user.username}" ?`)) return;
    deleteMutation.mutate(user._id);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Utilisateurs</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gérez les accès à l'administration</p>
        </div>
        <button
          onClick={() => setEditing(null)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: '#1B3A2D' }}
        >
          <Plus size={16} /> Nouvel utilisateur
        </button>
      </div>

      {/* Role legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 flex items-start gap-3">
          <Shield size={20} className="text-emerald-700 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold text-emerald-800 text-sm">Admin</p>
            <p className="text-xs text-emerald-600 mt-0.5">Accès complet : produits, commandes, utilisateurs</p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50 flex items-start gap-3">
          <Briefcase size={20} className="text-blue-700 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold text-blue-800 text-sm">Commercial</p>
            <p className="text-xs text-blue-600 mt-0.5">Accès limité : consultation et gestion des commandes uniquement</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 font-semibold text-gray-500">Utilisateur</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500">Email</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500">Rôle</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500">Créé le</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {users?.map(user => (
                <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-gray-800">
                    {user.username}
                    {user._id === me?.id && (
                      <span className="ml-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">vous</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{user.email || '—'}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${ROLE_BADGE[user.role].color}`}>
                      {user.role === 'admin' ? <Shield size={11} /> : <Briefcase size={11} />}
                      {ROLE_BADGE[user.role].label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => setEditing(user)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                        <Pencil size={15} />
                      </button>
                      {user._id !== me?.id && (
                        <button onClick={() => handleDelete(user)}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-red-400">
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {editing !== undefined && (
        <UserForm initial={editing} onClose={() => setEditing(undefined)} />
      )}
    </div>
  );
};

export default AdminUsers;
