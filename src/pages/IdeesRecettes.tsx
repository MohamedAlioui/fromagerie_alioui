import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';
import capreseImg from '../assets/recipe-caprese.png';
import ricottaImg from '../assets/recipe-ricotta.png';
import sicilienImg from '../assets/recipe-sicilien.png';

const recipes = [
    {
        title: 'Salade Caprese Traditionnelle',
        cheese: 'Mozzarella Artisanale',
        ingredients: ['Mozzarella Alioui', 'Tomates fraîches', 'Basilic', 'Huile d\'olive extra vierge'],
        instruction: 'Coupez la mozzarella et les tomates en rondelles. Alternez-les sur une assiette, ajoutez le basilic et arrosez d\'huile d\'olive.',
        image: capreseImg,
    },
    {
        title: 'Toast Ricotta et Miel',
        cheese: 'Ricotta Fraîche',
        ingredients: ['Ricotta Alioui', 'Pain au levain', 'Miel local', 'Noix concassées'],
        instruction: 'Tartinez généreusement la ricotta sur du pain grillé. Ajoutez un filet de miel et quelques noix pour le croquant.',
        image: ricottaImg,
    },
    {
        title: 'Planche Méditerranéenne',
        cheese: 'Sicilien Blanc',
        ingredients: ['Sicilien Blanc Alioui', 'Olives noires', 'Figues séchées', 'Raisins'],
        instruction: 'Disposez le Sicilien Blanc en tranches épaisses avec les accompagnements pour une dégustation authentique.',
        image: sicilienImg,
    },
];

const IdeesRecettes = () => {
    return (
        <>
        <SEO
            title="Idées Recettes — Cuisine avec nos Fromages Artisanaux"
            description="Inspirez-vous de nos recettes : Salade Caprese à la Mozzarella, Toast Ricotta et Miel, Planche Méditerranéenne au Sicilien Blanc. Des idées simples et savoureuses avec nos fromages artisanaux tunisiens."
            canonical="/idees-recettes"
        />
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
        >
            {/* Banner */}
            <section className="relative py-24 md:py-40 lg:py-48 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-primary/95" style={{ background: 'var(--hero-gradient)' }} />
                <div className="relative z-10 container mx-auto text-center px-4 sm:px-6">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-script text-xl md:text-3xl text-amber-light mb-3 md:mb-4"
                    >
                        Cuisiner avec Passion
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                        className="font-display text-3xl sm:text-4xl md:text-6xl font-semibold text-cream"
                    >
                        Idées de Recettes
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="h-1 bg-amber-light mx-auto mt-4 md:mt-6"
                    />
                </div>
            </section>

            {/* Intro */}
            <section className="py-12 md:py-24 bg-background">
                <div className="container mx-auto max-w-4xl text-center px-4 sm:px-6">
                    <AnimatedSection>
                        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4 md:mb-6">Sublimez vos plats avec nos fromages.</h2>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            Découvrez des façons simples et délicieuses d'intégrer nos produits artisanaux dans votre quotidien.
                            Chaque recette est pensée pour mettre en valeur la fraîcheur et le goût authentique de la Fromagerie Alioui.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Recipes Grid */}
            <section className="py-12 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                        {recipes.map((recipe, index) => (
                            <motion.div
                                key={recipe.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                                whileHover={{ y: -6 }}
                                className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="relative h-52 md:h-64 overflow-hidden">
                                    <motion.img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-primary/90 text-primary-foreground text-[10px] md:text-xs font-bold px-2.5 md:px-3 py-1 rounded-full backdrop-blur-sm">
                                        {recipe.cheese}
                                    </div>
                                </div>
                                <div className="p-5 md:p-8">
                                    <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 md:mb-4 group-hover:text-primary transition-colors">
                                        {recipe.title}
                                    </h3>
                                    <div className="mb-4 md:mb-6">
                                        <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Ingrédients</h4>
                                        <ul className="flex flex-wrap gap-1.5 md:gap-2">
                                            {recipe.ingredients.map(ing => (
                                                <span key={ing} className="text-[10px] md:text-xs bg-muted px-2 py-1 rounded border border-border">
                                                    {ing}
                                                </span>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed italic">
                                        "{recipe.instruction}"
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to action */}
            <section className="py-12 md:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <AnimatedSection>
                        <div className="bg-secondary p-7 md:p-12 rounded-2xl md:rounded-3xl relative overflow-hidden">
                            <div className="relative z-10 text-center">
                                <h2 className="font-display text-2xl md:text-3xl font-semibold text-secondary-foreground mb-3 md:mb-4">Une recette à partager ?</h2>
                                <p className="text-secondary-foreground/80 mb-6 md:mb-8 max-w-lg mx-auto text-sm md:text-base">
                                    Nous adorons voir vos créations ! Identifiez-nous sur les réseaux sociaux avec vos nouveaux plats.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <button className="bg-primary text-primary-foreground px-6 md:px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform text-sm md:text-base">
                                        Nous Suivre
                                    </button>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full -ml-16 -mb-16 blur-3xl" />
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </motion.div>
        </>
    );
};

export default IdeesRecettes;
