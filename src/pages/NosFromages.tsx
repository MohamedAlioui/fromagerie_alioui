import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';
import mozzarellaImg from '../assets/mozzarella.jpg';
import sicilienImg from '../assets/sicilien-blanc.jpg';
import ricottaImg from '../assets/ricotta.jpg';

const cheeses = [
  {
    name: 'Mozzarella',
    fullName: 'Mozzarella Artisanale de Vache',
    description: "La quintessence de la fraîcheur. Notre Mozzarella est filée à la main chaque matin, garantissant cette texture 'perle' unique qui libère un lait onctueux à la première découpe.",
    origin: 'Atelier de Zhena, Utique Bizerte',
    pairing: 'Tomates grappes, Basilic frais, Huile d\'olive de Tebourba',
    notes: 'Crémeux, lacté, texture élastique parfaite',
    tags: ['Frais du Jour', '100% Naturel', 'Sans Conservateurs'],
    image: mozzarellaImg,
  },
  {
    name: 'Le Sicilien Blanc',
    fullName: 'Fromage à Pâte Ferme Signature',
    description: "Un hommage au patrimoine méditerranéen. Ce fromage blanc ferme offre une note saline équilibrée et un grain soyeux qui s'affine en bouche, rappelant les saveurs des côtes siciliennes.",
    origin: 'Inspiration Méditerranéenne',
    pairing: 'Figues séchées, Noix, Miel de Thym',
    notes: 'Salé, délicat, finale beurrée',
    tags: ['Affinage Court', 'Sel Marin', 'Texture Ferme'],
    image: sicilienImg,
  },
  {
    name: 'Ricotta Veloutée',
    fullName: 'Ricotta Fraîche au Petit-Lait',
    description: "Une plume de douceur. Élaborée selon la méthode traditionnelle du réchauffage du lactosérum, notre Ricotta est d'une légèreté incomparable, idéale pour les palais les plus raffinés.",
    origin: 'Tradition Italienne',
    pairing: 'Zestes de citron, Pistaches de Raf Raf, Pâtisseries',
    notes: 'Nuageux, doux, grain ultra-fin',
    tags: ['Léger', 'Polyvalent', 'Haute Gastronomie'],
    image: ricottaImg,
  },
];

const nosFromagesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Fromages Artisanaux Fromagerie Alioui",
  "url": "https://fromageriealioui.tn/nos-fromages",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Mozzarella Artisanale de Vache", "url": "https://fromageriealioui.tn/nos-fromages" },
    { "@type": "ListItem", "position": 2, "name": "Le Sicilien Blanc", "url": "https://fromageriealioui.tn/nos-fromages" },
    { "@type": "ListItem", "position": 3, "name": "Ricotta Veloutée", "url": "https://fromageriealioui.tn/nos-fromages" }
  ]
};

const NosFromages = () => (
  <>
    <SEO
      title="Nos Fromages — Mozzarella, Ricotta & Sicilien Blanc"
      description="Découvrez notre catalogue de fromages artisanaux tunisiens : Mozzarella filée à la main, Ricotta fraîche au petit-lait et Sicilien Blanc à pâte ferme. Sans conservateurs, 100% naturel."
      canonical="/nos-fromages"
      schema={nosFromagesSchema}
    />
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
    {/* Header */}
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
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 md:mb-6 block">Le Catalogue</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold mb-4 md:mb-6 text-secondary-foreground">
            Nos Fromages <span className="text-primary italic">d'Exception.</span>
          </h1>
          <p className="text-secondary-foreground/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-light px-2">
            Chaque pièce est vérifiée par notre maître fromager pour garantir une expérience gustative sans égal.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Luxury List */}
    <div className="py-16 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 space-y-20 md:space-y-40 lg:space-y-48">
        {cheeses.map((cheese, i) => (
          <AnimatedSection key={cheese.name}>
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start relative`}>
              {/* Image Column */}
              <div className={`lg:col-span-7 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="relative group overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xl md:shadow-2xl ring-1 ring-border/50">
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    src={cheese.image}
                    alt={cheese.name}
                    className="w-full aspect-[4/3] sm:aspect-[4/4] md:aspect-[4/5] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>

              {/* Content Column */}
              <div className={`lg:col-span-5 lg:sticky lg:top-32 lg:self-start ${i % 2 !== 0 ? 'lg:order-1 lg:text-right' : ''}`}>
                <div className={`flex flex-wrap gap-2 mb-5 md:mb-8 ${i % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                  {cheese.tags.map((tag) => (
                    <span key={tag} className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 md:px-3 py-1 bg-primary/5 text-primary border border-primary/10 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-3 md:mb-6 leading-tight">{cheese.name}</h2>
                <p className="text-primary font-bold text-xs md:text-sm mb-4 md:mb-6 uppercase tracking-wide">{cheese.fullName}</p>
                <div className="w-10 md:w-12 h-[2px] bg-primary mb-6 md:mb-8 opacity-50 block" style={{ marginLeft: i % 2 !== 0 ? 'auto' : '0' }}></div>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-7 md:mb-10 font-light">{cheese.description}</p>

                {/* Tasting Notes */}
                <div className={`bg-secondary/5 rounded-xl md:rounded-2xl p-5 md:p-6 mb-6 md:mb-10 border border-border text-left ${i % 2 !== 0 ? 'lg:text-right' : ''}`}>
                  <h4 className="font-display font-semibold mb-1.5 md:mb-2 text-foreground text-sm md:text-base">Notes de Dégustation</h4>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-3 md:mb-4">{cheese.notes}</p>
                  <h4 className="font-display font-semibold mb-1.5 md:mb-2 text-foreground text-sm md:text-base">Accords Parfaits</h4>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{cheese.pairing}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>

    {/* Quality Seal CTA */}
    <section className="py-16 md:py-24 bg-primary text-white text-center">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Award className="mx-auto mb-6 md:mb-8 opacity-50" size={48} />
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-5 md:mb-8">Un engagement envers <br /> la pureté du goût.</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8 md:mb-12 text-base md:text-lg">
            Nous garantissons qu'aucun additif chimique ou conservateur ne franchira les portes de notre fromagerie. Jamais.
          </p>
          <Link to="/contactez-nous" className="inline-block px-8 md:px-12 py-4 md:py-5 bg-white text-primary font-bold rounded-full hover:bg-amber-light transition-colors text-sm md:text-base">
            Commander nos produits
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </motion.div>
  </>
);

export default NosFromages;
