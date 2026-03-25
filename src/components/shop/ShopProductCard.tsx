import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { Product, WeightOption } from '@/types/shop';
import WeightSelector from './WeightSelector';

interface Props {
  product: Product;
}

const ShopProductCard = ({ product }: Props) => {
  const { addItem } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<WeightOption | null>(
    product.weightOptions[0] ?? null
  );
  const [added, setAdded] = useState(false);

  const minPrice = Math.min(...product.weightOptions.map(w => w.priceInTND));

  const handleAdd = () => {
    if (!selectedWeight) return;
    addItem({
      productId: product._id,
      productName: product.name,
      slug: product.slug,
      image: product.image,
      weightLabel: selectedWeight.label,
      priceInTND: selectedWeight.priceInTND,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1"
      style={{ background: 'hsl(var(--card))', boxShadow: 'var(--card-shadow)' }}
    >
      {/* Image */}
      <Link to={`/boutique/${product.slug}`} className="relative overflow-hidden h-52 block">
        {product.image ? (
          <img
            src={`/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-4xl"
            style={{ background: 'hsl(var(--muted))' }}
          >
            🧀
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {product.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link to={`/boutique/${product.slug}`}>
          <h3 className="font-display text-lg font-semibold leading-tight hover:text-primary transition-colors"
            style={{ color: 'hsl(var(--foreground))' }}>
            {product.name}
          </h3>
        </Link>

        <p className="text-sm font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
          À partir de : <span className="font-bold text-base" style={{ color: 'hsl(var(--foreground))' }}>{minPrice.toFixed(2)} TND</span>
        </p>

        {/* Weight selector */}
        <WeightSelector
          options={product.weightOptions}
          selected={selectedWeight}
          onSelect={setSelectedWeight}
        />

        {/* Price for selected */}
        {selectedWeight && (
          <p className="text-sm font-semibold" style={{ color: 'hsl(var(--primary))' }}>
            {selectedWeight.label} — {selectedWeight.priceInTND.toFixed(2)} TND
          </p>
        )}

        <div className="flex gap-2 mt-auto">
          <Link
            to={`/boutique/${product.slug}`}
            className="flex-1 text-center py-2 rounded-full border text-sm font-semibold transition-all hover:bg-muted"
            style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
          >
            Voir le produit
          </Link>
          <button
            onClick={handleAdd}
            disabled={!selectedWeight || selectedWeight.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-50"
            style={{
              background: added ? 'hsl(var(--secondary))' : 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
            }}
          >
            <ShoppingCart size={14} />
            {added ? 'Ajouté ✓' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;
