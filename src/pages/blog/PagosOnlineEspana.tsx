import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CreditCard,
  TrendingUp,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function PagosOnlineEspana() {
  usePageTitle('Stripe, PayPal o Redsys: cómo aceptar pagos en tu app en España en 2026 — Think Better');
  usePageMeta(
    'Guía definitiva para elegir pasarela de pago en España en 2026. Comparativa completa Stripe vs PayPal vs Redsys vs Mollie: comisiones reales, Bizum, integración técnica y cuál elegir según tu tipo de negocio.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Stripe, PayPal o Redsys: cómo aceptar pagos en tu app o web en España en 2026',
      description:
        'Guía definitiva para elegir pasarela de pago en España en 2026. Comparativa completa Stripe vs PayPal vs Redsys vs Mollie: comisiones reales, Bizum, integración técnica y cuál elegir según tu tipo de negocio.',
      datePublished: '2026-03-15',
      dateModified: '2026-03-15',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/pagos-online-espana-stripe-paypal-redsys-2026',
      },
    };
    const script = document.createElement('script');
    script.id = 'article-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.getElementById('article-schema')?.remove();
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
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">Pagos</span>
            <span>15 mar 2026</span>
            <span>8 min de lectura</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Stripe, PayPal o Redsys: cómo aceptar pagos en tu app o web en España en 2026
          </h1>
          <p className="text-zinc-400 text-xl leading-relaxed">
            Elegir la pasarela equivocada te cuesta conversiones. Hemos integrado más de 15 sistemas de pago
            para clientes en España. Esto es lo que aprendimos.
          </p>
        </motion.header>

        {/* Article body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="article-body"
        >
          <p>
            Los pagos online en España tienen sus peculiaridades. El mercado europeo tiene normativas distintas
            a Estados Unidos —especialmente la <strong>Autenticación Reforzada de Clientes (SCA)</strong> que
            entró en vigor definitivamente en 2021—, tasas de abandono de carrito más altas con pasarelas
            desconocidas, y una dependencia cultural del Bizum que ningún CTO extranjero anticipa.
          </p>
          <p>
            Cuando montamos nuestra primera integración de pagos para un SaaS de Barcelona, asumimos que Stripe
            era la respuesta obvia. Y en muchos casos lo es. Pero hemos tenido clientes que multiplicaron su
            conversión integrando Redsys con Bizum, y otros que perdieron semanas enteras intentando hacer
            funcionar la documentación de un banco español. Esta guía te evita esos errores.
          </p>

          <h2>El contexto español que hay que entender antes de elegir</h2>
          <p>
            Antes de comparar plataformas, hay tres factores específicos del mercado español que condicionan la
            decisión:
          </p>
          <div className="grid md:grid-cols-3 gap-4 my-6">
            {[
              {
                icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
                title: 'SCA obligatoria',
                desc: 'Desde 2021, todos los pagos superiores a 30€ en Europa requieren doble factor de autenticación. Las pasarelas que no implementan 3DS2 correctamente generan fricción y abandonos.',
              },
              {
                icon: <Zap className="w-5 h-5 text-cyan-400" />,
                title: 'Bizum como método rey',
                desc: 'Más de 25 millones de usuarios activos en España. En B2C con ticket medio bajo (10-50€), no ofrecer Bizum puede costarte un 15-25% de conversión.',
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
                title: 'Desconfianza en marcas internacionales',
                desc: 'Un porcentaje relevante de usuarios españoles, especialmente mayores de 40, abandonan si no reconocen la pasarela. El logo de su banco en el checkout genera confianza inmediata.',
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="mb-2">{item.icon}</div>
                <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2>Las 4 opciones reales para empresas en España</h2>

          {/* Stripe */}
          <div className="my-8 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">1. Stripe</h3>
                <p className="text-zinc-500 text-sm">La mejor experiencia de desarrollo del mercado</p>
              </div>
            </div>
            <p className="text-zinc-300 text-sm mb-4">
              Stripe es el estándar de la industria para SaaS, marketplaces y empresas tech. Su API es la mejor
              documentada del sector, tiene soporte nativo para suscripciones, facturación automática, Connect
              para marketplaces, y una suite de herramientas (Radar, Billing, Tax) que te pueden ahorrar meses
              de desarrollo.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-semibold text-emerald-400 uppercase mb-2">Ventajas</p>
                <ul className="space-y-1.5">
                  {[
                    'API y documentación excelentes',
                    'Suscripciones nativas (Billing)',
                    'Checkout alojado sin código complejo',
                    '135+ métodos de pago',
                    'Soporte para SEPA Direct Debit',
                    'Dashboard de analíticas muy completo',
                    'Fraude automático con Stripe Radar',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-400 uppercase mb-2">Limitaciones</p>
                <ul className="space-y-1.5">
                  {[
                    'Sin Bizum nativo (requiere integración extra)',
                    '1.4% + 0.25€ por tarjeta europea',
                    '2.9% + 0.25€ tarjetas no europeas',
                    'Soporte por email, no telefónico',
                    'Fondos retenidos en cuentas nuevas',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium">
                Ideal para: SaaS y subscripciones
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium">
                Marketplaces (Stripe Connect)
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium">
                Startups B2B
              </span>
            </div>
          </div>

          {/* PayPal */}
          <div className="my-8 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">2. PayPal</h3>
                <p className="text-zinc-500 text-sm">El clásico para e-commerce con público amplio</p>
              </div>
            </div>
            <p className="text-zinc-300 text-sm mb-4">
              PayPal sigue siendo relevante en España principalmente por una razón: la confianza del consumidor
              final, especialmente en compras B2C de ticket medio-bajo. Para productos tech o SaaS, sin embargo,
              sus comisiones altas y la UX anticuada lo hacen una segunda opción en casi todos los escenarios.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-semibold text-emerald-400 uppercase mb-2">Ventajas</p>
                <ul className="space-y-1.5">
                  {[
                    'Reconocimiento de marca muy alto',
                    'Checkout como invitado muy rápido',
                    'Protección al comprador integrada',
                    'Aceptado globalmente',
                    'Fácil de integrar con plugins (WooCommerce)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-400 uppercase mb-2">Limitaciones</p>
                <ul className="space-y-1.5">
                  {[
                    '3.4% + 0.35€ por transacción',
                    'UX de checkout muy desactualizada',
                    'Alta tasa de disputas y chargebacks',
                    'Suscripciones limitadas y rígidas',
                    'API con documentación mediocre',
                    'Retención de fondos frecuente en cuentas nuevas',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                Ideal para: E-commerce B2C
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                Público general 35+
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                Tiendas WooCommerce
              </span>
            </div>
          </div>

          {/* Redsys */}
          <div className="my-8 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">3. Redsys</h3>
                <p className="text-zinc-500 text-sm">La pasarela de los bancos españoles — y la del Bizum</p>
              </div>
            </div>
            <p className="text-zinc-300 text-sm mb-4">
              Redsys es la plataforma tecnológica de pagos de prácticamente todos los bancos españoles (BBVA,
              CaixaBank, Santander, Sabadell...). Sus comisiones son las más bajas del mercado para volúmenes
              altos, y es la <strong>única forma nativa de integrar Bizum</strong> en una aplicación propia.
              El problema es su integración: documentación escasa, soporte bancario lento y una API que parece
              diseñada en 2005.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-semibold text-emerald-400 uppercase mb-2">Ventajas</p>
                <ul className="space-y-1.5">
                  {[
                    '✅ Bizum nativo — el mayor diferencial',
                    'Comisiones muy bajas (~0.8% + 0.15€)',
                    'Máxima confianza del consumidor español',
                    '3DS2 nativo y certificado',
                    'Ampliamente usado en sector público y retail',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-400 uppercase mb-2">Limitaciones</p>
                <ul className="space-y-1.5">
                  {[
                    'Documentación técnica muy pobre',
                    'Requiere contrato con banco (1-4 semanas)',
                    'Sin soporte para suscripciones nativas',
                    'Integración: 1-2 semanas vs 1-2 días de Stripe',
                    'Sin dashboard propio de analíticas',
                    'Soporte técnico muy lento',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                Ideal para: E-commerce B2C con alto volumen
              </span>
              <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                Negocios con clientela española tradicional
              </span>
              <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                Sectores regulados
              </span>
            </div>
          </div>

          {/* Mollie */}
          <div className="my-8 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">4. Mollie</h3>
                <p className="text-zinc-500 text-sm">La alternativa europea que muchos pasan por alto</p>
              </div>
            </div>
            <p className="text-zinc-300 text-sm mb-4">
              Mollie es la pasarela europea que más ha crecido en España en los últimos dos años. Ofrece una API
              limpia comparable a Stripe, soporte en español, métodos de pago locales europeos (iDEAL, Bancontact,
              Giropay) y sin cuotas mensuales fijas. Para e-commerce europeo multi-mercado, es una opción muy sólida.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-semibold text-emerald-400 uppercase mb-2">Ventajas</p>
                <ul className="space-y-1.5">
                  {[
                    'API moderna y bien documentada',
                    'Soporte en español',
                    'Sin cuotas mensuales fijas',
                    '1.2% + 0.25€ por tarjeta europea',
                    'Ideal para expansión europea',
                    'Checkout sencillo de personalizar',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-400 uppercase mb-2">Limitaciones</p>
                <ul className="space-y-1.5">
                  {[
                    'Ecosistema más pequeño que Stripe',
                    'Sin Bizum',
                    'Suscripciones menos maduras que Stripe',
                    'Menor comunidad de desarrolladores',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium">
                Ideal para: E-commerce multi-país en Europa
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium">
                Startups sin suscripciones complejas
              </span>
            </div>
          </div>

          <h2>Comparativa de comisiones y características clave</h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Característica</th>
                  <th className="text-center py-3 px-4 text-indigo-400 font-semibold">Stripe</th>
                  <th className="text-center py-3 px-4 text-blue-400 font-semibold">PayPal</th>
                  <th className="text-center py-3 px-4 text-red-400 font-semibold">Redsys</th>
                  <th className="text-center py-3 px-4 text-amber-400 font-semibold">Mollie</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {[
                  ['Tarjeta EU (por transacción)', '1.4% + 0.25€', '3.4% + 0.35€', '~0.8% + 0.15€', '1.2% + 0.25€'],
                  ['Tarjeta no-EU', '2.9% + 0.25€', '4.4% + 0.35€', 'N/A', '2.9% + 0.25€'],
                  ['Bizum', '❌', '❌', '✅', '❌'],
                  ['Suscripciones nativas', '✅✅', '⚠️ limitado', '❌', '⚠️ básico'],
                  ['Tiempo de integración', '1-2 días', '1-2 días', '1-2 semanas', '2-3 días'],
                  ['Calidad de API', '⭐⭐⭐⭐⭐', '⭐⭐⭐', '⭐', '⭐⭐⭐⭐'],
                  ['Soporte en español', '❌ (email EN)', '⚠️', '✅ (banco)', '✅'],
                  ['Cuota mensual mínima', 'No', 'No', 'Sí (banco)', 'No'],
                ].map(([feat, ...vals], i) => (
                  <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-900/30">
                    <td className="py-3 px-4 text-zinc-400 font-medium">{feat}</td>
                    {vals.map((v, j) => (
                      <td key={j} className="py-3 px-4 text-center">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>El árbol de decisión: cuál elegir según tu negocio</h2>
          <div className="space-y-4 my-6">
            {[
              {
                condition: '¿Estás construyendo un SaaS o producto con suscripciones?',
                answer: 'Stripe sin duda.',
                detail:
                  'Stripe Billing es la herramienta más completa para suscripciones, upgrades/downgrades, trials y facturación automática. No tiene competidor real para este caso de uso.',
                color: 'indigo',
              },
              {
                condition: '¿Tienes una tienda online B2C con cliente final español (no tech)?',
                answer: 'Stripe + complementar con Redsys/Bizum si el ticket es bajo.',
                detail:
                  'Empieza con Stripe para la mayoría de pagos. Si ves que pierdes conversión en el paso de pago, añade Bizum via Redsys como método adicional. Es la combinación que mejor funciona para e-commerce español.',
                color: 'emerald',
              },
              {
                condition: '¿Tu negocio tiene volumen alto (>100k€/mes) y quieres optimizar comisiones?',
                answer: 'Negocia con tu banco (Redsys) o habla con Adyen.',
                detail:
                  'A partir de cierto volumen, las comisiones fijas de Stripe se vuelven caras. Redsys negocia tarifas por volumen, y Adyen (para empresas >10M€/año) tiene las comisiones más bajas del mercado.',
                color: 'amber',
              },
              {
                condition: '¿Vendes en varios países de la UE?',
                answer: 'Stripe o Mollie.',
                detail:
                  'Ambos soportan métodos de pago locales en toda Europa. Mollie tiene ligera ventaja en Países Bajos, Bélgica y Alemania por el soporte de iDEAL y Bancontact. Stripe gana en ecosistema y herramientas.',
                color: 'cyan',
              },
              {
                condition: '¿Quieres integrar lo más rápido posible para validar?',
                answer: 'Stripe Payment Links o Checkout.',
                detail:
                  'Puedes aceptar pagos en 30 minutos sin código. Crea un Payment Link desde el dashboard de Stripe y pégalo en tu web o compártelo por WhatsApp. Perfecto para MVPs y validación.',
                color: 'emerald',
              },
            ].map((item, i) => (
              <div key={i} className={`p-5 rounded-xl border bg-zinc-900/50 border-zinc-800`}>
                <div className="flex items-start gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                  <p className="text-zinc-300 font-medium">{item.condition}</p>
                </div>
                <div className={`ml-8`}>
                  <p className="text-emerald-400 font-bold mb-1">→ {item.answer}</p>
                  <p className="text-zinc-400 text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <h2>Caso real: e-commerce de moda que aumentó conversión un 23%</h2>
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 my-6">
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              Una tienda de ropa sostenible en Barcelona nos contactó porque su tasa de conversión en el paso
              de pago era del 61%, cuando el promedio del sector ronda el 70-75%. Tenían solo tarjeta de crédito
              via Stripe.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              <strong className="text-white">Análisis:</strong> Su cliente tipo era mujer entre 28-45 años,
              con ticket medio de 65€. Exactamente el perfil que usa Bizum masivamente. Implementamos Redsys
              en paralelo a Stripe, añadiendo Bizum como método de pago destacado en el checkout.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              <strong className="text-white">Resultado a los 30 días:</strong> Conversión subió del 61% al 75%.
              El 38% de los pagos se hacían ya por Bizum. La integración técnica costó 2.200€ y tardó 12 días
              (la mayor parte esperando al banco). ROI positivo en 3 semanas.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { metric: '+23%', label: 'más conversión en checkout' },
                { metric: '38%', label: 'de pagos via Bizum' },
                { metric: '3 sem', label: 'para ROI positivo' },
              ].map((m, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-emerald-400">{m.metric}</p>
                  <p className="text-zinc-500 text-xs mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <h2>Por qué nosotros siempre empezamos con Stripe</h2>
          <p>
            En Think Better, nuestra posición por defecto es Stripe para el 90% de los proyectos que
            construimos. No es dogma — es pragmatismo:
          </p>
          <ul>
            <li>
              <strong>Velocidad de integración:</strong> Una tarde para tener pagos funcionando. Con Redsys,
              necesitas contrato bancario, entorno de pruebas propio del banco y 3 veces más código.
            </li>
            <li>
              <strong>Suscripciones sin sorpresas:</strong> Stripe Billing gestiona proration, trials, upgrades,
              dunning (recuperación de pagos fallidos) y webhooks de manera robusta. Replicar esto con Redsys
              requeriría meses de desarrollo.
            </li>
            <li>
              <strong>Para MVPs y validación:</strong> El objetivo en las primeras semanas es validar que la gente
              quiere pagar, no optimizar comisiones. Stripe permite aceptar el primer pago en horas.
            </li>
            <li>
              <strong>Escalable internacionalmente:</strong> Si tu producto crece fuera de España, Stripe ya
              funciona. Con Redsys estarías atado al mercado doméstico.
            </li>
          </ul>
          <p>
            <em>
              ¿Cuándo recomendamos añadir Redsys/Bizum?</em> Cuando el producto ya tiene tracción y los datos
              muestran abandono en el paso de pago, y el cliente tipo es español con ticket bajo-medio. Es una
              optimización post-validación, no algo para el día 1.
            </p>

          <h2>Los 3 errores más frecuentes que vemos al integrar pagos</h2>
          <div className="space-y-4 my-6">
            {[
              {
                num: '01',
                title: 'Construir la integración de pagos antes de validar',
                desc: 'El error más caro. Antes de integrar cualquier pasarela, valida que la gente quiere tu producto con una landing y un formulario de espera. La integración de pagos solo tiene sentido cuando ya tienes demanda demostrada.',
              },
              {
                num: '02',
                title: 'Ignorar los webhooks',
                desc: 'Un pago completado en Stripe no significa que el dinero esté en tu cuenta ni que debas entregar el producto inmediatamente. Los webhooks (eventos asíncronos de Stripe) son lo que sincroniza el estado del pago con tu base de datos. Sin manejarlos correctamente, tendrás pagos registrados como pendientes o entregas sin pago confirmado.',
              },
              {
                num: '03',
                title: 'No gestionar correctamente los pagos fallidos en suscripciones',
                desc: 'En suscripciones, las tarjetas caducan y los pagos fallan. Stripe tiene un sistema de dunning automático (reintentos y emails al usuario), pero hay que activarlo y configurarlo. Un 5-8% de las suscripciones mensualmente tienen un intento fallido. Sin dunning, pierdes ese revenue automáticamente.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-3xl font-black text-zinc-700 shrink-0 leading-none mt-0.5">
                  {item.num}
                </span>
                <div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2>Conclusión: la pasarela correcta depende de tu etapa</h2>
          <p>
            No existe una pasarela de pago universalmente mejor. Existe la correcta para tu momento y tu
            cliente:
          </p>
          <ul>
            <li>
              <strong>Etapa de validación (0-1):</strong> Stripe Payment Links o Checkout. Sin código, en horas.
            </li>
            <li>
              <strong>SaaS con suscripciones:</strong> Stripe Billing. Sin alternativa real.
            </li>
            <li>
              <strong>E-commerce B2C español con volumen:</strong> Stripe principal + Redsys/Bizum como método
              alternativo.
            </li>
            <li>
              <strong>E-commerce europeo multi-mercado:</strong> Mollie o Stripe con métodos locales activados.
            </li>
            <li>
              <strong>Negocio con alto volumen y optimización de márgenes:</strong> Redsys negociado con banco
              o Adyen.
            </li>
          </ul>
          <p>
            Si estás construyendo un producto digital y no sabes qué pasarela usar, la respuesta por defecto
            es Stripe. Luego optimiza cuando tengas datos reales.
          </p>

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              ¿Necesitas integrar pagos en tu app?
            </h2>
            <p className="text-zinc-400 mb-6 max-w-md mx-auto">
              Cuéntanos tu proyecto. En 10 minutos te damos un precio cerrado con la arquitectura de pagos
              incluida — Stripe, Redsys o lo que tu negocio necesite.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
            >
              Calcular precio de mi proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 text-center text-zinc-600 text-sm mt-8">
        <p>
          © 2026 Think Better — Estudio AI-first de desarrollo de software en Barcelona
          {' · '}
          <Link to="/blog" className="hover:text-zinc-400 transition-colors">Blog</Link>
          {' · '}
          <Link to="/" className="hover:text-zinc-400 transition-colors">Inicio</Link>
        </p>
      </footer>
    </div>
  );
}
