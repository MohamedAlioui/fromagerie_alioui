import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Clock, TrendingUp } from 'lucide-react';
import { getAdminOrders } from '@/api/orders';
import { STATUS_LABELS } from '@/types/shop';
import type { Order } from '@/types/shop';

const statusColor: Record<string, string> = {
  en_attente: '#F59E0B',
  confirmee: '#3B82F6',
  en_preparation: '#8B5CF6',
  expediee: '#06B6D4',
  livree: '#10B981',
  annulee: '#EF4444',
};

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) => (
  <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}20` }}>
      <span style={{ color }}>{icon}</span>
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['admin-orders'],
    queryFn: () => getAdminOrders(),
  });

  const today = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
  const pending = orders.filter(o => o.status === 'en_attente');
  const revenue = orders
    .filter(o => o.status === 'livree')
    .reduce((s, o) => s + o.grandTotalTND, 0);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={<ShoppingBag size={22} />} label="Commandes totales" value={orders.length} color="#1B3A2D" />
        <StatCard icon={<Clock size={22} />} label="En attente" value={pending.length} color="#F59E0B" />
        <StatCard icon={<Package size={22} />} label="Aujourd'hui" value={todayOrders.length} color="#3B82F6" />
        <StatCard icon={<TrendingUp size={22} />} label="Revenu livré (TND)" value={revenue.toFixed(2)} color="#10B981" />
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Dernières commandes</h2>
          <Link to="/admin/commandes" className="text-sm font-semibold" style={{ color: '#1B3A2D' }}>
            Voir tout →
          </Link>
        </div>
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">Chargement...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-gray-400">Aucune commande.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="px-6 py-3 font-semibold">Numéro</th>
                  <th className="px-6 py-3 font-semibold">Client</th>
                  <th className="px-6 py-3 font-semibold">Total</th>
                  <th className="px-6 py-3 font-semibold">Statut</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map(order => (
                  <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-gray-600">{order.customer.fullName}</td>
                    <td className="px-6 py-4 font-semibold" style={{ color: '#1B3A2D' }}>
                      {order.grandTotalTND.toFixed(2)} TND
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ background: statusColor[order.status] ?? '#6B7280' }}>
                        {STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('fr-TN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
