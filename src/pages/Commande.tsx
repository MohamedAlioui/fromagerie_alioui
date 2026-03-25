import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/api/orders';
import type { Customer } from '@/types/shop';

const DELIVERY_FEE = 7;

const schema = z.object({
  fullName: z.string().min(3, 'Nom complet requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Téléphone invalide').max(15),
  address: z.string().min(5, 'Adresse requise'),
  city: z.string().min(2, 'Ville requise'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const Commande = () => {
  const { items, totalTND, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (items.length === 0) return <Navigate to="/nos-fromages" replace />;

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setServerError('');
    try {
      const res = await createOrder({
        customer: { ...data, notes: data.notes ?? '' } as Customer,
        items: items.map(i => ({
          productId: i.productId,
          productName: i.productName,
          weightLabel: i.weightLabel,
          flavorLabel: i.flavorLabel,
          quantity: i.quantity,
        })),
        deliveryFeeTND: DELIVERY_FEE,
      });
      clearCart();
      navigate(`/confirmation/${res.orderNumber}`, { state: res });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Erreur lors de la commande');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all';
  const inputStyle = { background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' };
  const labelClass = 'block text-sm font-semibold mb-1';
  const labelStyle = { color: 'hsl(var(--foreground))' };

  return (
    <div className="min-h-screen pt-28 pb-20" style={{ background: 'hsl(var(--background))' }}>
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-4xl font-bold mb-10"
          style={{ color: 'hsl(var(--foreground))' }}
        >
          Finaliser la Commande
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 flex flex-col gap-5">
            <div className="p-6 rounded-2xl flex flex-col gap-4"
              style={{ background: 'hsl(var(--card))', boxShadow: 'var(--card-shadow)' }}>
              <h2 className="font-display text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                Vos informations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} style={labelStyle}>Prénom et Nom *</label>
                  <input {...register('fullName')} className={inputClass} style={inputStyle} placeholder="Mohamed Alioui" />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Email *</label>
                  <input {...register('email')} type="email" className={inputClass} style={inputStyle} placeholder="exemple@email.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Téléphone *</label>
                  <input {...register('phone')} className={inputClass} style={inputStyle} placeholder="55 123 456" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Ville *</label>
                  <input {...register('city')} className={inputClass} style={inputStyle} placeholder="Bizerte" />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass} style={labelStyle}>Adresse *</label>
                  <input {...register('address')} className={inputClass} style={inputStyle} placeholder="Rue, N°, Quartier" />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass} style={labelStyle}>Notes de livraison (optionnel)</label>
                  <textarea {...register('notes')} rows={3} className={inputClass} style={inputStyle}
                    placeholder="Instructions particulières pour la livraison..." />
                </div>
              </div>
            </div>

            {serverError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="text-red-600 text-sm">{serverError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="py-4 rounded-full font-bold text-lg transition-all disabled:opacity-60"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              {submitting ? 'Confirmation en cours...' : 'Confirmer la Commande'}
            </button>
          </form>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl h-fit flex flex-col gap-4"
            style={{ background: 'hsl(var(--card))', boxShadow: 'var(--card-shadow)' }}
          >
            <h2 className="font-display text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              Votre commande
            </h2>
            <div className="flex flex-col gap-3">
              {items.map(item => (
                <div key={`${item.productId}-${item.weightLabel}-${item.flavorLabel}`} className="flex justify-between text-sm">
                  <span style={{ color: 'hsl(var(--foreground))' }}>
                    {item.productName} <span style={{ color: 'hsl(var(--muted-foreground))' }}>×{item.quantity}</span>
                    <br /><span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {item.weightLabel}{item.flavorLabel ? ` · ${item.flavorLabel}` : ''}
                    </span>
                  </span>
                  <span className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                    {(item.priceInTND * item.quantity).toFixed(2)} TND
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 flex flex-col gap-2" style={{ borderColor: 'hsl(var(--border))' }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'hsl(var(--muted-foreground))' }}>Sous-total</span>
                <span style={{ color: 'hsl(var(--foreground))' }}>{totalTND.toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'hsl(var(--muted-foreground))' }}>Livraison</span>
                <span style={{ color: 'hsl(var(--foreground))' }}>{DELIVERY_FEE.toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span style={{ color: 'hsl(var(--foreground))' }}>Total</span>
                <span style={{ color: 'hsl(var(--primary))' }}>{(totalTND + DELIVERY_FEE).toFixed(2)} TND</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Commande;
