import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getAdminOrders, updateOrderStatus } from '@/api/orders';
import { STATUS_LABELS } from '@/types/shop';
import type { Order, OrderStatus } from '@/types/shop';

const statusColor: Record<string, string> = {
  en_attente: '#F59E0B',
  confirmee: '#3B82F6',
  en_preparation: '#8B5CF6',
  expediee: '#06B6D4',
  livree: '#10B981',
  annulee: '#EF4444',
};

const ALL_STATUSES = ['en_attente', 'confirmee', 'en_preparation', 'expediee', 'livree', 'annulee'] as OrderStatus[];

const AdminOrders = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['admin-orders', filter],
    queryFn: () => getAdminOrders(filter || undefined),
  });

  const handleStatusChange = async (order: Order, status: string) => {
    setUpdating(order._id);
    try {
      await updateOrderStatus(order._id, status);
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
        Commandes
      </h1>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            filter === '' ? 'text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
          style={filter === '' ? { background: '#1B3A2D' } : {}}
        >
          Toutes ({orders.length})
        </button>
        {ALL_STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
              filter === s ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
            style={filter === s ? { background: statusColor[s] } : {}}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">Chargement...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-gray-400">Aucune commande.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="px-5 py-3 font-semibold">Numéro</th>
                  <th className="px-5 py-3 font-semibold">Client</th>
                  <th className="px-5 py-3 font-semibold">Ville</th>
                  <th className="px-5 py-3 font-semibold">Total</th>
                  <th className="px-5 py-3 font-semibold">Statut</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <>
                    <tr
                      key={order._id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                    >
                      <td className="px-5 py-4 font-semibold text-gray-800">{order.orderNumber}</td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-800">{order.customer.fullName}</p>
                        <p className="text-xs text-gray-400">{order.customer.phone}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{order.customer.city}</td>
                      <td className="px-5 py-4 font-semibold" style={{ color: '#1B3A2D' }}>
                        {order.grandTotalTND.toFixed(2)} TND
                      </td>
                      <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                        <select
                          value={order.status}
                          onChange={e => handleStatusChange(order, e.target.value)}
                          disabled={updating === order._id}
                          className="text-xs font-bold text-white px-2 py-1.5 rounded-lg border-0 cursor-pointer disabled:opacity-50"
                          style={{ background: statusColor[order.status] ?? '#6B7280' }}
                        >
                          {ALL_STATUSES.map(s => (
                            <option key={s} value={s} className="bg-white text-gray-800">
                              {STATUS_LABELS[s]}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-4 text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString('fr-TN')}
                      </td>
                      <td className="px-5 py-4 text-gray-400">
                        {expanded === order._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </td>
                    </tr>
                    {expanded === order._id && (
                      <tr key={`${order._id}-detail`} className="bg-gray-50">
                        <td colSpan={7} className="px-5 py-4">
                          <div className="flex flex-col gap-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Adresse</p>
                                <p className="text-sm text-gray-700">{order.customer.address}, {order.customer.city}</p>
                                {order.customer.notes && (
                                  <p className="text-xs text-gray-500 mt-1">Note: {order.customer.notes}</p>
                                )}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Contact</p>
                                <p className="text-sm text-gray-700">{order.customer.email}</p>
                                <p className="text-sm text-gray-700">{order.customer.phone}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Articles</p>
                              <div className="flex flex-col gap-1">
                                {order.items.map((item, i) => (
                                  <div key={i} className="flex justify-between text-sm bg-white rounded-lg px-3 py-2">
                                    <span className="text-gray-700">
                                      {item.productName} — {item.weightLabel} ×{item.quantity}
                                    </span>
                                    <span className="font-semibold text-gray-800">{item.subtotal.toFixed(2)} TND</span>
                                  </div>
                                ))}
                                <div className="flex justify-between text-sm px-3 py-1 font-bold">
                                  <span className="text-gray-600">Livraison</span>
                                  <span>{order.deliveryFeeTND.toFixed(2)} TND</span>
                                </div>
                                <div className="flex justify-between text-sm px-3 py-1 font-bold" style={{ color: '#1B3A2D' }}>
                                  <span>Total</span>
                                  <span>{order.grandTotalTND.toFixed(2)} TND</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
