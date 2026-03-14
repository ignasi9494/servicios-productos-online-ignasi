import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Precios', href: '#precios' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Add-ons', href: '#addons' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeMenu();
      };
      window.addEventListener('keydown', onKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen, closeMenu]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 text-white font-bold text-lg">
            <Terminal className="w-5 h-5 text-emerald-500" />
            Think Better
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              to="/cuestionario"
              className="px-5 py-2 rounded-full bg-emerald-500 text-zinc-950 font-medium text-sm hover:bg-emerald-400 transition-colors"
            >
              Empezar proyecto
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="fixed inset-0 bg-zinc-950/95 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-2xl text-zinc-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/cuestionario"
              onClick={closeMenu}
              className="mt-4 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold text-lg hover:bg-emerald-400 transition-colors"
            >
              Empezar proyecto
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
