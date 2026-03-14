import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'tb_cookie_consent';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieBanner() {
  // null = not yet determined (reading localStorage), false = hidden, true = visible
  const [visible, setVisible] = useState<boolean | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      // Already consented — never show banner, no flash
      setVisible(false);
    } else {
      // Delay slightly so the page paints first, then show banner
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function acceptAll() {
    const consent: CookiePreferences = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setVisible(false);
  }

  function rejectOptional() {
    const consent: CookiePreferences = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setVisible(false);
  }

  function savePreferences() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setVisible(false);
  }

  // Don't render anything until localStorage has been checked
  if (visible === null) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50"
        >
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Cookie className="w-5 h-5 text-emerald-400 shrink-0" />
                  <h3 className="text-sm font-semibold text-white">Cookies y privacidad</h3>
                </div>
                <button
                  onClick={rejectOptional}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
                  aria-label="Rechazar y cerrar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-zinc-400 mb-4">
                Usamos cookies propias necesarias para el funcionamiento del sitio. Con tu permiso, también usamos cookies analíticas para mejorar la experiencia.{' '}
                <Link to="/cookies" className="text-emerald-400 hover:text-emerald-300 underline transition-colors">
                  Saber más
                </Link>
              </p>

              {/* Details toggle */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-4"
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                Gestionar preferencias
              </button>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="space-y-2.5">
                      {/* Necessary */}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                        <div>
                          <p className="text-xs font-medium text-white">Necesarias</p>
                          <p className="text-xs text-zinc-500">Sesión, autenticación, preferencias básicas</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-xs text-zinc-500">Siempre activas</span>
                        </div>
                      </div>

                      {/* Analytics */}
                      <label className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 cursor-pointer">
                        <div>
                          <p className="text-xs font-medium text-white">Analíticas</p>
                          <p className="text-xs text-zinc-500">Google Analytics, métricas de uso</p>
                        </div>
                        <ToggleSwitch
                          checked={prefs.analytics}
                          onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
                        />
                      </label>

                      {/* Marketing */}
                      <label className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 cursor-pointer">
                        <div>
                          <p className="text-xs font-medium text-white">Marketing</p>
                          <p className="text-xs text-zinc-500">Retargeting, publicidad personalizada</p>
                        </div>
                        <ToggleSwitch
                          checked={prefs.marketing}
                          onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
                        />
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex gap-2">
                {showDetails ? (
                  <>
                    <button
                      onClick={rejectOptional}
                      className="flex-1 py-2 rounded-xl text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                    >
                      Rechazar opcionales
                    </button>
                    <button
                      onClick={savePreferences}
                      className="flex-1 py-2 rounded-xl text-xs font-medium bg-zinc-700 hover:bg-zinc-600 text-white transition-colors"
                    >
                      Guardar preferencias
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={rejectOptional}
                      className="flex-1 py-2 rounded-xl text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                    >
                      Solo necesarias
                    </button>
                    <button
                      onClick={acceptAll}
                      className="flex-1 py-2 rounded-xl text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                    >
                      Aceptar todas
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-9 h-5 rounded-full transition-colors shrink-0 focus:outline-none ${
        checked ? 'bg-emerald-500' : 'bg-zinc-600'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
