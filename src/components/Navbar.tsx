import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useCart } from '@/context/CartContext';
import CartDrawer from './shop/CartDrawer';
import logo from '../assets/logo.png';

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Qui Sommes Nous', path: '/qui-sommes-nous' },
  { label: 'Nos Fromages', path: '/nos-fromages' },
  { label: 'Idées de Recettes', path: '/idees-recettes' },
  { label: 'Contactez-Nous', path: '/contactez-nous' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'var(--navbar-scrolled)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
          boxShadow: scrolled ? '0 1px 0 hsl(var(--border))' : 'none',
        }}
      >
        <div className="container mx-auto flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Fromagerie Alioui" className="w-12 h-12 object-contain" />
            <div className="flex flex-col leading-tight">
              <span
                className="font-display text-[15px] font-semibold tracking-wide uppercase transition-colors duration-200"
                style={{ color: 'white', letterSpacing: '0.12em' }}
              >
                Fromagerie
              </span>
              <span
                className="font-script text-lg -mt-0.5 transition-colors duration-200"
                style={{ color: 'hsl(var(--amber-light))' }}
              >
                Alioui
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.slice(0, -1).map(link => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:text-amber-light"
                  style={{ color: active ? 'hsl(var(--amber-light))' : 'white' }}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                      style={{ background: scrolled ? 'hsl(var(--amber-light))' : 'hsl(var(--primary))' }}
                    />
                  )}
                </Link>
              );
            })}

            <Link
              to="/contactez-nous"
              className={`ml-4 px-6 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all duration-300 ${
                scrolled
                  ? 'bg-amber-light text-primary hover:bg-white'
                  : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
              }`}
            >
              Contactez-Nous
            </Link>

            {/* Cart icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative ml-2 p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Panier"
            >
              <ShoppingCart size={20} style={{ color: 'white' }} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: 'hsl(var(--primary))', color: 'white' }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            <div className="ml-4 pl-4 border-l border-white/10">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full"
              aria-label="Panier"
            >
              <ShoppingCart size={20} style={{ color: 'white' }} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: 'hsl(var(--primary))', color: 'white' }}
                >
                  {totalItems}
                </span>
              )}
            </button>
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              style={{ color: scrolled ? 'hsl(var(--cream))' : 'hsl(var(--foreground))' }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-border"
              style={{ background: 'var(--navbar-bg)', backdropFilter: 'blur(16px)' }}
            >
              <div className="container py-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-colors ${
                        location.pathname === link.path
                          ? 'text-primary bg-primary/5'
                          : 'text-foreground'
                      }`}
                      style={{ letterSpacing: '0.06em' }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
