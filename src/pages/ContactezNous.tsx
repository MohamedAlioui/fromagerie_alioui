import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const ContactezNous = () => {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.message) {
      setError('Veuillez remplir tous les champs requis.');
      return;
    }
    setSubmitted(true);
    setError('');
  };

  return (
    <>
    <SEO
      title="Contactez-Nous — Commandez nos Fromages Artisanaux"
      description="Contactez la Fromagerie Alioui à Utique Bizerte pour commander nos fromages artisanaux tunisiens. Mozzarella, Ricotta, Sicilien Blanc livrés frais."
      canonical="/contactez-nous"
    />
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* Banner */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-secondary">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-3 md:mb-4 block">Discutons Ensemble</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold leading-none text-secondary-foreground">
              Restons en <span className="text-primary italic">Contact.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="py-12 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24">
            {/* Form Section */}
            <div className="lg:col-span-7">
              <AnimatedSection>
                <div className="mb-8 md:mb-12">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">Envoyez-nous un message</h2>
                  <p className="text-muted-foreground text-base md:text-lg">Que vous soyez un amateur de fromage ou un professionnel de la restauration, nous sommes à votre écoute.</p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-primary/5 rounded-2xl md:rounded-[2rem] p-8 md:p-12 text-center border border-primary/20 shadow-2xl"
                  >
                    <CheckCircle className="mx-auto text-primary mb-4 md:mb-6 animate-float" size={48} />
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4 text-primary">Message Reçu !</h3>
                    <p className="text-muted-foreground text-base md:text-lg">Votre demande a été transmise directement à notre maître fromager. Nous vous répondrons sous 24h.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-8">
                    {error && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 md:p-4 bg-destructive/10 text-destructive rounded-xl border border-destructive/20 text-sm font-bold">
                        {error}
                      </motion.p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
                      {[
                        { key: 'nom', label: 'Votre Nom *', type: 'text', placeholder: 'Jean Dupont' },
                        { key: 'email', label: 'Votre E-mail *', type: 'email', placeholder: 'jean@exemple.com' },
                      ].map(field => (
                        <div key={field.key} className="flex flex-col gap-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{field.label}</label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={form[field.key as keyof typeof form]}
                            onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 md:py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 text-sm md:text-base"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sujet de votre demande</label>
                      <input
                        type="text"
                        placeholder="Ex: Commande professionnelle, Visite de l'atelier..."
                        className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 md:py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 text-sm md:text-base"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Votre Message *</label>
                      <textarea
                        rows={5}
                        placeholder="Comment pouvons-nous vous aider ?"
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 md:py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-muted-foreground/50 text-sm md:text-base"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full md:w-auto px-8 md:px-12 py-4 md:py-5 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 text-sm md:text-base"
                    >
                      <Send size={18} /> Transmettre ma demande
                    </motion.button>
                  </form>
                )}
              </AnimatedSection>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-5">
              <div className="space-y-8 md:space-y-12 h-full">
                <AnimatedSection delay={0.2}>
                  <div className="bg-secondary text-secondary-foreground rounded-2xl md:rounded-[2.5rem] p-7 md:p-12 border border-border">
                    <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-secondary-foreground">Coordonnées</h3>
                    <div className="space-y-5 md:space-y-8">
                      {[
                        { icon: Mail, label: 'fromageriealioui@gmail.com', subText: 'Support & Questions', href: 'mailto:fromageriealioui@gmail.com' },
                        { icon: Phone, label: '+216 98 151 789', subText: 'Téléphone 1', href: 'tel:+21698151789' },
                        { icon: Phone, label: '+216 98 136 627', subText: 'Téléphone 2', href: 'tel:+21698136627' },
                        { icon: MapPin, label: 'Zhena, Utique Bizerte', subText: 'Notre Atelier', href: undefined },
                        { icon: FacebookIcon, label: 'Fromagerie Alioui', subText: 'Facebook', href: 'https://www.facebook.com/Fromagerie.alioui' },
                        { icon: InstagramIcon, label: 'fromageriealioui', subText: 'Instagram', href: 'https://www.instagram.com/fromageriealioui' },
                      ].map((item) => (
                        <a key={item.label} href={item.href} className="flex gap-4 md:gap-6 group" style={{ textDecoration: 'none' }}>
                          <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-background flex-shrink-0 flex items-center justify-center text-primary shadow-sm border border-border group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <item.icon size={20} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-secondary-foreground/70 mb-0.5 md:mb-1">{item.subText}</p>
                            <p className="text-sm md:text-lg font-bold text-secondary-foreground group-hover:text-primary transition-colors truncate">{item.label}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.4} className="h-full">
                  <div className="bg-card rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50 h-[280px] md:h-[380px] lg:h-[450px] group lg:sticky lg:top-32">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.1982993155566!2d10.0395611!3d37.038927699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2d1c1e58f9501%3A0x7b98fe3e718629dc!2sFromagerie%20Alioui!5e1!3m2!1sfr!2stn!4v1773282314841!5m2!1sfr!2stn"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="grayscale-[0.4] contrast-[1.1] transition-all duration-1000 group-hover:grayscale-0"
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default ContactezNous;
