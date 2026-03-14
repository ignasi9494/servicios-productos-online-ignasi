import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  User, Building2, Phone, Briefcase, Bell,
  Save, Loader2, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { supabase, supabaseConfigured } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { usePageTitle } from '../../hooks/usePageTitle';

interface ProfileFormData {
  full_name: string;
  company: string;
  phone: string;
  sector: string;
  notify_messages: boolean;
  notify_proposals: boolean;
  notify_payments: boolean;
}

const SECTORS = [
  'Tecnología',
  'E-commerce',
  'Salud y bienestar',
  'Educación',
  'Finanzas',
  'Inmobiliario',
  'Marketing y publicidad',
  'Hostelería y turismo',
  'Legal y consultoría',
  'Otros',
];

export function Ajustes() {
  usePageTitle('Ajustes | Think Better');
  const { user, profile } = useAuth();
  const [form, setForm] = useState<ProfileFormData>({
    full_name: '',
    company: '',
    phone: '',
    sector: '',
    notify_messages: true,
    notify_proposals: true,
    notify_payments: true,
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prefill from profile/auth context
  useEffect(() => {
    if (profile) {
      setForm((prev) => ({
        ...prev,
        full_name: profile.full_name ?? '',
        company: profile.company ?? '',
        phone: profile.phone ?? '',
        sector: profile.sector ?? '',
      }));
    }
  }, [profile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);
    setSaved(false);

    if (supabaseConfigured) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: form.full_name.trim(),
          company: form.company.trim() || null,
          phone: form.phone.trim() || null,
          sector: form.sector || null,
        })
        .eq('user_id', user.id);

      if (updateError) {
        setError('Error al guardar los cambios. Inténtalo de nuevo.');
        setLoading(false);
        return;
      }
    } else {
      // Mock: simulate save delay
      await new Promise((r) => setTimeout(r, 400));
    }

    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleChange(field: keyof ProfileFormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl"
    >
      <h1 className="text-2xl font-bold text-white mb-1">Ajustes</h1>
      <p className="text-sm text-zinc-500 mb-8">Gestiona tu perfil y preferencias de notificación</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-5">
            Información personal
          </h2>

          <div className="space-y-4">
            <FormField
              label="Nombre completo"
              icon={<User className="w-3.5 h-3.5" />}
              required
            >
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => handleChange('full_name', e.target.value)}
                placeholder="Tu nombre completo"
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </FormField>

            <FormField label="Email" icon={<User className="w-3.5 h-3.5" />}>
              <input
                type="email"
                value={user?.email ?? ''}
                disabled
                className="w-full bg-zinc-800/50 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-500 cursor-not-allowed"
              />
              <p className="text-xs text-zinc-600 mt-1.5">El email no se puede modificar desde aquí</p>
            </FormField>

            <FormField label="Empresa" icon={<Building2 className="w-3.5 h-3.5" />}>
              <input
                type="text"
                value={form.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="Nombre de tu empresa (opcional)"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Teléfono" icon={<Phone className="w-3.5 h-3.5" />}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+34 6XX XXX XXX"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </FormField>

              <FormField label="Sector" icon={<Briefcase className="w-3.5 h-3.5" />}>
                <select
                  value={form.sector}
                  onChange={(e) => handleChange('sector', e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="">Sin especificar</option>
                  {SECTORS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </FormField>
            </div>
          </div>
        </div>

        {/* Notifications section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-4 h-4 text-zinc-500" />
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Notificaciones por email
            </h2>
          </div>

          <div className="space-y-1">
            <NotifToggle
              label="Nuevos mensajes del equipo"
              description="Recibe un email cuando el equipo te escriba"
              checked={form.notify_messages}
              onChange={(v) => handleChange('notify_messages', v)}
            />
            <NotifToggle
              label="Actualizaciones de propuestas"
              description="Cuando se envíe o actualice tu propuesta"
              checked={form.notify_proposals}
              onChange={(v) => handleChange('notify_proposals', v)}
            />
            <NotifToggle
              label="Recordatorios de pago"
              description="Notificaciones sobre pagos pendientes"
              checked={form.notify_payments}
              onChange={(v) => handleChange('notify_payments', v)}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>

          {saved && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 text-sm text-emerald-400"
            >
              <CheckCircle2 className="w-4 h-4" />
              Cambios guardados
            </motion.div>
          )}
        </div>
      </form>
    </motion.div>
  );
}

function FormField({
  label,
  icon,
  required,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 mb-1.5">
        <span className="text-zinc-600">{icon}</span>
        {label}
        {required && <span className="text-emerald-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function NotifToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      className="flex items-center justify-between gap-4 py-3.5 border-b border-zinc-800/60 last:border-0 cursor-pointer group"
      onClick={() => onChange(!checked)}
    >
      <div>
        <p className="text-sm text-zinc-300 group-hover:text-white transition-colors">{label}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
      </div>
      <div
        className={`relative shrink-0 w-10 rounded-full transition-colors ${
          checked ? 'bg-emerald-600' : 'bg-zinc-700'
        }`}
        style={{ height: '22px' }}
      >
        <div
          className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-[3px]'
          }`}
        />
      </div>
    </div>
  );
}
