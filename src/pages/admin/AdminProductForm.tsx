import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { getAdminProducts, createProduct, updateProduct } from '@/api/products';
import type { WeightOption } from '@/types/shop';

const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 bg-white';

const AdminProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id && id !== 'nouveau';
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: products } = useQuery({
    queryKey: ['admin-products'],
    queryFn: getAdminProducts,
    enabled: isEdit,
  });

  const existing = isEdit ? products?.find(p => p._id === id) : null;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState('');
  const [pairing, setPairing] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [weightOptions, setWeightOptions] = useState<Omit<WeightOption, '_id'>[]>([
    { label: '', priceInTND: 0, stock: 0 },
  ]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (existing) {
      setName(existing.name);
      setDescription(existing.description);
      setOrigin(existing.origin);
      setPairing(existing.pairing);
      setNotes(existing.notes);
      setTags(existing.tags.join(', '));
      setIsAvailable(existing.isAvailable);
      setWeightOptions(existing.weightOptions.map(w => ({ label: w.label, priceInTND: w.priceInTND, stock: w.stock })));
      if (existing.image) setImagePreview(`/uploads/${existing.image}`);
    }
  }, [existing]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const addWeightOption = () =>
    setWeightOptions(prev => [...prev, { label: '', priceInTND: 0, stock: 0 }]);

  const removeWeightOption = (i: number) =>
    setWeightOptions(prev => prev.filter((_, idx) => idx !== i));

  const updateWeightOption = (i: number, field: keyof Omit<WeightOption, '_id'>, value: string | number) =>
    setWeightOptions(prev => prev.map((w, idx) => idx === i ? { ...w, [field]: value } : w));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('name', name);
      fd.append('description', description);
      fd.append('origin', origin);
      fd.append('pairing', pairing);
      fd.append('notes', notes);
      fd.append('tags', tags);
      fd.append('isAvailable', String(isAvailable));
      fd.append('weightOptions', JSON.stringify(weightOptions));
      if (imageFile) fd.append('image', imageFile);

      if (isEdit && id) {
        await updateProduct(id, fd);
      } else {
        await createProduct(fd);
      }
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      navigate('/admin/produits');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/admin/produits')}
          className="p-2 rounded-xl hover:bg-gray-200 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
          {isEdit ? 'Modifier le produit' : 'Nouveau produit'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">
        {/* Image */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Image</label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
              {imagePreview
                ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                : <span className="text-3xl">🧀</span>
              }
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange}
              className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
          </div>
        </div>

        {/* Basic info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Nom *</label>
            <input value={name} onChange={e => setName(e.target.value)} className={inputClass} required placeholder="Mozzarella Artisanale" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              rows={3} className={inputClass} placeholder="Description du produit..." />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Origine</label>
            <input value={origin} onChange={e => setOrigin(e.target.value)} className={inputClass} placeholder="Utique, Bizerte" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Accord mets</label>
            <input value={pairing} onChange={e => setPairing(e.target.value)} className={inputClass} placeholder="Tomates, basilic..." />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Notes de dégustation</label>
            <input value={notes} onChange={e => setNotes(e.target.value)} className={inputClass} placeholder="Douce, crémeuse..." />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Tags (séparés par virgule)</label>
            <input value={tags} onChange={e => setTags(e.target.value)} className={inputClass} placeholder="Frais, Artisanal, Vache" />
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-3">
          <input type="checkbox" id="available" checked={isAvailable} onChange={e => setIsAvailable(e.target.checked)}
            className="w-4 h-4 rounded" />
          <label htmlFor="available" className="text-sm font-semibold text-gray-700">Disponible à la vente</label>
        </div>

        {/* Weight options */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">Options de poids *</label>
            <button type="button" onClick={addWeightOption}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg text-white"
              style={{ background: '#1B3A2D' }}>
              <Plus size={12} /> Ajouter
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {weightOptions.map((w, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input value={w.label} onChange={e => updateWeightOption(i, 'label', e.target.value)}
                  className={inputClass} placeholder="250g" />
                <input value={w.priceInTND || ''} onChange={e => updateWeightOption(i, 'priceInTND', parseFloat(e.target.value) || 0)}
                  type="number" step="0.01" className={inputClass} placeholder="Prix TND" />
                <input value={w.stock || ''} onChange={e => updateWeightOption(i, 'stock', parseInt(e.target.value) || 0)}
                  type="number" className={inputClass} placeholder="Stock" />
                <button type="button" onClick={() => removeWeightOption(i)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0">
                  <Trash2 size={14} style={{ color: '#EF4444' }} />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1">Poids — Prix (TND) — Stock</p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="flex-1 py-3 rounded-xl font-bold text-white transition-all disabled:opacity-60"
            style={{ background: '#1B3A2D' }}>
            {saving ? 'Sauvegarde...' : isEdit ? 'Mettre à jour' : 'Créer le produit'}
          </button>
          <button type="button" onClick={() => navigate('/admin/produits')}
            className="px-6 py-3 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
