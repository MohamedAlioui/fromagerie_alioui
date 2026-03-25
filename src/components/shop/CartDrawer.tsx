import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import QuantitySelector from './QuantitySelector';

interface Props {
  open: boolean;
  onClose: () => void;
}

const FREE_DELIVERY_THRESHOLD = 100;
const BASE_DELIVERY_FEE = 7;

const CartDrawer = ({ open, onClose }: Props) => {
  const { items, removeItem, updateQuantity, totalItems, totalTND } = useCart();
  const deliveryFee = totalTND >= FREE_DELIVERY_THRESHOLD ? 0 : BASE_DELIVERY_FEE;
  const remaining = FREE_DELIVERY_THRESHOLD - totalTND;
  const progress = Math.min((totalTND / FREE_DELIVERY_THRESHOLD) * 100, 100);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'hsl(var(--card))' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} style={{ color: 'hsl(var(--primary))' }} />
            <h2 className="font-display text-xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Mon Panier
            </h2>
            {totalItems > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-1 hover:opacity-70 transition-opacity">
            <X size={22} style={{ color: 'hsl(var(--foreground))' }} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-16">
              <span className="text-5xl">🧀</span>
              <p className="text-center" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Votre panier est vide
              </p>
              <Link
                to="/nos-fromages"
                onClick={onClose}
                className="px-6 py-2 rounded-full text-sm font-semibold transition-all"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
              >
                Découvrir nos fromages
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div
                key={`${item.productId}-${item.weightLabel}-${item.flavorLabel}`}
                className="flex gap-3 p-3 rounded-xl"
                style={{ background: 'hsl(var(--muted))' }}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={`/uploads/${item.image}`} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl"
                      style={{ background: 'hsl(var(--border))' }}>🧀</div>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>
                    {item.productName}
                  </p>
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {item.weightLabel}{item.flavorLabel ? ` · ${item.flavorLabel}` : ''} — {item.priceInTND.toFixed(2)} TND
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={v => updateQuantity(item.productId, item.weightLabel, item.flavorLabel, v)}
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm" style={{ color: 'hsl(var(--primary))' }}>
                        {(item.priceInTND * item.quantity).toFixed(2)} TND
                      </span>
                      <button
                        onClick={() => removeItem(item.productId, item.weightLabel, item.flavorLabel)}
                        className="p-1 hover:opacity-70 transition-opacity"
                      >
                        <Trash2 size={14} style={{ color: 'hsl(var(--destructive))' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-5 flex flex-col gap-3" style={{ borderColor: 'hsl(var(--border))' }}>
            <div className="flex justify-between">
              <span style={{ color: 'hsl(var(--muted-foreground))' }}>Sous-total</span>
              <span className="font-bold" style={{ color: 'hsl(var(--foreground))' }}>{totalTND.toFixed(2)} TND</span>
            </div>
            {/* Free delivery progress */}
            <div className="rounded-xl px-3 py-2 flex flex-col gap-1.5"
              style={{ background: deliveryFee === 0 ? '#f0fdf4' : 'hsl(var(--muted))', border: deliveryFee === 0 ? '1px solid #bbf7d0' : 'none' }}>
              {deliveryFee === 0 ? (
                <p className="text-xs font-bold text-emerald-700 text-center">🎉 Livraison gratuite !</p>
              ) : (
                <>
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Plus que <span className="font-bold" style={{ color: 'hsl(var(--primary))' }}>{remaining.toFixed(2)} TND</span> pour la livraison gratuite
                  </p>
                  <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: '#1B3A2D' }} />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-between text-sm">
              <span style={{ color: 'hsl(var(--muted-foreground))' }}>Livraison</span>
              {deliveryFee === 0
                ? <span className="font-bold text-emerald-600">Gratuite</span>
                : <span style={{ color: 'hsl(var(--muted-foreground))' }}>{deliveryFee.toFixed(2)} TND</span>}
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-3" style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
              <span>Total</span>
              <span style={{ color: 'hsl(var(--primary))' }}>{(totalTND + deliveryFee).toFixed(2)} TND</span>
            </div>
            <Link
              to="/commande"
              onClick={onClose}
              className="w-full text-center py-3 rounded-full font-bold text-sm transition-all"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              Passer la commande
            </Link>
            <Link
              to="/nos-fromages"
              onClick={onClose}
              className="w-full text-center py-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              Continuer mes achats
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
