import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => (
  <footer style={{ background: 'var(--footer-bg)' }} className="text-cream">
    <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <span className="font-script text-2xl md:text-3xl font-bold text-amber-light">Fromagerie Alioui</span>
          <p className="mt-3 md:mt-4 text-cream/70 text-sm leading-relaxed max-w-xs">
            Fondée en 2021 par Assil Alioui à Utique Bizerte. Inspiré par la touche de nature.
          </p>
          <div className="mt-3 md:mt-4 flex items-center gap-2 text-green-400/70 text-[10px] md:text-xs font-bold uppercase tracking-widest flex-wrap">
            <Leaf size={12} className="text-green-400 flex-shrink-0" />
            <span>100% Naturel · Sans Conservateurs</span>
            <Leaf size={12} className="text-green-400 flex-shrink-0" />
          </div>
          {/* Social icons on mobile under brand */}
          <div className="flex items-center gap-4 mt-4 md:hidden">
            <a href="https://www.facebook.com/Fromagerie.alioui" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-primary transition-colors" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/fromageriealioui" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-primary transition-colors" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display text-base md:text-lg font-semibold text-cream mb-3 md:mb-4">Navigation</h4>
          <nav className="flex flex-col gap-2">
            {[
              { label: 'Accueil', path: '/' },
              { label: 'Qui Sommes Nous', path: '/qui-sommes-nous' },
              { label: 'Nos Fromages', path: '/nos-fromages' },
              { label: 'Contactez-Nous', path: '/contactez-nous' },
            ].map(link => (
              <Link key={link.path} to={link.path} className="text-cream/70 hover:text-primary text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-base md:text-lg font-semibold text-cream mb-3 md:mb-4">Contact</h4>
          <div className="flex flex-col gap-2 text-cream/70 text-sm">
            <a href="mailto:fromageriealioui@gmail.com" className="hover:text-primary transition-colors break-all">fromageriealioui@gmail.com</a>
            <a href="tel:+21698151789" className="hover:text-primary transition-colors">+216 98 151 789</a>
            <a href="tel:+21698136627" className="hover:text-primary transition-colors">+216 98 136 627</a>
            <span>Zhena, Utique Bizerte</span>
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-12 pt-5 md:pt-6 border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
        <span className="text-cream/50 text-xs text-center sm:text-left">© 2024 Fromagerie Alioui. Tous droits réservés.</span>
        <div className="hidden md:flex items-center gap-4">
          <a href="https://www.facebook.com/Fromagerie.alioui" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-primary transition-colors" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="https://www.instagram.com/fromageriealioui" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-primary transition-colors" aria-label="Instagram">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
