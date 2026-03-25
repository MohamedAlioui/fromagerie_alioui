import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import type { CreateOrderResponse } from '@/api/orders';

const ConfirmationCommande = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const location = useLocation();
  const state = location.state as CreateOrderResponse | null;

  return (
    <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center px-4"
      style={{ background: 'hsl(var(--background))' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full text-center flex flex-col items-center gap-6"
      >
        {/* Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle size={72} style={{ color: 'hsl(var(--primary))' }} />
        </motion.div>

        <div>
          <h1 className="font-display text-3xl font-bold mb-2" style={{ color: 'hsl(var(--foreground))' }}>
            Commande confirmée !
          </h1>
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>
            Merci pour votre commande. Nous vous contacterons bientôt pour organiser la livraison.
          </p>
        </div>

        {/* Order number box */}
        <div className="w-full p-5 rounded-2xl border-2"
          style={{ borderColor: 'hsl(var(--primary))', background: 'hsl(var(--card))' }}>
          <p className="text-sm font-semibold uppercase tracking-wider mb-1"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            Votre numéro de commande
          </p>
          <p className="font-display text-2xl font-bold" style={{ color: 'hsl(var(--primary))' }}>
            {orderNumber}
          </p>
          <p className="text-xs mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Conservez ce numéro et votre email pour suivre votre commande.
          </p>
        </div>

        {/* Items summary */}
        {state?.items && state.items.length > 0 && (
          <div className="w-full p-5 rounded-2xl flex flex-col gap-2"
            style={{ background: 'hsl(var(--card))', boxShadow: 'var(--card-shadow)' }}>
            <h2 className="font-semibold text-left mb-1" style={{ color: 'hsl(var(--foreground))' }}>
              Récapitulatif
            </h2>
            {state.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span style={{ color: 'hsl(var(--foreground))' }}>
                  {item.productName} — {item.weightLabel} ×{item.quantity}
                </span>
                <span className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                  {item.subtotal.toFixed(2)} TND
                </span>
              </div>
            ))}
            <div className="border-t pt-2 mt-1 flex justify-between font-bold"
              style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--primary))' }}>
              <span>Total</span>
              <span>{state.grandTotalTND?.toFixed(2)} TND</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            to={`/suivre-commande?orderNumber=${orderNumber}&email=${state?.customer?.email ?? ''}`}
            className="flex-1 py-3 rounded-full font-bold text-center transition-all"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
          >
            Suivre ma commande
          </Link>
          <Link
            to="/nos-fromages"
            className="flex-1 py-3 rounded-full font-bold text-center border transition-all hover:bg-muted"
            style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
          >
            Retour aux fromages
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationCommande;
