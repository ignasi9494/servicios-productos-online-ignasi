import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Building2, Mail, Phone, Save, Loader2,
  CheckCircle2, AlertCircle, CreditCard, Database,
  Zap, MessageSquare, Cpu, CheckCircle, XCircle,
  Globe, Shield, ExternalLink,
} from 'lucide-react';
import { supabase, supabaseConfigured } from '../../lib/supabase';
import { usePageTitle } from '../../hooks/usePageTitle';

interface CompanySettings {
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  stripe_mode: 'test' | 'live';
}

const DEFAULT_SETTINGS: CompanySettings = {
  company_name: 'Think Better',
  company_email: 'hola@thinkbetter.es',
  company_phone: '+34 93 XXX XX XX',
  company_address: 'Barcelona, Catalunya, España',
  stripe_mode: 'test',
};

interface IntegrationStatus {
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'ok' | 'warning' | 'error' | 'unknown';
  detail: string;
  link?: string;
}

export function AdminConfiguracion() {
  usePageTitle('Configuración | Admin Think Better');
  const [settings, setSettings] = useState<CompanySettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [loadingInit, setLoadingInit] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check env vars for integration status
  const supabaseOk = supabaseConfigured;
  const stripeOk = !!(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY && !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY.startsWith('pk_placeholder'));
  const stripeIsLive = !!(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_live'));
  const geminiOk = !!(import.meta.env.VITE_GEMINI_API_KEY_PLACEHOLDER); // placeholder check — real key is server-side

  const INTEGRATIONS: IntegrationStatus[] = [
    {
      name: 'Supabase',
      description: 'Base de datos, autenticación y almacenamiento',
      icon: <Database className="w-5 h-5" />,
      status: supabaseOk ? 'ok' : 'error',
      detail: supabaseOk ? 'Conectado — Auth, DB y Storage activos' : 'No configurado — añade VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY',
      link: 'https://supabase.com/dashboard',
    },
    {
      name: 'Stripe',
      description: 'Pasarela de pagos y suscripciones',
      icon: <CreditCard className="w-5 h-5" />,
      status: stripeOk ? (stripeIsLive ? 'ok' : 'warning') : 'error',
      detail: stripeOk ? (stripeIsLive ? 'Modo producción (live)' : 'Modo test — pagos no reales') : 'No configurado — añade VITE_STRIPE_PUBLISHABLE_KEY',
      link: 'https://dashboard.stripe.com',
    },
    {
      name: 'Resend',
      description: 'Envío de emails transaccionales',
      icon: <Mail className="w-5 h-5" />,
      status: 'unknown',
      detail: 'Configurado via variable de entorno en Supabase Edge Functions (RESEND_API_KEY)',
      link: 'https://resend.com/overview',
    },
    {
      name: 'Gemini API',
      description: 'IA para el cuestionario conversacional',
      icon: <Cpu className="w-5 h-5" />,
      status: 'unknown',
      detail: 'Clave configurada en el servidor — no expuesta al cliente por seguridad',
      link: 'https://aistudio.google.com/app/apikey',
    },
    {
      name: 'Vercel',
      description: 'Hosting y despliegue automático',
      icon: <Globe className="w-5 h-5" />,
      status: 'ok',
      detail: 'Auto-deploy activo en push a rama main',
      link: 'https://vercel.com/dashboard',
    },
  ];

  useEffect(() => {
    async function load() {
      if (supabaseConfigured) {
        const { data } = await supabase.from('settings').select('*').eq('key', 'company').single();
        if (data?.value) {
          setSettings({ ...DEFAULT_SETTINGS, ...(data.value as Partial<CompanySettings>) });
        }
      }
      setLoadingInit(false);
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);

    if (supabaseConfigured) {
      const { error: upsertError } = await supabase
        .from('settings')
        .upsert({ key: 'company', value: settings }, { onConflict: 'key' });
      if (upsertError) {
        setError('Error al guardar. Inténtalo de nuevo.');
        setLoading(false);
        return;
      }
    } else {
      await new Promise((r) => setTimeout(r, 400));
    }

    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 3000);
  }

  function onChange(field: keyof CompanySettings, value: string) {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  if (loadingInit) {
    return (
      <div className="flex items-center gap-2 text-zinc-500 py-12">
        <Loader2 className="w-5 h-5 animate-spin" />
        Cargando configuración...
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Ajustes del sistema y estado de integraciones</p>
      </div>

      {/* Company data */}
      <form onSubmit={handleSave}>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5" />
            Datos de la empresa
          </h2>

          <div className="space-y-4">
            <SettingField label="Nombre de la empresa">
              <input
                type="text"
                value={settings.company_name}
                onChange={(e) => onChange('company_name', e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </SettingField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SettingField label="Email de contacto">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                  <input
                    type="email"
                    value={settings.company_email}
                    onChange={(e) => onChange('company_email', e.target.value)}
                    className="w-full pl-9 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </SettingField>

              <SettingField label="Teléfono">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                  <input
                    type="tel"
                    value={settings.company_phone}
                    onChange={(e) => onChange('company_phone', e.target.value)}
                    className="w-full pl-9 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </SettingField>
            </div>

            <SettingField label="Dirección">
              <input
                type="text"
                value={settings.company_address}
                onChange={(e) => onChange('company_address', e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </SettingField>
          </div>
        </div>

        {/* Stripe mode */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-4">
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-5 flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5" />
            Stripe
          </h2>
          <div className="flex items-center gap-4">
            {(['test', 'live'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onChange('stripe_mode', mode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  settings.stripe_mode === mode
                    ? mode === 'live'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : 'border-amber-500 bg-amber-500/10 text-amber-400'
                    : 'border-zinc-700 bg-zinc-800 text-zinc-500 hover:border-zinc-600'
                }`}
              >
                {mode === 'live' ? <CheckCircle className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                {mode === 'live' ? 'Modo producción (live)' : 'Modo test'}
              </button>
            ))}
            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-700 text-xs text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Dashboard Stripe
            </a>
          </div>
          <p className="text-xs text-zinc-600 mt-3">
            El modo Stripe se gestiona con las variables de entorno VITE_STRIPE_PUBLISHABLE_KEY y STRIPE_SECRET_KEY.
            Este ajuste es informativo para el panel.
          </p>
        </div>

        {/* Error + save */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3 mt-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex items-center gap-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
          {saved && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 text-sm text-emerald-400"
            >
              <CheckCircle2 className="w-4 h-4" />
              Guardado correctamente
            </motion.div>
          )}
        </div>
      </form>

      {/* Integrations */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-5 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5" />
          Estado de integraciones
        </h2>

        <div className="space-y-3">
          {INTEGRATIONS.map((integ) => (
            <div key={integ.name} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-800/40 border border-zinc-800">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                integ.status === 'ok' ? 'bg-emerald-500/15 text-emerald-400' :
                integ.status === 'warning' ? 'bg-amber-500/15 text-amber-400' :
                integ.status === 'error' ? 'bg-red-500/15 text-red-400' :
                'bg-zinc-700 text-zinc-400'
              }`}>
                {integ.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="text-sm font-medium text-white">{integ.name}</p>
                  <div className="flex items-center gap-1.5">
                    <StatusBadge status={integ.status} />
                    {integ.link && (
                      <a href={integ.link} target="_blank" rel="noopener noreferrer" className="p-1 rounded-lg text-zinc-600 hover:text-zinc-300 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-zinc-500">{integ.description}</p>
                <p className="text-xs text-zinc-600 mt-1">{integ.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact / support section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5" />
          Soporte y documentación
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Documentación Supabase', href: 'https://supabase.com/docs', icon: <Database className="w-3.5 h-3.5" /> },
            { label: 'Stripe API Reference', href: 'https://stripe.com/docs/api', icon: <CreditCard className="w-3.5 h-3.5" /> },
            { label: 'Resend Docs', href: 'https://resend.com/docs', icon: <Mail className="w-3.5 h-3.5" /> },
            { label: 'Vercel Dashboard', href: 'https://vercel.com/dashboard', icon: <Globe className="w-3.5 h-3.5" /> },
          ].map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-sm text-zinc-400 hover:text-white transition-all"
            >
              <span className="text-zinc-600">{icon}</span>
              {label}
              <ExternalLink className="w-3 h-3 ml-auto text-zinc-600" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SettingField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-zinc-400 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: IntegrationStatus['status'] }) {
  const map = {
    ok: { label: 'OK', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20', icon: <CheckCircle className="w-3 h-3" /> },
    warning: { label: 'Atención', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/20', icon: <AlertCircle className="w-3 h-3" /> },
    error: { label: 'Error', cls: 'bg-red-500/15 text-red-400 border-red-500/20', icon: <XCircle className="w-3 h-3" /> },
    unknown: { label: 'No verificado', cls: 'bg-zinc-700/50 text-zinc-500 border-zinc-700', icon: <Shield className="w-3 h-3" /> },
  };
  const { label, cls, icon } = map[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {icon}{label}
    </span>
  );
}
