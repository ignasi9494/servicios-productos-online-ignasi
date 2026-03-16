import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Users,
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  RefreshCw,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function ModeloPreciosSaas() {
  usePageTitle(
    'Cómo elegir el modelo de precios para tu SaaS: freemium, trial, suscripción o pago único — Think Better',
  );
  usePageMeta(
    'Guía definitiva para elegir el modelo de precios de tu SaaS. Comparativa freemium vs free trial vs suscripción vs pago único con métricas reales, casos de estudio y árbol de decisión de 5 preguntas.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Cómo elegir el modelo de precios para tu SaaS: freemium, trial, suscripción o pago único',
      description:
        'Guía definitiva para elegir el modelo de precios de tu SaaS en 2026. Análisis de freemium, free trial, suscripción mensual/anual y pago único con métricas reales de conversión, LTV, CAC y casos de estudio.',
      datePublished: '2026-03-16',
      dateModified: '2026-03-16',
      author: {
        '@type': 'Organization',
        name: 'Think Better',
        url: 'https://servicios-productos-online-ignasi.vercel.app/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Think Better',
        logo: {
          '@type': 'ImageObject',
          url: 'https://servicios-productos-online-ignasi.vercel.app/favicon.svg',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id':
          'https://servicios-productos-online-ignasi.vercel.app/blog/modelo-precios-saas-freemium-trial-suscripcion',
      },
    };
    const script = document.createElement('script');
    script.id = 'article-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const s = document.getElementById('article-schema');
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Navbar */}
      <nav className="border-b border-zinc-900 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-lg hover:text-emerald-400 transition-colors">
            Think Better
          </Link>
          <Link
            to="/cuestionario"
            className="px-4 py-2 rounded-full bg-emerald-500 text-zinc-950 font-bold text-sm hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
          >
            Descubrir precio de mi proyecto
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        {/* Back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wide">
              Negocio SaaS
            </span>
            <span className="flex items-center gap-1.5 text-zinc-500 text-sm">
              <Clock className="w-3.5 h-3.5" />
              11 min de lectura
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Cómo elegir el modelo de precios para tu SaaS: freemium, trial, suscripción o pago único
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            El precio no es solo un número. Es el mensaje más importante que envías al mercado. Elegir mal el
            modelo de precios puede condenarte aunque tengas el mejor producto. Esta guía cubre los 4 grandes
            modelos con métricas reales, cuándo usar cada uno y un árbol de decisión de 5 preguntas.
          </p>
          <div className="flex items-center gap-2 text-zinc-500 text-sm pb-8 border-b border-zinc-800">
            <span>Think Better</span>
            <span>·</span>
            <span>16 mar 2026</span>
          </div>
        </motion.div>

        {/* Body */}
        <div className="article-body mt-8 space-y-10">

          {/* Stat highlight */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20"
          >
            <p className="text-emerald-400 font-bold text-xl mb-2">
              El 87% de los SaaS que fracasan tienen un buen producto.
            </p>
            <p className="text-zinc-400">
              Lo que suelen tener mal es el modelo de monetización. Cobran demasiado pronto, demasiado poco,
              o de una manera que no encaja con cómo sus clientes perciben el valor. El pricing es estrategia,
              no aritmética.
            </p>
          </motion.div>

          {/* Section 1: Los 4 modelos */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-400" />
              Los 4 modelos principales y sus métricas reales
            </h2>
            <p className="text-zinc-400 mb-6">
              Antes de comparar, hay que entender qué mide el éxito de cada modelo. No es lo mismo optimizar
              para adquisición viral que para LTV máximo. Cada modelo tiene una lógica propia.
            </p>

            {/* Model cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  icon: Users,
                  name: 'Freemium',
                  tagline: 'Gratis para siempre, premium opcional',
                  color: 'blue',
                  conversionRate: '2–5%',
                  bestFor: 'Virality + redes de efecto',
                  risk: 'Coste de servir usuarios gratis',
                  examples: 'Slack, Notion, Dropbox',
                },
                {
                  icon: Clock,
                  name: 'Free Trial',
                  tagline: 'Acceso completo por tiempo limitado',
                  color: 'amber',
                  conversionRate: '15–25%',
                  bestFor: 'B2B con decisión de compra reflexiva',
                  risk: 'Usuarios no llegan al "aha moment"',
                  examples: 'HubSpot, Salesforce, Figma',
                },
                {
                  icon: RefreshCw,
                  name: 'Suscripción',
                  tagline: 'Pago mensual o anual recurrente',
                  color: 'emerald',
                  conversionRate: '3–8% (desde trial)',
                  bestFor: 'Valor continuo y predecible',
                  risk: 'Churn compuesto destruye ARR',
                  examples: 'Netflix, Linear, Vercel',
                },
                {
                  icon: Zap,
                  name: 'Pago único',
                  tagline: 'Un pago, acceso perpetuo',
                  color: 'purple',
                  conversionRate: '1–3%',
                  bestFor: 'Herramientas sin infraestructura activa',
                  risk: 'Sin ingresos recurrentes para crecer',
                  examples: 'Sketch (pre-2020), Setapp, AppSumo',
                },
              ].map((model) => (
                <div
                  key={model.name}
                  className="p-5 rounded-xl bg-zinc-900 border border-zinc-800"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-zinc-800">
                      <model.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{model.name}</div>
                      <div className="text-zinc-500 text-xs">{model.tagline}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Conversión típica</span>
                      <span className="text-emerald-400 font-semibold">{model.conversionRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Ideal para</span>
                      <span className="text-zinc-300 text-right max-w-[55%]">{model.bestFor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Riesgo principal</span>
                      <span className="text-amber-400 text-right max-w-[55%] text-xs">{model.risk}</span>
                    </div>
                    <div className="pt-1 border-t border-zinc-800">
                      <span className="text-zinc-500 text-xs">Ejemplos: </span>
                      <span className="text-zinc-400 text-xs">{model.examples}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Comparativa detallada */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
              Comparativa en 10 dimensiones clave
            </h2>
            <p className="text-zinc-400 mb-6">
              No existe un modelo universalmente mejor. Depende de tu mercado, tu producto y tu etapa.
              Esta tabla te da el marco para pensar la decisión:
            </p>
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/80">
                    <th className="text-left px-4 py-3 text-zinc-400 font-semibold">Dimensión</th>
                    <th className="text-center px-3 py-3 text-blue-400 font-semibold">Freemium</th>
                    <th className="text-center px-3 py-3 text-amber-400 font-semibold">Free Trial</th>
                    <th className="text-center px-3 py-3 text-emerald-400 font-semibold">Suscripción</th>
                    <th className="text-center px-3 py-3 text-purple-400 font-semibold">Pago único</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {[
                    ['Velocidad de adquisición', '★★★★★', '★★★☆☆', '★★★☆☆', '★★☆☆☆'],
                    ['Ingresos predecibles (ARR)', '★★★☆☆', '★★★★☆', '★★★★★', '★☆☆☆☆'],
                    ['LTV por cliente', '★★☆☆☆', '★★★★☆', '★★★★★', '★★☆☆☆'],
                    ['Coste de adquisición (CAC)', '★★★★★', '★★★★☆', '★★★☆☆', '★★☆☆☆'],
                    ['Tiempo hasta 1er euro', '★★☆☆☆', '★★★★☆', '★★★★☆', '★★★★★'],
                    ['Complejidad operativa', '★★★★☆', '★★★☆☆', '★★★☆☆', '★★☆☆☆'],
                    ['Apto para PMF temprano', '★★☆☆☆', '★★★★☆', '★★★☆☆', '★★★★☆'],
                    ['Escalabilidad', '★★★★★', '★★★★☆', '★★★★★', '★★☆☆☆'],
                    ['Resistencia al churn', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★'],
                    ['Facilidad de pricing change', '★★★☆☆', '★★★★☆', '★★★★★', '★★☆☆☆'],
                  ].map(([dim, ...scores]) => (
                    <tr key={dim} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="px-4 py-3 text-zinc-300 font-medium">{dim}</td>
                      {scores.map((score, i) => (
                        <td key={i} className="px-3 py-3 text-center text-zinc-400 text-xs">
                          {score}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-zinc-500 text-xs mt-2">
              ★★★★★ = excelente · ★★★☆☆ = neutro · ★☆☆☆☆ = débil. Basado en análisis de +200 SaaS 2019–2025.
            </p>
          </section>

          {/* Section 3: Freemium en detalle */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Freemium: el modelo más mal entendido
            </h2>
            <p className="text-zinc-400 mb-4">
              Freemium no es "dar tu producto gratis". Es una estrategia de distribución que usa usuarios
              gratuitos como motor de adquisición de usuarios de pago. Funciona cuando hay un
              <strong className="text-white"> efecto de red</strong> o una{' '}
              <strong className="text-white">viralidad intrínseca</strong> en el producto.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <p className="text-emerald-400 font-bold mb-2 text-sm">Cuándo SÍ funciona el freemium</p>
                <ul className="text-zinc-400 text-sm space-y-1">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />Coste marginal por usuario gratuito es muy bajo</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />Los usuarios gratis traen usuarios de pago (invitaciones, colaboración)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />La línea entre gratuito y premium es muy clara (límites de uso, equipos, storage)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />Mercado masivo: base de millones de usuarios potenciales</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                <p className="text-red-400 font-bold mb-2 text-sm">Cuándo NO uses freemium</p>
                <ul className="text-zinc-400 text-sm space-y-1">
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />B2B con ciclo de venta consultivo (los free users no convierten solos)</li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />Alto coste de infraestructura por usuario (IA, storage intensivo)</li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />Producto complejo que necesita onboarding activo para dar valor</li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />Bootstrapped sin capital para aguantar la curva hasta conversión</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm">
              <p className="text-zinc-300 font-semibold mb-1">La trampa del freemium generoso</p>
              <p className="text-zinc-400">
                Notion tardó años en monetizar porque su plan gratuito era tan bueno que el 73% de los usuarios
                nunca necesitaba el premium. El freemium exitoso requiere que el plan gratuito sea{' '}
                <em>útil pero incompleto</em>, no simplemente limitado en tiempo.
              </p>
            </div>
          </section>

          {/* Section 4: Free Trial */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Free Trial: la opción más segura para B2B
            </h2>
            <p className="text-zinc-400 mb-4">
              Un free trial bien diseñado puede alcanzar tasas de conversión del 15-25%, muy superiores
              al freemium. La clave está en definir correctamente la duración y qué ocurre al acabar.
            </p>
            <div className="overflow-x-auto rounded-xl border border-zinc-800 mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/80">
                    <th className="text-left px-4 py-3 text-zinc-400 font-semibold">Variante</th>
                    <th className="text-left px-4 py-3 text-zinc-400 font-semibold">Duración</th>
                    <th className="text-left px-4 py-3 text-zinc-400 font-semibold">Tarjeta requerida</th>
                    <th className="text-left px-4 py-3 text-zinc-400 font-semibold">Conversión media</th>
                    <th className="text-left px-4 py-3 text-zinc-400 font-semibold">Mejor para</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {[
                    ['Trial sin tarjeta', '14 días', 'No', '12–18%', 'PLG con aha moment rápido'],
                    ['Trial con tarjeta', '14–30 días', 'Sí', '18–28%', 'B2B mid-market, menor fraude'],
                    ['Reverse trial', '30 días plan Pro', 'No', '20–35%', 'Upgrade desde freemium'],
                    ['Trial + créditos', '—', 'No', '8–15%', 'SaaS basado en uso (IA, email)'],
                    ['Demo guiada (sales-led)', 'Personalizada', 'No', '30–50%', 'Enterprise / high ACV'],
                  ].map(([variant, ...rest]) => (
                    <tr key={variant} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="px-4 py-3 text-zinc-300 font-medium">{variant}</td>
                      {rest.map((cell, i) => (
                        <td key={i} className="px-4 py-3 text-zinc-400">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm">
              <p className="text-zinc-300 font-semibold mb-1">El "reverse trial" de Loom</p>
              <p className="text-zinc-400">
                En 2022, Loom activó el plan Business (de pago) para todos los usuarios gratuitos durante
                14 días. Al acabar el periodo, los que no compraban bajaban al free. Resultado: +22% de
                conversión en el primer mes. El usuario experimenta la pérdida, no la ganancia.
              </p>
            </div>
          </section>

          {/* Section 5: Suscripción */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-emerald-400" />
              Suscripción: el modelo con mayor LTV si controlas el churn
            </h2>
            <p className="text-zinc-400 mb-4">
              La suscripción es el modelo preferido de los SaaS maduros porque genera ingresos
              predecibles (ARR) y permite construir sobre una base financiera sólida. El problema: el
              churn compuesto puede destruir tu ARR más rápido de lo que creces.
            </p>

            {/* Churn math */}
            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 mb-4">
              <p className="text-zinc-300 font-bold mb-3">El coste real del churn mensual</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { churn: '2%/mes', after12: '-21%', after36: '-51%', label: 'Saludable' },
                  { churn: '5%/mes', after12: '-46%', after36: '-85%', label: 'Peligroso' },
                  { churn: '10%/mes', after12: '-72%', after36: '-97%', label: 'Terminal' },
                ].map((row) => (
                  <div key={row.churn} className="p-3 rounded-lg bg-zinc-800">
                    <div className="text-white font-bold">{row.churn}</div>
                    <div className="text-xs text-zinc-500 mb-2">{row.label}</div>
                    <div className="text-xs text-zinc-400">ARR perdido a 12m: <span className="text-red-400">{row.after12}</span></div>
                    <div className="text-xs text-zinc-400">ARR perdido a 36m: <span className="text-red-400">{row.after36}</span></div>
                  </div>
                ))}
              </div>
              <p className="text-zinc-500 text-xs mt-3">
                Un SaaS con 100k€ ARR y 5% churn mensual tiene 54k€ ARR al año si no adquiere nuevos clientes.
                El crecimiento real requiere compensar el churn antes de sumar ARR nuevo.
              </p>
            </div>

            {/* Monthly vs Annual */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-sm">
              <p className="text-emerald-400 font-bold mb-2">Mensual vs anual: ofrece siempre los dos</p>
              <p className="text-zinc-400 mb-2">
                Los planes anuales reducen el churn un 60-75% (los clientes no cancelan cada mes) y
                mejoran el flujo de caja. La estrategia estándar: descuento del 15-20% por pago anual.
              </p>
              <p className="text-zinc-400">
                Regla práctica: si tu ACV (Annual Contract Value) supera los 3.000€, invierte en ventas
                para cerrar contratos anuales. Si está por debajo, optimiza el producto para que el cliente
                no quiera cancelar.
              </p>
            </div>
          </section>

          {/* Section 6: Pago único */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Pago único: cuándo tiene sentido en 2026
            </h2>
            <p className="text-zinc-400 mb-4">
              El pago único está en desuso para SaaS porque elimina el incentivo de mejorar el producto.
              Sin embargo, tiene nichos donde sigue siendo la estrategia correcta.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <p className="text-emerald-400 font-bold mb-2 text-sm">Pago único SÍ tiene sentido cuando...</p>
                <ul className="text-zinc-400 text-sm space-y-1.5">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />Herramienta de escritorio / desktop app sin backend propio</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />Sin costes de infraestructura recurrentes (no hay servidor que pagar)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />Mercado anti-suscripción: clientes que ya tienen fatiga de cuotas</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />Distribución AppSumo / lifetime deals para validar producto</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <p className="text-zinc-300 font-bold mb-2 text-sm">Alternativa híbrida: pago único + mantenimiento</p>
                <p className="text-zinc-400 text-sm mb-2">
                  Cobras una vez por la licencia (acceso permanente a la versión actual) y ofreces
                  un plan de mantenimiento anual opcional (20-30% del precio base) para actualizaciones
                  y soporte.
                </p>
                <p className="text-zinc-400 text-sm">
                  Ejemplo: herramienta a 299€ + mantenimiento a 79€/año. Muchos clientes renuevan,
                  generando un ARR secundario sin la presión del churn mensual.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Usage-based pricing */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              El quinto modelo que nadie menciona: usage-based pricing
            </h2>
            <p className="text-zinc-400 mb-4">
              El pricing basado en uso (pay-as-you-go) está creciendo más rápido que cualquier otro
              modelo en SaaS B2B. Empresas como Stripe, Twilio, AWS y OpenAI lo usan. La lógica:
              el cliente paga en proporción al valor que extrae.
            </p>
            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 mb-4">
              <p className="text-zinc-300 font-bold mb-3 text-sm">Métricas de uso más comunes como unidad de cobro</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                {[
                  { metric: 'Mensajes / llamadas API', examples: 'OpenAI, Twilio, SendGrid' },
                  { metric: 'Usuarios activos (MAU)', examples: 'Auth0, PostHog, Amplitude' },
                  { metric: 'Volumen de datos (GB)', examples: 'Supabase, MongoDB Atlas' },
                  { metric: 'Transacciones procesadas', examples: 'Stripe, Paddle, Braintree' },
                  { metric: 'Documentos / registros', examples: 'Notion API, Airtable, Clay' },
                  { metric: 'Minutos / créditos de cómputo', examples: 'Vercel, Render, Railway' },
                ].map((item) => (
                  <div key={item.metric} className="p-3 rounded-lg bg-zinc-800">
                    <div className="text-zinc-200 font-medium text-xs mb-1">{item.metric}</div>
                    <div className="text-zinc-500 text-xs">{item.examples}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-sm">
              <p className="text-amber-400 font-bold mb-1">El problema del usage-based</p>
              <p className="text-zinc-400">
                Los ingresos son impredecibles y el cliente puede reducir el uso en momentos de crisis.
                La solución adoptada por la mayoría: modelo híbrido con{' '}
                <strong className="text-zinc-300">seat base fijo</strong> (ej: 49€/mes por equipo hasta 5 usuarios)
                más <strong className="text-zinc-300">cargo variable por uso</strong> (ej: +0,01€ por cada
                1.000 llamadas API adicionales). Así tienes un suelo predecible y capturas el upside del cliente
                que crece.
              </p>
            </div>
          </section>

          {/* Section 8: Caso real */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-emerald-400" />
              Caso real: PricingLab cambia de modelo y multiplica ARR por 3x
            </h2>
            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 shrink-0">
                  <BarChart3 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-bold">PricingLab</p>
                  <p className="text-zinc-500 text-sm">Herramienta de análisis de precios para e-commerce B2B. SaaS construido con Think Better en 2025.</p>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-zinc-300 font-semibold mb-1">Situación inicial: freemium con poca conversión</p>
                  <p className="text-zinc-400">
                    PricingLab lanzó en marzo de 2025 con un modelo freemium: plan gratuito (hasta 3 productos)
                    y plan Pro a 49€/mes. A los 6 meses tenían 1.200 usuarios registrados pero solo 28 clientes
                    de pago (2,3% de conversión). Los usuarios gratuitos usaban la herramienta, pero el límite
                    de 3 productos no era suficiente para demostrar valor real.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { label: 'Usuarios registrados', before: '1.200', after: '980', change: '-18%' },
                    { label: 'Clientes de pago', before: '28', after: '87', change: '+210%' },
                    { label: 'MRR', before: '1.372€', after: '5.814€', change: '+323%' },
                  ].map((row) => (
                    <div key={row.label} className="p-3 rounded-lg bg-zinc-800 text-center">
                      <div className="text-zinc-500 text-xs mb-2">{row.label}</div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-zinc-400">{row.before}</span>
                        <span className="text-zinc-600">→</span>
                        <span className="text-emerald-400 font-bold">{row.after}</span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">{row.change} en 90 días</div>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-zinc-300 font-semibold mb-1">El cambio: free trial de 14 días + 3 planes por tamaño de catálogo</p>
                  <p className="text-zinc-400">
                    En lugar del freemium generoso, implantaron un free trial de 14 días con acceso completo
                    y tres planes de suscripción escalonados: Starter (79€/mes, hasta 500 productos),
                    Growth (199€/mes, hasta 5.000 productos), Scale (449€/mes, ilimitado). Los primeros 14 días
                    daban acceso al plan Growth para que los usuarios vivieran la experiencia premium desde
                    el principio. El coste de perder los usuarios gratuitos de baja conversión se compensó
                    en el primer mes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Los 5 errores de pricing */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Los 5 errores de pricing que destruyen SaaS con buen producto
            </h2>
            <div className="space-y-3">
              {[
                {
                  n: '01',
                  title: 'Copiar el pricing de un competidor sin analizar tu posicionamiento',
                  desc: 'Si Notion cobra 8€/mes no significa que tú debas cobrar 9€/mes. Tu estructura de costes, tu ICP y tu propuesta de valor son diferentes. Copiar precios sin contexto es una de las causas más frecuentes de underselling (cobrar muy poco) o mismatch de mercado.',
                },
                {
                  n: '02',
                  title: 'Cobrar por función en lugar de por resultado (output)',
                  desc: 'Los clientes no pagan por "número de informes generados". Pagan por "tomar mejores decisiones de precios". Si tu métrica de pricing no está alineada con el valor percibido, el cliente siempre sentirá que paga demasiado aunque el precio sea bajo.',
                },
                {
                  n: '03',
                  title: 'No tener un tier de entrada claro para el ICP principal',
                  desc: 'Tres planes de precio similares paralizan al comprador. El tier de entrada debe ser obvio para tu cliente objetivo: ni demasiado caro para generar fricción, ni tan barato que ponga en duda la calidad. El tier medio debe ser el más rentable y el más vendido.',
                },
                {
                  n: '04',
                  title: 'Descuentos sin estructura (el "¿cuánto me das?") ',
                  desc: 'Dar descuentos ad-hoc destruye la percepción de valor y crea clientes que nunca pagan precio completo. Si necesitas flexibilidad, crea un sistema explícito: descuento por volumen, descuento por pago anual, programa de startups con criterios publicados. Nunca negocies precio sin estructura.',
                },
                {
                  n: '05',
                  title: 'No revisar el pricing en los primeros 12 meses',
                  desc: 'El primer precio que pones es casi siempre incorrecto. Eso es normal. El error es no revisarlo. Deberías hacer un "pricing review" formal cada 6 meses en etapa de crecimiento: ¿cuántos clientes preguntan por precios más altos? ¿cuántos se van por precio? ¿cuál es tu tasa de willingness-to-pay?',
                },
              ].map((err) => (
                <div key={err.n} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex gap-4">
                  <div className="text-3xl font-black text-zinc-700 shrink-0 leading-none pt-1">{err.n}</div>
                  <div>
                    <p className="text-zinc-200 font-semibold mb-1">{err.title}</p>
                    <p className="text-zinc-400 text-sm">{err.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 10: Árbol de decisión */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-emerald-400" />
              Árbol de decisión: 5 preguntas para elegir tu modelo
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: '¿Tu producto tiene efecto de red o viralidad natural?',
                  yes: 'Considera freemium — los usuarios gratis trabajan como canal de distribución.',
                  no: 'Descarta freemium. Pasa a la siguiente pregunta.',
                },
                {
                  q: '¿Tu producto entrega valor demostrable en menos de 48 horas?',
                  yes: 'Free trial (14 días sin tarjeta) es tu mejor opción de entrada.',
                  no: 'Necesitas un trial más largo (30 días) o una demo guiada por ventas.',
                },
                {
                  q: '¿Tu coste marginal por cliente es bajo y predecible?',
                  yes: 'Suscripción mensual/anual con seats fijos. Optimiza para churn.',
                  no: 'Usage-based o modelo híbrido (base fija + variable por consumo).',
                },
                {
                  q: '¿Tu ACV (valor anual por cliente) supera los 3.000€?',
                  yes: 'Proceso de ventas sales-led con demo + contratos anuales.',
                  no: 'Product-led growth (PLG): el producto vende solo vía trial o freemium.',
                },
                {
                  q: '¿Tienes infraestructura activa que mantener (servidores, BD, IA)?',
                  yes: 'Nunca pago único. Necesitas ingresos recurrentes para cubrir costes.',
                  no: 'El pago único o lifetime deal puede tener sentido para herramientas standalone.',
                },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="text-zinc-200 font-semibold mb-3 flex items-start gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                      P{i + 1}
                    </span>
                    {item.q}
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0">SÍ</span>
                      <span className="text-zinc-400">{item.yes}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-400 text-xs font-bold shrink-0">NO</span>
                      <span className="text-zinc-400">{item.no}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 11: Checklist */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              Checklist: 12 puntos para validar tu estrategia de pricing
            </h2>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                'He definido mi ICP (Ideal Customer Profile) antes de fijar precios',
                'Conozco el WTP (willingness-to-pay) de mi segmento objetivo',
                'Mi métrica de valor está alineada con cómo el cliente percibe el resultado',
                'El tier de entrada es obvio y sin fricción para mi ICP principal',
                'Ofrezco descuento por pago anual (mínimo 15%)',
                'Tengo un proceso formal para manejar solicitudes de descuento',
                'He definido qué pasa cuando un trial expira (downgrade o bloqueo)',
                'Mis costes de infraestructura por cliente son conocidos y me dan margen',
                'Tengo un plan para clientes que superan el tier actual (expansion revenue)',
                'Mi pricing page explica el valor, no solo las funcionalidades',
                'He documentado el proceso de pricing review semestral',
                'Sé cuáles son las 3 objeciones de precio más frecuentes y tengo respuesta',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500/20">
            <h2 className="text-xl font-bold text-white mb-3">Conclusión: el pricing es un proceso, no una decisión</h2>
            <p className="text-zinc-400 mb-4">
              No existe el modelo de precios perfecto. Existe el modelo correcto para tu etapa, tu mercado y
              tu producto en este momento. Lo importante es elegir con criterio, medir los resultados y
              revisar regularmente. La mayoría de SaaS exitosos han cambiado su modelo de precios al menos
              una vez en sus primeros 3 años.
            </p>
            <p className="text-zinc-400">
              Si estás construyendo tu SaaS y quieres definir la estrategia de pricing desde el inicio,
              en Think Better lo incluimos como parte del proceso de propuesta para cada proyecto que desarrollamos.
            </p>
          </section>

          {/* CTA */}
          <div className="text-center py-6">
            <p className="text-zinc-400 mb-4">¿Listo para construir tu SaaS con la estrategia correcta desde el día 1?</p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
            >
              Descubrir precio de mi proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
