import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import QuantitySelector from '@/components/shop/QuantitySelector';

const DELIVERY_FEE = 7;
const FREE_DELIVERY_THRESHOLD = 100;

const Panier = () => {
  const { items, removeItem, updateQuantity, totalTND } = useCart();
  const navigate = useNavigate();
  const deliveryFee = totalTND >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const remaining = FREE_DELIVERY_THRESHOLD - totalTND;
  const progress = Math.min((totalTND / FREE_DELIVERY_THRESHOLD) * 100, 100);

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center gap-6"
        style={{ background: 'hsl(var(--background))' }}>
        <span className="text-6xl">🧀</span>
        <h2 className="font-display text-2xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
          Votre panier est vide
        </h2>
        <Link to="/nos-fromages"
          className="px-8 py-3 rounded-full font-bold transition-all"
          style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
          Découvrir nos fromages
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20" style={{ background: 'hsl(var(--background))' }}>
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-4xl font-bold mb-10"
          style={{ color: 'hsl(var(--foreground))' }}
        >
          Mon Panier
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map(item => (
              <motion.div
                key={`${item.productId}-${item.weightLabel}-${item.flavorLabel}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4 p-4 rounded-2xl"
                style={{ background: 'hsl(var(--card))', boxShadow: 'var(--card-shadow)' }}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={`/uploads/${item.image}`} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl"
                      style={{ background: 'hsl(var(--muted))' }}>🧀</div>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{item.productName}</p>
                      <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {item.weightLabel}{item.flavorLabel ? ` · ${item.flavorLabel}` : ''}
                      </p>
                    </div>
                    <button onClick={() => removeItem(item.productId, item.weightLabel, item.flavorLabel)}
                      className="p-1 hover:opacity-70 transition-opacity">
                      <Trash2 size={16} style={{ color: 'hsl(var(--destructive))' }} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={v => updateQuantity(item.productId, item.weightLabel, item.flavorLabel, v)}
                    />
                    <span className="font-bold" style={{ color: 'hsl(var(--primary))' }}>
                      {(item.priceInTND * item.quantity).toFixed(2)} TND
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl h-fit flex flex-col gap-4"
            style={{ background: 'hsl(var(--card))', boxShadow: 'var(--card-shadow)' }}
          >
            <h2 className="font-display text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              Résumé
            </h2>
            {/* Free delivery progress */}
            <div className="rounded-xl p-3 flex flex-col gap-2"
              style={{ background: deliveryFee === 0 ? '#f0fdf4' : 'hsl(var(--muted))', border: deliveryFee === 0 ? '1px solid #bbf7d0' : '1px solid transparent' }}>
              {deliveryFee === 0 ? (
                <p className="text-sm font-bold text-emerald-700 text-center">🎉 Livraison gratuite !</p>
              ) : (
                <>
                  <p className="text-xs font-semibold" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Plus que <span className="font-bold" style={{ color: 'hsl(var(--primary))' }}>{remaining.toFixed(2)} TND</span> pour la livraison gratuite
                  </p>
                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: '#1B3A2D' }} />
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: 'hsl(var(--muted-foreground))' }}>Sous-total</span>
                <span style={{ color: 'hsl(var(--foreground))' }}>{totalTND.toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'hsl(var(--muted-foreground))' }}>Livraison</span>
                {deliveryFee === 0 ? (
                  <span className="font-bold text-emerald-600">Gratuite</span>
                ) : (
                  <span style={{ color: 'hsl(var(--foreground))' }}>{deliveryFee.toFixed(2)} TND</span>
                )}
              </div>
              <div className="border-t pt-2 mt-1 flex justify-between font-bold text-lg"
                style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
                <span>Total</span>
                <span style={{ color: 'hsl(var(--primary))' }}>{(totalTND + deliveryFee).toFixed(2)} TND</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/commande')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-bold transition-all"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              <ShoppingBag size={18} />
              Passer la commande
            </button>
            <Link to="/nos-fromages"
              className="text-center text-sm hover:opacity-70 transition-opacity"
              style={{ color: 'hsl(var(--muted-foreground))' }}>
              ← Continuer mes achats
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Panier;
