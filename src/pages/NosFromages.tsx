import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Award, ShoppingCart, MapPin, Utensils, Star, Check } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';
import { getProducts } from '@/api/products';
import { useCart } from '@/context/CartContext';
import type { Product, WeightOption } from '@/types/shop';
import mozzarellaImg from '../assets/mozzarella.jpg';
import sicilienImg from '../assets/sicilien-blanc.jpg';
import ricottaImg from '../assets/ricotta.jpg';

// Local editorial content keyed by slug
const editorial: Record<string, {
  localImage: string;
  fullName: string;
  description: string;
  origin: string;
  pairing: string;
  notes: string;
  tags: string[];
}> = {
  'mozzarella-artisanale': {
    localImage: mozzarellaImg,
    fullName: 'Mozzarella Artisanale de Vache',
    description: "La quintessence de la fraîcheur. Notre Mozzarella est filée à la main chaque matin, garantissant cette texture 'perle' unique qui libère un lait onctueux à la première découpe.",
    origin: 'Atelier de Zhena, Utique Bizerte',
    pairing: 'Tomates grappes, Basilic frais, Huile d\'olive de Tebourba',
    notes: 'Crémeux, lacté, texture élastique parfaite',
    tags: ['Frais du Jour', '100% Naturel', 'Sans Conservateurs'],
  },
  'fromage-sicilien-blanc': {
    localImage: sicilienImg,
    fullName: 'Fromage à Pâte Ferme Signature',
    description: "Un hommage au patrimoine méditerranéen. Ce fromage blanc ferme offre une note saline équilibrée et un grain soyeux qui s'affine en bouche, rappelant les saveurs des côtes siciliennes.",
    origin: 'Inspiration Méditerranéenne',
    pairing: 'Figues séchées, Noix, Miel de Thym',
    notes: 'Salé, délicat, finale beurrée',
    tags: ['Affinage Court', 'Sel Marin', 'Texture Ferme'],
  },
  'ricotta-veloutee': {
    localImage: ricottaImg,
    fullName: 'Ricotta Fraîche au Petit-Lait',
    description: "Une plume de douceur. Élaborée selon la méthode traditionnelle du réchauffage du lactosérum, notre Ricotta est d'une légèreté incomparable, idéale pour les palais les plus raffinés.",
    origin: 'Tradition Italienne',
    pairing: 'Zestes de citron, Pistaches de Raf Raf, Pâtisseries',
    notes: 'Nuageux, doux, grain ultra-fin',
    tags: ['Léger', 'Polyvalent', 'Haute Gastronomie'],
  },
};

// Per-product purchase widget
const PurchaseWidget = ({ product, reversed }: { product: Product; reversed: boolean }) => {
  const { addItem } = useCart();
  const [selected, setSelected] = useState<WeightOption>(product.weightOptions[0]);
  const [flavor, setFlavor] = useState<string>(product.flavorOptions?.[0] ?? '');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const hasFlavors = product.flavorOptions && product.flavorOptions.length > 0;

  const handleAdd = () => {
    addItem({
      productId: product._id,
      productName: product.name,
      slug: product.slug,
      image: product.image,
      weightLabel: selected.label,
      flavorLabel: flavor,
      priceInTND: selected.priceInTND,
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div
      className={`mt-8 md:mt-10 rounded-2xl md:rounded-[1.5rem] p-5 md:p-6 border border-border/60 ${reversed ? 'lg:text-left' : ''}`}
      style={{ background: 'hsl(var(--card))', boxShadow: 'var(--card-shadow)' }}
    >
      {/* Price */}
      <div className="flex items-baseline gap-2 mb-5">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'hsl(var(--muted-foreground))' }}>
          À partir de
        </span>
        <span className="font-display text-3xl font-bold" style={{ color: 'hsl(var(--primary))' }}>
          {selected.priceInTND.toFixed(2)}
        </span>
        <span className="font-semibold text-lg" style={{ color: 'hsl(var(--foreground))' }}>TND</span>
      </div>

      {/* Weight selector */}
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Poids
        </p>
        <div className="flex flex-wrap gap-2">
          {product.weightOptions.map(opt => (
            <button
              key={opt.label}
              onClick={() => { setSelected(opt); setQty(1); }}
              disabled={opt.stock === 0}
              className="relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border"
              style={
                selected.label === opt.label
                  ? { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', borderColor: 'hsl(var(--primary))' }
                  : { background: 'transparent', color: 'hsl(var(--foreground))', borderColor: 'hsl(var(--border))' }
              }
            >
              {opt.label}
              {opt.stock === 0 && (
                <span className="ml-1 text-[10px] opacity-60">(épuisé)</span>
              )}
              {selected.label === opt.label && opt.stock > 0 && opt.stock <= 5 && (
                <span className="ml-1 text-[10px] opacity-80">({opt.stock} restants)</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Flavor selector */}
      {hasFlavors && (
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Variété
          </p>
          <div className="flex flex-wrap gap-2">
            {product.flavorOptions.map(f => (
              <button
                key={f}
                onClick={() => setFlavor(f)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border"
                style={
                  flavor === f
                    ? { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', borderColor: 'hsl(var(--primary))' }
                    : { background: 'transparent', color: 'hsl(var(--foreground))', borderColor: 'hsl(var(--border))' }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Quantité
        </p>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border overflow-hidden" style={{ borderColor: 'hsl(var(--border))' }}>
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-muted transition-colors"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              −
            </button>
            <span className="w-10 text-center font-bold text-base" style={{ color: 'hsl(var(--foreground))' }}>{qty}</span>
            <button
              onClick={() => setQty(q => Math.min(selected.stock, q + 1))}
              className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-muted transition-colors"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              +
            </button>
          </div>
          <span className="text-sm font-bold" style={{ color: 'hsl(var(--primary))' }}>
            = {(selected.priceInTND * qty).toFixed(2)} TND
          </span>
        </div>
      </div>

      {/* Add to cart button */}
      <AnimatePresence mode="wait">
        <motion.button
          key={added ? 'added' : 'idle'}
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.97, opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={handleAdd}
          disabled={selected.stock === 0}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-base transition-all duration-300 disabled:opacity-50"
          style={{
            background: added ? 'hsl(var(--secondary))' : 'hsl(var(--primary))',
            color: added ? 'hsl(var(--secondary-foreground))' : 'hsl(var(--primary-foreground))',
            boxShadow: added ? 'none' : '0 4px 20px hsl(var(--primary) / 0.35)',
          }}
        >
          {added ? (
            <><Check size={18} /> Ajouté au panier !</>
          ) : selected.stock === 0 ? (
            'Rupture de stock'
          ) : (
            <><ShoppingCart size={18} /> Ajouter au panier</>
          )}
        </motion.button>
      </AnimatePresence>

      {/* Trust signals */}
      <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
        {['Livraison Bizerte', '100% Naturel', 'Fait ce jour'].map(t => (
          <span key={t} className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            <Star size={9} fill="currentColor" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
};

// Single product section
const CheeseSection = ({ product, index }: { product: Product; index: number }) => {
  const reversed = index % 2 !== 0;
  const ed = editorial[product.slug] ?? null;
  const imgSrc = product.image ? `/uploads/${product.image}` : ed?.localImage ?? '';

  return (
    <AnimatedSection>
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start relative`}>

        {/* Image */}
        <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
          <div className="relative group overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xl ring-1 ring-border/50">
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              src={imgSrc}
              alt={product.name}
              className="w-full aspect-[4/3] sm:aspect-[4/4] md:aspect-[4/5] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Price badge on image */}
            <div className="absolute top-4 right-4 px-3 py-2 rounded-xl backdrop-blur-sm font-bold text-sm"
              style={{ background: 'hsl(var(--primary) / 0.9)', color: 'hsl(var(--primary-foreground))' }}>
              dès {Math.min(...product.weightOptions.map(w => w.priceInTND)).toFixed(2)} TND
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`lg:col-span-5 lg:sticky lg:top-32 lg:self-start ${reversed ? 'lg:order-1' : ''}`}>
          {/* Tags */}
          <div className={`flex flex-wrap gap-2 mb-5 md:mb-6 ${reversed ? 'lg:justify-end' : ''}`}>
            {(ed?.tags ?? product.tags).map(tag => (
              <span key={tag}
                className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-primary/5 text-primary border border-primary/10 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-2 md:mb-3 leading-tight ${reversed ? 'lg:text-right' : ''}`}
            style={{ color: 'hsl(var(--foreground))' }}>
            {product.name}
          </h2>
          <p className={`text-primary font-bold text-xs md:text-sm mb-4 uppercase tracking-wide ${reversed ? 'lg:text-right' : ''}`}>
            {ed?.fullName ?? product.name}
          </p>
          <div className="w-10 h-[2px] bg-primary mb-6 opacity-50"
            style={{ marginLeft: reversed ? 'auto' : '0' }} />

          <p className={`text-muted-foreground text-base md:text-lg leading-relaxed mb-6 font-light ${reversed ? 'lg:text-right' : ''}`}>
            {ed?.description ?? product.description}
          </p>

          {/* Tasting notes */}
          <div className={`bg-secondary/5 rounded-xl p-5 border border-border mb-2 ${reversed ? 'lg:text-right' : ''}`}>
            <div className="flex items-center gap-2 mb-1.5">
              <Utensils size={13} style={{ color: 'hsl(var(--primary))' }} />
              <h4 className="font-display font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>
                Notes de Dégustation
              </h4>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed mb-3">
              {ed?.notes ?? product.notes}
            </p>
            <div className="flex items-center gap-2 mb-1.5">
              <MapPin size={13} style={{ color: 'hsl(var(--primary))' }} />
              <h4 className="font-display font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>
                Accords Parfaits
              </h4>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {ed?.pairing ?? product.pairing}
            </p>
          </div>

          {/* Purchase widget */}
          <PurchaseWidget product={product} reversed={reversed} />
        </div>
      </div>
    </AnimatedSection>
  );
};

// Skeleton for loading state
const CheeseSkeleton = ({ reversed }: { reversed: boolean }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start animate-pulse`}>
    <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
      <div className="rounded-[2rem] aspect-[4/5] w-full" style={{ background: 'hsl(var(--muted))' }} />
    </div>
    <div className={`lg:col-span-5 flex flex-col gap-4 ${reversed ? 'lg:order-1' : ''}`}>
      <div className="h-3 w-24 rounded" style={{ background: 'hsl(var(--muted))' }} />
      <div className="h-12 w-3/4 rounded" style={{ background: 'hsl(var(--muted))' }} />
      <div className="h-3 w-1/2 rounded" style={{ background: 'hsl(var(--muted))' }} />
      <div className="h-24 rounded-xl" style={{ background: 'hsl(var(--muted))' }} />
      <div className="h-32 rounded-2xl" style={{ background: 'hsl(var(--muted))' }} />
    </div>
  </div>
);

const nosFromagesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Fromages Artisanaux Fromagerie Alioui",
  "url": "https://fromageriealioui.tn/nos-fromages",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Mozzarella Artisanale de Vache" },
    { "@type": "ListItem", "position": 2, "name": "Le Sicilien Blanc" },
    { "@type": "ListItem", "position": 3, "name": "Ricotta Veloutée" },
  ],
};

const NosFromages = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <>
      <SEO
        title="Nos Fromages — Commander Mozzarella, Ricotta & Sicilien Blanc"
        description="Commandez nos fromages artisanaux : Mozzarella filée à la main, Ricotta fraîche et Sicilien Blanc. Livraison Bizerte. Sans conservateurs, 100% naturel."
        canonical="/nos-fromages"
        schema={nosFromagesSchema}
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>

        {/* Hero */}
        <section className="relative h-[45vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-secondary">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          </div>
          <div className="relative z-10 text-center container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">
                Le Catalogue
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold mb-4 md:mb-6 text-secondary-foreground">
                Nos Fromages <span className="text-primary italic">d'Exception.</span>
              </h1>
              <p className="text-secondary-foreground/80 text-base md:text-lg max-w-2xl mx-auto font-light px-2">
                Chaque pièce est vérifiée par notre maître fromager. Commandez directement ci-dessous.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products */}
        <div className="py-16 md:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 space-y-20 md:space-y-40 lg:space-y-48">
            {isLoading
              ? [0, 1, 2].map(i => <CheeseSkeleton key={i} reversed={i % 2 !== 0} />)
              : products?.map((product, i) => (
                  <CheeseSection key={product._id} product={product} index={i} />
                ))}
          </div>
        </div>

        {/* Quality CTA */}
        <section className="py-16 md:py-24 bg-primary text-white text-center">
          <div className="container mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <Award className="mx-auto mb-6 md:mb-8 opacity-50" size={48} />
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-5 md:mb-8">
                Un engagement envers <br /> la pureté du goût.
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8 md:mb-12 text-base md:text-lg">
                Aucun additif chimique ou conservateur ne franchira jamais les portes de notre fromagerie.
              </p>
              <a
                href="#"
                onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-block px-8 md:px-12 py-4 md:py-5 bg-white text-primary font-bold rounded-full hover:bg-amber-light transition-colors text-sm md:text-base"
              >
                Commander maintenant ↑
              </a>
            </AnimatedSection>
          </div>
        </section>

      </motion.div>
    </>
  );
};

export default NosFromages;
