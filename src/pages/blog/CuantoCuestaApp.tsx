import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function CuantoCuestaApp() {
  usePageTitle('Cuánto cuesta desarrollar una app en España en 2026 — Think Better');
  usePageMeta(
    'Guía completa con precios reales de desarrollo de apps en España en 2026. Comparativa entre agencias, freelancers y estudios AI-first. Rangos de precio por tipo de proyecto.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Cuánto cuesta desarrollar una app en España en 2026',
      description:
        'Guía completa con precios reales de desarrollo de apps en España en 2026. Comparativa entre agencias, freelancers y estudios AI-first.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/cuanto-cuesta-desarrollar-una-app-en-espana-2026',
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
      {/* Navbar minimal */}
      <nav className="border-b border-zinc-900 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-16 lg:px-8">
        {/* Back to blog */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 text-sm text-zinc-500 mb-4">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              Guía de precios
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              15 de marzo de 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />8 min de lectura
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Cuánto cuesta desarrollar una app en España en 2026
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed">
            Si estás valorando desarrollar una aplicación web, un SaaS o una plataforma digital, probablemente te
            has encontrado con presupuestos que van de los 800€ a los 200.000€. ¿Por qué tanta diferencia? ¿Qué
            incluye cada opción? En esta guía desglosamos los precios reales del mercado español en 2026.
          </p>
        </motion.header>

        {/* Table of contents */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 mb-12"
          aria-label="Tabla de contenidos"
        >
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">En este artículo</h2>
          <ol className="space-y-2 text-sm">
            {[
              ['#factores', 'Los 5 factores que determinan el precio'],
              ['#rangos', 'Rangos de precio por tipo de proyecto'],
              ['#quien', '¿Quién te lo desarrolla? Agencia, freelancer o estudio'],
              ['#comparativa', 'Tabla comparativa completa'],
              ['#como-ahorrar', 'Cómo reducir el coste sin sacrificar calidad'],
              ['#conclusion', 'Conclusión: el precio que tiene sentido para ti'],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-zinc-400 hover:text-emerald-400 transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert prose-zinc max-w-none"
        >
          {/* Section 1 */}
          <h2 id="factores" className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6">
            Los 5 factores que determinan el precio de tu app
          </h2>

          <p className="text-zinc-400 leading-relaxed mb-6">
            Antes de hablar de números, es importante entender qué hace que un proyecto cueste lo que cuesta. No
            hay un precio fijo para "una app" porque cada proyecto es diferente. Estos son los factores con mayor
            impacto:
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                n: '1',
                title: 'Complejidad funcional',
                body: 'Una landing page con formulario es diferente a un marketplace con pagos, reviews y mensajería. A más funcionalidades, más horas de desarrollo y mayor coste. Este es el factor número uno.',
              },
              {
                n: '2',
                title: 'Tipo de aplicación',
                body: 'Una app web progresiva (PWA) cuesta mucho menos que una app nativa iOS + Android. Un SaaS con múltiples roles de usuario requiere más arquitectura que un panel de control simple.',
              },
              {
                n: '3',
                title: 'Integraciones externas',
                body: 'Conectar con pasarelas de pago (Stripe, Redsys), sistemas de envío, CRMs o APIs de terceros añade semanas al desarrollo. Cada integración tiene su curva de aprendizaje y su coste.',
              },
              {
                n: '4',
                title: 'Quién lo desarrolla',
                body: 'Un freelancer júnior factura menos que un estudio senior. Una agencia grande añade capas de gestión que encarecen el proyecto. El perfil del equipo puede multiplicar el precio por 5x.',
              },
              {
                n: '5',
                title: 'Urgencia y plazos',
                body: 'Necesitar algo en 2 semanas vs. 3 meses tiene un impacto directo en el precio. Los proyectos urgentes requieren dedicación exclusiva y eso cuesta más.',
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-4 p-5 rounded-xl bg-zinc-900/40 border border-zinc-800">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-sm font-bold">
                  {item.n}
                </span>
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section 2 */}
          <h2 id="rangos" className="text-2xl md:text-3xl font-bold text-white mt-14 mb-6">
            Rangos de precio por tipo de proyecto (2026)
          </h2>

          <p className="text-zinc-400 leading-relaxed mb-6">
            Basándonos en datos de mercado de más de 30 proyectos entregados en España, estos son los rangos
            habituales para los tipos de proyecto más comunes:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-3 pr-6 text-zinc-400 font-semibold">Tipo de proyecto</th>
                  <th className="text-left py-3 pr-6 text-zinc-400 font-semibold">Rango de precio</th>
                  <th className="text-left py-3 text-zinc-400 font-semibold">Tiempo estimado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {[
                  ['Landing page + CMS', '800€ – 2.500€', '1–2 semanas'],
                  ['App web con autenticación + BBDD', '2.000€ – 5.000€', '2–4 semanas'],
                  ['SaaS básico (1 rol de usuario)', '3.000€ – 7.000€', '3–5 semanas'],
                  ['Plataforma multi-rol + pagos', '6.000€ – 15.000€', '5–10 semanas'],
                  ['Marketplace o red social', '15.000€ – 50.000€', '3–8 meses'],
                  ['App nativa iOS + Android', '20.000€ – 80.000€', '4–12 meses'],
                ].map(([tipo, precio, tiempo]) => (
                  <tr key={tipo} className="hover:bg-zinc-900/30">
                    <td className="py-3 pr-6 text-white">{tipo}</td>
                    <td className="py-3 pr-6 text-emerald-400 font-semibold">{precio}</td>
                    <td className="py-3 text-zinc-400">{tiempo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-zinc-500 text-sm mb-8 italic">
            * Rangos orientativos basados en proyectos entregados a precio de mercado en España (2024-2026). Los
            precios con IA (como los de Think Better) suelen estar en la parte baja de cada rango.
          </p>

          {/* CTA inline */}
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 mb-10">
            <p className="text-white font-semibold mb-2">¿Quieres saber el precio exacto de tu proyecto?</p>
            <p className="text-zinc-400 text-sm mb-4">
              Nuestro cuestionario de 10 minutos analiza tu proyecto y te da un precio cerrado al instante. Sin
              llamadas previas, sin rangos ambiguos.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-sm hover:bg-emerald-400 transition-colors"
            >
              Calcular precio de mi proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Section 3 */}
          <h2 id="quien" className="text-2xl md:text-3xl font-bold text-white mt-14 mb-6">
            ¿Quién te lo desarrolla? Agencia, freelancer o estudio
          </h2>

          <p className="text-zinc-400 leading-relaxed mb-6">
            El precio varía enormemente según a quién contrates. Hay tres grandes opciones en el mercado:
          </p>

          <div className="space-y-6 mb-8">
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-lg font-bold text-white mb-3">🏢 Agencia tradicional</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                Las agencias grandes tienen equipos especializados, procesos definidos y carteras de clientes
                conocidos. El problema: tienen mucha estructura que hay que pagar. Un project manager, un
                diseñador UX, un arquitecto, un QA... Todo eso se refleja en el presupuesto.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300">💰 15.000€ – 80.000€</span>
                <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300">⏱️ 3–12 meses</span>
                <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  Precio por horas (sin techo)
                </span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-lg font-bold text-white mb-3">👤 Freelancer</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                Un buen freelancer puede ser una opción excelente para proyectos simples. El riesgo principal es
                la dependencia de una sola persona: si tiene otros clientes, si se pone enfermo, o si el proyecto
                es más complejo de lo esperado, los plazos se alargan. La calidad varía mucho según el perfil.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300">💰 1.500€ – 20.000€</span>
                <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300">⏱️ 2–8 semanas</span>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Calidad variable
                </span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="text-lg font-bold text-white mb-3">⚡ Estudio AI-first (como Think Better)</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                Un modelo nuevo que usa inteligencia artificial para acelerar el desarrollo sin sacrificar calidad.
                Menos capas de gestión que una agencia, más garantías que un freelancer. El diferenciador clave:
                precio cerrado antes de empezar y código 100% tuyo al terminar.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300">💰 2.000€ – 7.000€</span>
                <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300">⏱️ 1–4 semanas</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Precio cerrado ✓
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Comparison table */}
          <h2 id="comparativa" className="text-2xl md:text-3xl font-bold text-white mt-14 mb-6">
            Tabla comparativa completa
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-3 pr-4 text-zinc-400 font-semibold w-[30%]" />
                  <th className="text-center py-3 px-3 text-white font-bold">
                    Think Better
                    <span className="block text-emerald-400 text-xs font-normal">Estudio AI-first</span>
                  </th>
                  <th className="text-center py-3 px-3 text-zinc-400 font-medium">Agencia</th>
                  <th className="text-center py-3 px-3 text-zinc-400 font-medium">Freelancer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {[
                  ['Presupuesto', '2.000–7.000€', '15.000–80.000€', '1.500–20.000€'],
                  ['Tiempo de entrega', '1–4 semanas', '3–12 meses', '2–8 semanas'],
                  ['Precio cerrado', '✅', '❌ Por horas', '❌'],
                  ['Código 100% tuyo', '✅', '✅', '✅'],
                  ['Garantía de entrega', '✅ SLA', '✅ Contrato', '⚠️ Variable'],
                  ['IA integrada', '✅ Nativo', '💰 Extra caro', '⚠️ Depende'],
                  ['Transparencia de precio', '✅ Antes de empezar', '❌ Tras discovery', '⚠️ Estimado'],
                ].map(([label, tb, agencia, freelancer]) => (
                  <tr key={label} className="hover:bg-zinc-900/20">
                    <td className="py-3 pr-4 text-zinc-400 font-medium">{label}</td>
                    <td className="py-3 px-3 text-center text-emerald-400 bg-emerald-500/5 font-medium">{tb}</td>
                    <td className="py-3 px-3 text-center text-zinc-400">{agencia}</td>
                    <td className="py-3 px-3 text-center text-zinc-400">{freelancer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 5 */}
          <h2 id="como-ahorrar" className="text-2xl md:text-3xl font-bold text-white mt-14 mb-6">
            Cómo reducir el coste sin sacrificar calidad
          </h2>

          <p className="text-zinc-400 leading-relaxed mb-6">
            Si tienes un presupuesto limitado, aquí van las estrategias que realmente funcionan para reducir el
            coste de tu proyecto sin comprometer el resultado:
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                title: '1. Define el MVP (Producto Mínimo Viable)',
                body: 'Lanza con lo mínimo que aporte valor real. Puedes añadir funcionalidades después. Un MVP bien definido puede costar 3–4 veces menos que el producto completo soñado.',
              },
              {
                title: '2. Usa tecnología estándar',
                body: 'Evita soluciones exóticas o stacks poco comunes. React + Supabase o React + Node.js tienen miles de profesionales disponibles y son fáciles de mantener. Menos coste de desarrollo, menos coste de mantenimiento.',
              },
              {
                title: '3. Pide precio cerrado',
                body: 'Los proyectos facturados por horas tienen un límite teórico, pero en la práctica siempre se alargan. Exige presupuesto fijo para tener control total del coste.',
              },
              {
                title: '4. Reduce integraciones en la v1',
                body: 'Cada integración con sistemas externos (ERP, CRM, pasarela de pago propia) añade semanas. Usa soluciones genéricas (Stripe para pagos, Resend para emails) en la primera versión.',
              },
              {
                title: '5. Piensa en el mantenimiento desde el inicio',
                body: 'Un código bien escrito cuesta un 30% más de desarrollar, pero un 70% menos de mantener. El coste total de propiedad a 2 años favorece siempre la calidad inicial.',
              },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800">
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Section 6 */}
          <h2 id="conclusion" className="text-2xl md:text-3xl font-bold text-white mt-14 mb-6">
            Conclusión: el precio que tiene sentido para ti
          </h2>

          <p className="text-zinc-400 leading-relaxed mb-4">
            El precio de desarrollo de una app en España en 2026 depende de muchos factores, pero hay una regla
            que siempre se cumple: <strong className="text-white">el precio por horas sin techo es el mayor
            riesgo presupuestario</strong>. Si puedes, exige precio cerrado.
          </p>

          <p className="text-zinc-400 leading-relaxed mb-4">
            Para proyectos de entre 2.000€ y 7.000€, un estudio AI-first como Think Better ofrece la mejor
            relación calidad-precio del mercado: velocidad de entrega de 1–4 semanas, código 100% tuyo y precio
            cerrado antes de la primera llamada.
          </p>

          <p className="text-zinc-400 leading-relaxed mb-8">
            Para proyectos más complejos (marketplaces, apps nativas, plataformas con muchas integraciones), una
            agencia especializada puede ser la opción correcta, siempre que negocies un presupuesto máximo.
          </p>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            ¿Cuánto costará exactamente <em>tu</em> proyecto?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Responde 10 preguntas sobre tu proyecto y recibe un precio exacto al instante. Sin rangos, sin esperas,
            sin compromiso.
          </p>
          <Link
            to="/cuestionario"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
          >
            Calcular precio de mi proyecto
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-zinc-600 text-xs mt-3">✓ Gratis · ✓ Sin tarjeta · ✓ Precio en 10 min</p>
        </motion.div>

        {/* Related articles */}
        <div className="mt-16 pt-10 border-t border-zinc-800">
          <h3 className="text-lg font-bold text-white mb-6">Más artículos del blog</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/blog"
              className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group"
            >
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wide">Próximamente</span>
              <p className="text-white font-medium mt-1 group-hover:text-emerald-400 transition-colors">
                Agencia vs freelancer vs no-code: ¿cuál elegir en 2026?
              </p>
            </Link>
            <Link
              to="/blog"
              className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group"
            >
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wide">Próximamente</span>
              <p className="text-white font-medium mt-1 group-hover:text-emerald-400 transition-colors">
                Cómo lanzar un SaaS en Barcelona en menos de 30 días
              </p>
            </Link>
          </div>
        </div>
      </article>

      {/* Footer minimal */}
      <footer className="border-t border-zinc-900 py-8 text-center text-zinc-600 text-sm">
        <p>
          © 2026 Think Better — Estudio AI-first de desarrollo de software en Barcelona
          {' · '}
          <Link to="/privacidad" className="hover:text-zinc-400 transition-colors">
            Privacidad
          </Link>
          {' · '}
          <Link to="/legal" className="hover:text-zinc-400 transition-colors">
            Legal
          </Link>
        </p>
      </footer>
    </div>
  );
}
