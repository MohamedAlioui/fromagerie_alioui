import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Shield, Flame } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';
import heroImg from '../assets/hero-cheese.jpg';

const timeline = [
  { year: '2021', event: 'Fondation de la fromagerie et Lancement de la Mozzarella artisanale' },
  { year: '2022', event: 'Lancement du Sicilien Blanc et de la Ricotta' },
  { year: '2023', event: 'Expansion et reconnaissance locale' },
];

const stats = [
  { value: '3', label: 'Fromages Artisanaux' },
  { value: '100%', label: 'Naturel' },
  { value: '2021', label: 'Depuis' },
];

const QuiSommesNous = () => (
  <>
    <SEO
      title="Qui Sommes Nous — Notre Histoire & Héritage"
      description="Fondée en 2021 par Assil Alioui à Utique Bizerte, la Fromagerie Alioui perpétue l'art fromager artisanal tunisien. Découvrez notre histoire, nos valeurs et notre passion."
      canonical="/qui-sommes-nous"
    />
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
    {/* Cinematic Banner */}
    <section className="relative h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
      </div>
      <div className="relative z-10 container mx-auto text-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-amber-light font-bold tracking-[0.4em] uppercase text-[10px] mb-4 md:mb-6 block">L'Essence de la Passion</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-4 md:mb-6">
            Notre <span className="text-amber-light italic">Héritage.</span>
          </h1>
        </motion.div>
      </div>
    </section>

    {/* Narrative Intro */}
    <div className="py-16 md:py-32 bg-background relative">
      <div className="container-tight text-center px-4 sm:px-6">
        <AnimatedSection>
          <p className="font-script text-2xl md:text-3xl text-primary mb-6 md:mb-8 animate-float">Une aventure née en 2021</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-8 md:mb-12">De la passion <br /> à la perfection.</h2>
          <div className="space-y-6 md:space-y-8 text-muted-foreground text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            <p>
              Fondée en 2021 par <span className="font-semibold text-foreground">Assil Alioui</span> à Utique Bizerte, la Fromagerie Alioui a vu le jour avec une mission simple : redonner au fromage sa dignité artisanale.
            </p>
            <p>
              Nous ne sommes pas une usine. Nous sommes un atelier. Chaque geste, chaque température, chaque texture est surveillée par l'œil vigilant de nos artisans.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>

    {/* Values */}
    <section className="py-16 md:py-32 bg-secondary/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-6 md:gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold mb-4 md:mb-6 tracking-tight">
              Nos Piliers <br /> <span className="text-primary italic">Incontestables.</span>
            </h2>
            <p className="text-muted-foreground uppercase tracking-[0.3em] text-[11px] font-black">L'âme de Fromagerie Alioui</p>
          </div>
          <div className="hidden lg:block">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-primary/20 flex items-center justify-center p-4 text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary leading-tight">Excellence <br /> Garantie</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Authenticité */}
          <div className="md:col-span-7 lg:col-span-8">
            <AnimatedSection>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative h-full bg-secondary rounded-2xl md:rounded-[3rem] p-7 md:p-12 overflow-hidden border border-white/10 shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10 scale-100 md:scale-150 rotate-12 transition-transform group-hover:rotate-0 duration-700 text-amber-light">
                  <Heart size={120} className="md:hidden" />
                  <Heart size={200} className="hidden md:block" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-amber-light text-secondary flex items-center justify-center mb-8 md:mb-12 shadow-2xl">
                    <Heart size={24} className="md:hidden" />
                    <Heart size={32} className="hidden md:block" />
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white font-display">Authenticité</h3>
                  <p className="text-white/80 text-base md:text-xl leading-relaxed max-w-md font-light">
                    Nos recettes sont de véritables pièces d'histoire, transmises par nos ancêtres et sublimées par les techniques modernes.
                  </p>
                </div>
                <div className="mt-8 md:mt-12 flex flex-wrap gap-3 md:gap-4">
                  <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-amber-light">Tradition Méditerranéenne</div>
                  <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-amber-light">Savoir-faire</div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Qualité */}
          <div className="md:col-span-5 lg:col-span-4">
            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group h-full bg-primary rounded-2xl md:rounded-[3rem] p-7 md:p-12 text-primary-foreground flex flex-col justify-between items-start overflow-hidden relative shadow-2xl shadow-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 md:mb-8 border border-white/20">
                    <Shield size={24} className="md:hidden" />
                    <Shield size={28} className="hidden md:block" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 tracking-tight">Qualité</h3>
                  <p className="text-primary-foreground/90 leading-relaxed font-medium text-sm md:text-base">
                    Du filtrage du lait à l'affinage final, aucun détail n'est laissé au hasard.
                  </p>
                </div>
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/20 w-full italic opacity-70 relative z-10 text-sm md:text-base">
                  Zéro additifs, 100% naturel.
                </div>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Passion */}
          <div className="md:col-span-12">
            <AnimatedSection delay={0.3}>
              <motion.div
                whileHover={{ scale: 0.995 }}
                className="group relative glass-effect rounded-2xl md:rounded-[3rem] p-7 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-hidden border-white/10 shadow-3xl"
              >
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
                <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-secondary flex items-center justify-center text-amber-light shadow-2xl border border-white/5">
                      <Flame size={48} className="animate-pulse md:hidden" />
                      <Flame size={60} className="animate-pulse hidden md:block" />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-2/3 text-center md:text-left relative z-10">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-display">La Passion du Geste</h3>
                  <p className="text-muted-foreground text-base md:text-xl leading-relaxed mb-6 md:mb-8 font-light">
                    Chaque fromage est une pièce unique façonnée par la main de l'artisan. C'est ce lien entre l'homme et la matière qui crée l'exceptionnel.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 opacity-70 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                    <span>Fait Main</span>
                    <span className="opacity-30">•</span>
                    <span>Art de Vivre</span>
                    <span className="opacity-30">•</span>
                    <span>Tunisie</span>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-16 md:py-32 bg-background overflow-hidden">
      <div className="container-tight px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          <div className="w-full md:w-1/3 md:sticky md:top-32">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6">Le Voyage de <span className="text-primary italic">Alioui.</span></h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">De nos premiers essais en 2021 à la reconnaissance actuelle, chaque étape a été franchie avec la même exigence.</p>
          </div>
          <div className="w-full md:w-2/3 space-y-12 md:space-y-20 relative pl-8 md:pl-12 border-l border-border">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[2.6rem] md:-left-[3.4rem] top-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/20" />
                <span className="text-primary font-display text-3xl md:text-4xl font-black mb-2 md:mb-4 block leading-none">{t.year}</span>
                <p className="text-lg md:text-2xl font-semibold text-foreground/90">{t.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 md:py-32 bg-secondary border-y border-border/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 gap-6 md:gap-16">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1}>
              <div className="text-center group">
                <span className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-primary to-accent/50 leading-none">
                  {s.value}
                </span>
                <p className="text-secondary-foreground font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-xs mt-3 md:mt-6 group-hover:text-primary transition-colors">
                  {s.label}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-32 text-center bg-background">
      <div className="container-tight px-4 sm:px-6">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-6 md:mb-8">Plus qu'une fromagerie, <br /> un engagement.</h2>
          <p className="text-muted-foreground mb-8 md:mb-12 text-base md:text-lg italic">"Nous ne vendons pas du fromage, nous partageons une émotion authentique."</p>
          <Link to="/nos-fromages" className="inline-block px-8 md:px-12 py-4 md:py-5 bg-primary text-white font-bold rounded-full shadow-2xl shadow-primary/30 hover:scale-105 transition-transform text-sm md:text-base">
            Goûtez la Différence
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </motion.div>
  </>
);

export default QuiSommesNous;
