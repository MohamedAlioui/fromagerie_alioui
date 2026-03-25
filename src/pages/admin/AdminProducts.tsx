import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { getAdminProducts, deleteProduct, updateProduct } from '@/api/products';
import type { Product } from '@/types/shop';

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const [deleting, setDeleting] = useState<string | null>(null);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['admin-products'],
    queryFn: getAdminProducts,
  });

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Désactiver "${product.name}" ?`)) return;
    setDeleting(product._id);
    try {
      await deleteProduct(product._id);
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setDeleting(null);
    }
  };

  const handleToggle = async (product: Product) => {
    const fd = new FormData();
    fd.append('isAvailable', String(!product.isAvailable));
    try {
      await updateProduct(product._id, fd);
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
          Produits
        </h1>
        <Link
          to="/admin/produits/nouveau"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ background: '#1B3A2D' }}
        >
          <Plus size={16} /> Nouveau produit
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">Chargement...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-400">Aucun produit.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="px-6 py-3 font-semibold">Image</th>
                  <th className="px-6 py-3 font-semibold">Nom</th>
                  <th className="px-6 py-3 font-semibold">Options de poids</th>
                  <th className="px-6 py-3 font-semibold">Disponible</th>
                  <th className="px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                        {product.image
                          ? <img src={`/uploads/${product.image}`} alt={product.name} className="w-full h-full object-cover" />
                          : <span className="text-2xl">🧀</span>
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {product.tags.slice(0, 3).map(t => (
                          <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {product.weightOptions.map(w => (
                          <span key={w.label} className="text-xs text-gray-600">
                            {w.label} — <strong>{w.priceInTND.toFixed(2)} TND</strong>
                            <span className="text-gray-400 ml-1">(stock: {w.stock})</span>
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleToggle(product)} className="transition-opacity hover:opacity-70">
                        {product.isAvailable
                          ? <ToggleRight size={24} style={{ color: '#10B981' }} />
                          : <ToggleLeft size={24} className="text-gray-400" />
                        }
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/produits/${product._id}`}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Modifier"
                        >
                          <Pencil size={16} style={{ color: '#3B82F6' }} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product)}
                          disabled={deleting === product._id}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-40"
                          title="Désactiver"
                        >
                          <Trash2 size={16} style={{ color: '#EF4444' }} />
                        </button>
                      </div>
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

export default AdminProducts;
