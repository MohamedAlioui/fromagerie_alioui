import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Clock, CheckCircle, Package, Truck, Home, XCircle } from 'lucide-react';
import { trackOrder } from '@/api/orders';
import type { OrderStatus } from '@/types/shop';
import { STATUS_STEPS, STATUS_LABELS } from '@/types/shop';

const STEP_ICONS: Record<string, React.ReactNode> = {
  en_attente:    <Clock size={20} />,
  confirmee:     <CheckCircle size={20} />,
  en_preparation:<Package size={20} />,
  expediee:      <Truck size={20} />,
  livree:        <Home size={20} />,
};

const SuivreCommande = () => {
  const [searchParams] = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get('orderNumber') ?? '');
  const [email, setEmail] = useState(searchParams.get('email') ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState<Partial<import('@/types/shop').Order> | null>(null);

  // Auto-submit if params are pre-filled
  useEffect(() => {
    if (orderNumber && email) handleSearch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = async () => {
    if (!orderNumber.trim() || !email.trim()) {
      setError('Veuillez remplir le numéro de commande et l\'email.');
      return;
    }
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const data = await trackOrder(orderNumber.trim(), email.trim());
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Commande introuvable.');
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = order?.status
    ? STATUS_STEPS.indexOf(order.status as OrderStatus)
    : -1;
  const isCancelled = order?.status === 'annulee';

  const inputClass = 'w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all';
  const inputStyle = { background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' };

  return (
    <div className="min-h-screen pt-28 pb-20" style={{ background: 'hsl(var(--background))' }}>
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2 text-center"
            style={{ color: 'hsl(var(--foreground))' }}>
            Suivre ma commande
          </h1>
          <p className="text-center mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Entrez votre numéro de commande et l'email utilisé lors de l'achat.
          </p>

          {/* Search form */}
          <div className="p-6 rounded-2xl flex flex-col gap-4 mb-8"
            style={{ background: 'hsl(var(--card))', boxShadow: 'var(--card-shadow)' }}>
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'hsl(var(--foreground))' }}>
                Numéro de commande
              </label>
              <input
                value={orderNumber}
                onChange={e => setOrderNumber(e.target.value)}
                className={inputClass}
                style={inputStyle}
                placeholder="FA-2026-00001"
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'hsl(var(--foreground))' }}>
                Adresse email
              </label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                className={inputClass}
                style={inputStyle}
                placeholder="votre@email.com"
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleSearch}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-3 rounded-full font-bold transition-all disabled:opacity-60"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              <Search size={16} />
              {loading ? 'Recherche...' : 'Rechercher'}
            </button>
          </div>

          {/* Results */}
          {order && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              {/* Status stepper or cancelled */}
              {isCancelled ? (
                <div className="flex items-center gap-3 p-5 rounded-2xl"
                  style={{ background: 'hsl(var(--destructive) / 0.1)', border: '1px solid hsl(var(--destructive))' }}>
                  <XCircle size={28} style={{ color: 'hsl(var(--destructive))' }} />
                  <div>
                    <p className="font-bold" style={{ color: 'hsl(var(--destructive))' }}>Commande annulée</p>
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Contactez-nous pour plus d'informations.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl" style={{ background: 'hsl(var(--card))', boxShadow: 'var(--card-shadow)' }}>
                  <p className="text-sm font-bold uppercase tracking-wider mb-5"
                    style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Statut de votre commande
                  </p>
                  <div className="relative flex justify-between">
                    {/* Progress line */}
                    <div className="absolute top-5 left-0 right-0 h-1 rounded-full"
                      style={{ background: 'hsl(var(--muted))' }} />
                    <div
                      className="absolute top-5 left-0 h-1 rounded-full transition-all duration-700"
                      style={{
                        background: 'hsl(var(--primary))',
                        width: currentStepIndex >= 0
                          ? `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%`
                          : '0%',
                      }}
                    />
                    {STATUS_STEPS.map((step, i) => {
                      const done = i <= currentStepIndex;
                      return (
                        <div key={step} className="relative flex flex-col items-center gap-2 z-10">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                            style={{
                              background: done ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                              borderColor: done ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                              color: done ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
                            }}
                          >
                            {STEP_ICONS[step]}
                          </div>
                          <span className="text-xs font-semibold text-center max-w-[60px] leading-tight"
                            style={{ color: done ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }}>
                            {STATUS_LABELS[step]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Order info */}
              <div className="p-6 rounded-2xl flex flex-col gap-3"
                style={{ background: 'hsl(var(--card))', boxShadow: 'var(--card-shadow)' }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'hsl(var(--muted-foreground))' }}>Numéro</span>
                  <span className="font-bold" style={{ color: 'hsl(var(--foreground))' }}>{order.orderNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'hsl(var(--muted-foreground))' }}>Client</span>
                  <span style={{ color: 'hsl(var(--foreground))' }}>{order.customer?.fullName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'hsl(var(--muted-foreground))' }}>Ville</span>
                  <span style={{ color: 'hsl(var(--foreground))' }}>{order.customer?.city}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'hsl(var(--muted-foreground))' }}>Date</span>
                  <span style={{ color: 'hsl(var(--foreground))' }}>
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('fr-TN') : '—'}
                  </span>
                </div>
                <div className="border-t pt-3 flex flex-col gap-2" style={{ borderColor: 'hsl(var(--border))' }}>
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span style={{ color: 'hsl(var(--foreground))' }}>
                        {item.productName} — {item.weightLabel} ×{item.quantity}
                      </span>
                      <span style={{ color: 'hsl(var(--foreground))' }}>{item.subtotal.toFixed(2)} TND</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-base mt-1">
                    <span style={{ color: 'hsl(var(--foreground))' }}>Total</span>
                    <span style={{ color: 'hsl(var(--primary))' }}>{order.grandTotalTND?.toFixed(2)} TND</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SuivreCommande;
