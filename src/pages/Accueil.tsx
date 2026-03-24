import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Leaf, Star } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import WaveDivider from '../components/WaveDivider';
import SEO from '../components/SEO';
import mozzarellaImg from '../assets/mozzarella.jpg';
import sicilienImg from '../assets/sicilien-blanc.jpg';
import ricottaImg from '../assets/ricotta.jpg';
import heroImg from '../assets/hero-cheese.jpg';

const products = [
  { name: 'Mozzarella Artisanale', description: 'Fraîche et crémeuse, fabriquée quotidiennement à partir de lait entier sélectionné.', image: mozzarellaImg },
  { name: 'Sicilien Blanc', description: 'Fromage blanc ferme d\'inspiration sicilienne, au caractère méditerranéen affirmé.', image: sicilienImg },
  { name: 'Ricotta Fraîche', description: 'Délicate et légère, au grain doux et à la texture crémeuse.', image: ricottaImg },
];

const features = [
  { icon: Award, title: '100% Artisanal', desc: 'Chaque fromage est façonné à la main.' },
  { icon: Star, title: 'Recettes Traditionnelles', desc: 'Héritées de la tradition tunisienne.' },
  { icon: Leaf, title: 'Qualité Premium', desc: 'Ingrédients naturels sélectionnés.' },
];

const accueilSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Fromagerie Alioui — Accueil",
  "url": "https://fromageriealioui.tn/",
  "description": "Découvrez nos fromages artisanaux tunisiens : Mozzarella, Ricotta et Sicilien Blanc, façonnés à la main depuis 2021.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://fromageriealioui.tn/" }]
  }
};

const Accueil = () => (
  <>
    <SEO
      title="Fromagerie Alioui"
      description="Fromagerie artisanale tunisienne depuis 2021 à Utique Bizerte. Mozzarella filée à la main, Ricotta veloutée et Sicilien Blanc. 100% naturel, sans conservateurs."
      canonical="/"
      schema={accueilSchema}
    />
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
    {/* Hero Section */}
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={heroImg}
          alt="Fromager artisan"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />
      </div>

      <div className="relative z-10 container mx-auto text-center px-4 sm:px-6 mt-20 md:mt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1.5 mb-4 md:mb-6 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-amber-light border border-amber-light/30 rounded-full backdrop-blur-sm bg-white/5">
            L'Excellence Tunisienne — Depuis 2021
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-semibold text-white mb-5 md:mb-8 leading-[0.9] tracking-tight">
            L'Art du <br /> <span className="text-amber-light italic">Fromage.</span>
          </h1>
          <p className="text-white/80 text-base md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-xl md:max-w-2xl mx-auto font-light leading-relaxed px-2">
            Mozzarella, Sicilien Blanc et Ricotta façonnés à la main avec passion au cœur de la Tunisie.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <Link
              to="/nos-fromages"
              className="group relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-primary text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30 text-sm md:text-base"
            >
              <span className="relative z-10">Découvrir la Collection</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link
              to="/qui-sommes-nous"
              className="text-white font-semibold hover:text-amber-light transition-colors flex items-center gap-2 group text-sm md:text-base"
            >
              Notre Histoire <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-5 h-8 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
      >
        <div className="w-1 h-2 bg-white rounded-full" />
      </motion.div>
    </section>

    {/* Trust & Features */}
    <section className="bg-background py-12 md:py-20 border-y border-border/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 items-center">
          {[
            { label: 'Artisanal', icon: Award, sub: 'Fait main à 100%' },
            { label: 'Naturel', icon: Leaf, sub: 'Sans conservateurs' },
            { label: 'Nature', icon: Leaf, sub: 'La touche de nature' },
            { label: 'Qualité', icon: Award, sub: 'Lait entier filtré' },
          ].map((f, i) => (
            <motion.div
              key={f.label + i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 md:gap-4 group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/5 flex-shrink-0 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                <f.icon size={20} />
              </div>
              <div>
                <p className="font-display text-sm md:text-lg font-bold leading-none mb-0.5 md:mb-1">{f.label}</p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-tight">{f.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Products */}
    <section className="py-16 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-6">
          <div className="max-w-xl">
            <span className="text-primary font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-3 md:mb-4 block">La Sélection du Fromager</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-none">Nos Créations <span className="text-primary italic">Signature.</span></h2>
          </div>
          <Link to="/nos-fromages" className="text-primary font-bold hover:underline text-sm md:text-base">Voir tout le catalogue →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:rounded-3xl mb-5 md:mb-8 shadow-xl md:shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-5 left-5 right-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white text-xs md:text-sm font-medium leading-relaxed mb-3 md:mb-4">{p.description}</p>
                  <button className="w-full py-2.5 md:py-3 bg-white text-black font-bold rounded-xl text-xs md:text-sm hover:bg-amber-light transition-colors">Détails du Produit</button>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-1 md:mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="text-muted-foreground uppercase text-[9px] md:text-[10px] font-bold tracking-widest">Édition Limitée · Tunisie</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Narrative Section */}
    <section className="bg-secondary py-16 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 -skew-x-12 translate-x-1/2" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 md:border-8 border-white/5 bg-secondary">
              <iframe
                src="https://drive.google.com/file/d/1WfsiIYsqCMJ3IJgwX-jBamlqQaCgp394/preview"
                className="w-full h-[300px] sm:h-[400px] md:h-[600px]"
                allow="autoplay"
                style={{ border: 0 }}
              />
            </div>
            <div className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-12 bg-primary p-6 md:p-12 rounded-2xl shadow-2xl hidden sm:block">
              <p className="font-display text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">2021</p>
              <p className="text-white/80 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">L'Année de Tout Changer</p>
            </div>
          </motion.div>
          <div className="lg:pl-12">
            <span className="text-primary font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-4 md:mb-6 block font-body">L'Héritage Alioui</span>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-secondary-foreground mb-6 md:mb-8 leading-tight">La Main de l'Homme <span className="text-primary italic">Avant Tout.</span></h2>
            <p className="text-secondary-foreground/70 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl">
              Chaque fromage qui quitte notre atelier est une œuvre d'art. Nous refusons les compromis industriels pour préserver l'élasticité unique de notre Mozzarella et l'onctuosité de notre Ricotta.
            </p>
            <div className="flex flex-col gap-4 md:gap-6">
              {[
                "Lait frais collecté chaque matin",
                "Certifié artisanal par les maîtres fromagers",
                "Savourez la différence du 'Fait Main'"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4 text-secondary-foreground font-semibold text-sm md:text-base">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider flip />
  </motion.div>
  </>
);

export default Accueil;
