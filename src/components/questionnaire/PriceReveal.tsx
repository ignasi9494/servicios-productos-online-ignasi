import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Rocket, Building2, Layers, Clock, RefreshCw, Shield,
  ChevronRight, ArrowLeft, Calculator, Loader2,
} from 'lucide-react';
import { calculatePrice, type PriceResult, type QuestionnaireData } from '../../lib/priceCalculator';
import { supabase, supabaseConfigured } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface PriceRevealProps {
  extractedData: Record<string, unknown>;
  onGoBack: () => void;
}

const PLAN_INFO: Record<string, { icon: typeof Rocket; label: string; description: string; color: string }> = {
  launch: {
    icon: Rocket,
    label: 'Plan Starter',
    description: 'MVP y apps sencillas con auth y base de datos',
    color: 'text-emerald-400',
  },
  build: {
    icon: Building2,
    label: 'Plan Pro',
    description: 'SaaS completo con pagos, admin panel y lógica de negocio',
    color: 'text-cyan-400',
  },
  scale: {
    icon: Layers,
    label: 'Plan Growth',
    description: 'Software complejo con IA, integraciones y arquitectura escalable',
    color: 'text-purple-400',
  },
};

function formatPrice(n: number): string {
  return n.toLocaleString('es-ES');
}

function mapExtractedToQuestionnaireData(raw: Record<string, unknown>): QuestionnaireData {
  const features = (raw.features ?? {}) as Record<string, unknown>;
  const design = (raw.design ?? {}) as Record<string, unknown>;
  const content = (raw.content ?? {}) as Record<string, unknown>;
  const timeline = (raw.timeline ?? {}) as Record<string, unknown>;

  return {
    features: {
      projectType: (raw.projectType as string) ?? (features.projectType as string) ?? 'landing',
      isNew: raw.isNew !== undefined ? raw.isNew !== false : features.isNew !== false,
      pages: Number(features.pages) || 5,
      auth: (features.auth as 'none' | 'basic' | 'roles') ?? 'none',
      authSocial: features.authSocial === true,
      payments: (features.payments as 'none' | 'one-time' | 'recurring') ?? 'none',
      admin: (features.admin as 'none' | 'basic' | 'advanced') ?? 'none',
      database: (features.database as 'none' | 'simple' | 'complex') ?? 'none',
      integrations: Array.isArray(features.integrations) ? features.integrations as string[] : [],
      ai: Array.isArray(features.ai) ? features.ai as string[] : [],
      languages: Number(features.languages) || 1,
      blog: features.blog === true,
      ecommerce: features.ecommerce === true,
      inventory: features.inventory === true,
      shipping: features.shipping === true,
      pushNotifications: features.pushNotifications === true,
      seo: features.seo === true,
      mobilePlatforms: Number(features.mobilePlatforms) || 0,
      screens: Number(features.screens) || undefined,
    },
    design: {
      hasIdentity: design.hasIdentity !== false,
      style: (design.style as string) ?? 'moderno_bold',
    },
    content: {
      needsCreation: content.needsCreation === true,
    },
    timeline: {
      urgentDeadline: timeline.urgentDeadline === true,
    },
  };
}

export function PriceReveal({ extractedData, onGoBack }: PriceRevealProps) {
  const [phase, setPhase] = useState<'calculating' | 'reveal'>('calculating');
  const [result, setResult] = useState<PriceResult | null>(null);
  const [creating, setCreating] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const data = mapExtractedToQuestionnaireData(extractedData);
    const price = calculatePrice(data);
    setResult(price);

    const timer = setTimeout(() => setPhase('reveal'), 2500);
    return () => clearTimeout(timer);
  }, [extractedData]);

  /** Create a project in Supabase and redirect to dashboard */
  const handleCreateProject = useCallback(async () => {
    if (!user || !result || !supabaseConfigured) return;
    setCreating(true);
    try {
      const projectName = (extractedData.projectName as string)
        || (extractedData.companyName as string)
        || (extractedData.business_name as string)
        || 'Mi proyecto';

      const { data: project, error } = await supabase
        .from('projects')
        .insert({
          client_id: user.id,
          name: projectName,
          status: 'pending_proposal',
          plan: result.suggestedPlan,
          base_price: result.basePrice,
          extras_price: result.extrasTotal,
          total_price: result.totalEstimate.min,
          delivery_days: result.estimatedDays.min,
          max_iterations: result.includedIterations,
        })
        .select('id')
        .single();

      if (error) throw error;

      // Link questionnaire session to the new project
      // The engine stores state in 'tb_questionnaire_engine'
      try {
        const raw = localStorage.getItem('tb_questionnaire_engine');
        const engineState = raw ? JSON.parse(raw) : null;
        const sessionId = engineState?.sessionId;
        if (sessionId && project?.id) {
          await supabase
            .from('questionnaire_conversations')
            .update({ project_id: project.id })
            .eq('session_id', sessionId);
        }
      } catch {
        // Non-critical: continue even if linking fails
      }

      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('[PriceReveal] Failed to create project:', err);
      setCreating(false);
    }
  }, [user, result, extractedData, navigate]);

  if (phase === 'calculating') {
    return <CalculatingAnimation />;
  }

  if (!result) return null;

  const planInfo = PLAN_INFO[result.suggestedPlan];
  const PlanIcon = planInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 overflow-y-auto px-4 py-8"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Plan badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900 ${planInfo.color}`}>
            <PlanIcon className="w-5 h-5" />
            <span className="font-semibold text-sm">{planInfo.label}</span>
          </div>
          <p className="text-zinc-400 text-sm mt-2">{planInfo.description}</p>
        </motion.div>

        {/* Price reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center"
        >
          <p className="text-zinc-400 text-sm mb-2">Precio del proyecto</p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl sm:text-5xl font-bold text-white">
              {formatPrice(result.totalEstimate.min)}€
            </span>
          </div>
          <p className="text-zinc-500 text-xs mt-3">IVA no incluido</p>
        </motion.div>

        {/* Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-zinc-800 flex justify-between items-center">
            <span className="text-sm font-medium text-zinc-300">Precio base ({planInfo.label})</span>
            <span className="text-sm font-semibold text-white">{formatPrice(result.basePrice)}€</span>
          </div>

          {result.extras.map((extra, i) => (
            <div
              key={i}
              className="px-5 py-3 border-b border-zinc-800/50 flex justify-between items-center"
            >
              <div>
                <span className="text-sm text-zinc-300">{extra.name}</span>
                <span className="text-xs text-zinc-500 ml-2">{extra.category}</span>
              </div>
              <span className="text-sm text-emerald-400 font-medium">+{formatPrice(extra.price)}€</span>
            </div>
          ))}

          {result.extras.length === 0 && (
            <div className="px-5 py-3 border-b border-zinc-800/50 text-sm text-zinc-500">
              Sin extras adicionales
            </div>
          )}

          <div className="px-5 py-3 flex justify-between items-center bg-zinc-800/30">
            <span className="text-sm font-semibold text-zinc-200">Extras total</span>
            <span className="text-sm font-semibold text-emerald-400">+{formatPrice(result.extrasTotal)}€</span>
          </div>
        </motion.div>

        {/* Details grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-white">{result.estimatedDays.min}-{result.estimatedDays.max}</p>
            <p className="text-xs text-zinc-400">dias estimados</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <RefreshCw className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-white">{result.includedIterations}</p>
            <p className="text-xs text-zinc-400">iteraciones incluidas</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <Shield className="w-5 h-5 text-purple-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-white">{result.monthlyMaintenanceEstimate}€/mes</p>
            <p className="text-xs text-zinc-400">mantenimiento</p>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4"
        >
          <div className="flex gap-3 items-start">
            <Calculator className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-400 leading-relaxed">
              Este es un presupuesto orientativo basado en tus respuestas. En menos de 24 horas recibiras
              la propuesta definitiva con todos los detalles, alcance exacto y timeline detallado.
            </p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="space-y-3 pb-8"
        >
          {user ? (
            <button
              onClick={handleCreateProject}
              disabled={creating}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
            >
              {creating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creando tu proyecto...
                </>
              ) : (
                <>
                  Enviar consulta y ver mi panel
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <>
              <Link
                to="/registro"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
              >
                Regístrate para recibir tu propuesta
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white text-sm transition-colors"
              >
                Ya tengo cuenta — iniciar sesión
              </Link>
            </>
          )}

          <button
            onClick={onGoBack}
            className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quiero ajustar algo
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function CalculatingAnimation() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-6"
      >
        {/* Spinning calculator icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center"
        >
          <Calculator className="w-8 h-8 text-emerald-400" />
        </motion.div>

        <div className="space-y-2">
          <p className="text-lg font-semibold text-white">Calculando tu presupuesto...</p>
          <p className="text-sm text-zinc-400">Analizando tus necesidades y funcionalidades</p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
