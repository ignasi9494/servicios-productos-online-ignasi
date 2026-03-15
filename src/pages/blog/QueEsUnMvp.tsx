import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Clock,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Target,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function QueEsUnMvp() {
  usePageTitle('¿Qué es un MVP y por qué tu startup lo necesita primero? — Think Better');
  usePageMeta(
    'El error más caro que cometen los founders es construir demasiado demasiado pronto. Aprende qué es un MVP real, cómo definirlo correctamente y por qué validar antes de invertir en el producto completo.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: '¿Qué es un MVP y por qué tu startup lo necesita primero?',
      description:
        'El error más caro que cometen los founders es construir demasiado demasiado pronto. Cómo definir el MVP correcto y validar antes de invertir en el producto completo.',
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
        '@id': 'https://servicios-productos-online-ignasi.vercel.app/blog/que-es-un-mvp-startup',
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
        {/* Back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-medium">Startup</span>
            <span className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              15 mar 2026
            </span>
            <span className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <Clock className="w-3.5 h-3.5" />
              7 min de lectura
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            ¿Qué es un MVP y por qué tu startup lo necesita primero?
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed mb-10 max-w-3xl">
            El error más caro que cometen los founders es construir demasiado demasiado pronto. Te explicamos qué es
            realmente un MVP, cómo definirlo y por qué la mayoría los hace mal.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="article-body"
        >
          {/* Intro */}
          <Section>
            <p>
              En los últimos tres años hemos construido más de 30 productos digitales en Barcelona. Y en ese tiempo
              hemos visto el mismo patrón repetirse decenas de veces: un founder llega con una idea brillante, invierte
              entre seis meses y un año en construir el producto "completo", lo lanza... y descubre que nadie lo quiere
              exactamente como lo construyó.
            </p>
            <p>
              El dinero gastado: entre 30.000€ y 150.000€. El tiempo perdido: irreversible. Y lo peor: el problema no
              era la idea. Era que construyeron demasiado sin antes validar las hipótesis correctas.
            </p>
            <p>
              Un MVP bien ejecutado habría evitado exactamente eso. En este artículo te explicamos qué es un MVP de
              verdad, cómo se diferencia de lo que la mayoría construye, y cómo definirlo para tu proyecto concreto.
            </p>
          </Section>

          {/* What is an MVP */}
          <h2>Qué es un MVP (y qué no es)</h2>
          <Section>
            <p>
              MVP significa <strong>Minimum Viable Product</strong>: el producto mínimo viable. El concepto fue
              popularizado por Eric Ries en "The Lean Startup" y lleva más de una década siendo malinterpretado.
            </p>
            <p>
              La definición correcta es esta: <strong>el MVP es la versión más pequeña de tu producto que permite
              aprender lo máximo posible sobre tus usuarios reales con el mínimo esfuerzo</strong>. No es un producto
              barato. No es un producto incompleto. Es un experimento diseñado para responder preguntas concretas.
            </p>
          </Section>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <MvpCard
              type="wrong"
              title="Lo que NO es un MVP"
              items={[
                'Una versión recortada del producto que imaginaste',
                'Un producto con todos los módulos pero sin pulir',
                'Una demo con datos falsos o funcionalidades simuladas',
                'Un prototipo de Figma sin código real detrás',
                'El producto completo al que le faltan 3 funcionalidades',
              ]}
            />
            <MvpCard
              type="right"
              title="Lo que SÍ es un MVP"
              items={[
                'Un producto que resuelve UN problema específico bien',
                'El mínimo necesario para que un usuario real lo adopte',
                'Una herramienta para validar hipótesis de negocio',
                'Código real, funcional, desplegado en producción',
                'Algo que puedas cobrar desde el primer día si el mercado lo acepta',
              ]}
            />
          </div>

          {/* The expensive mistake */}
          <h2>El error más caro: el "MVP completo"</h2>
          <Section>
            <p>
              Cuando un founder llega y nos dice "quiero construir el MVP de mi plataforma", muchas veces trae una
              lista de 40 funcionalidades. Panel de administración, notificaciones push, integración con 3 APIs
              externas, sistema de referidos, soporte multi-idioma, app móvil...
            </p>
            <p>
              Eso no es un MVP. Eso es el producto completo con otro nombre.
            </p>
            <p>
              El "MVP completo" es la trampa más común y más cara del ecosistema startup. Ocurre cuando el founder
              tiene miedo de lanzar algo pequeño por si los usuarios lo critican. O cuando no confía en que una versión
              mínima demuestre suficiente valor.
            </p>
          </Section>

          <Callout type="warning">
            <strong>Dato real:</strong> Según CB Insights, el 35% de las startups fracasan por falta de mercado para
            su producto. La mayoría lo descubren después de haber construido (y pagado) el producto completo. Un MVP
            bien definido habría revelado esa información por una fracción del coste.
          </Callout>

          {/* The hypothesis framework */}
          <h2>Cómo definir tu MVP: el framework de hipótesis</h2>
          <Section>
            <p>
              Antes de escribir una sola línea de código, tienes que responder a esta pregunta: <strong>¿qué es lo
              más arriesgado de tu idea?</strong>
            </p>
            <p>
              Todo negocio se basa en hipótesis. Algunas son obvias (la gente usa internet). Otras son las que pueden
              hundirte si resultan ser falsas. Tu MVP debe estar diseñado para validar las hipótesis más arriesgadas
              lo antes posible.
            </p>
          </Section>

          <div className="space-y-4 my-8">
            <HypothesisStep
              number="1"
              title="Identifica tus hipótesis clave"
              description='Escribe todas las suposiciones sobre las que se basa tu negocio. Ejemplo para una plataforma de reservas de coches entre particulares: "Los propietarios de coches quieren alquilarlos cuando no los usan", "Los conductores prefieren coches de particulares a los de las empresas de alquiler tradicionales".'
            />
            <HypothesisStep
              number="2"
              title="Ordénalas por riesgo"
              description="¿Qué hipótesis hundiría el negocio si fuera falsa? Esas son las prioritarias. Empieza validando las que más te importan, no las que más te gustan o las más fáciles de construir."
            />
            <HypothesisStep
              number="3"
              title="Define el experimento mínimo para validarlas"
              description='Para cada hipótesis crítica: ¿cuál es el mínimo que necesito construir para saber si es verdadera o falsa? A veces la respuesta es "una landing page con un formulario de espera". Otras veces necesitas 3 pantallas funcionales.'
            />
            <HypothesisStep
              number="4"
              title="Define métricas de éxito antes de lanzar"
              description='¿Qué datos te dirían que la hipótesis es válida? "Si 100 usuarios usan la funcionalidad X más de 3 veces en el primer mes, la hipótesis se valida." Sin métricas previas, cualquier resultado puede parecer un éxito.'
            />
          </div>

          {/* MVP types */}
          <h2>Los 5 tipos de MVP (y cuándo usar cada uno)</h2>
          <Section>
            <p>
              No todos los MVPs requieren código. Dependiendo de lo que quieras validar, el tipo de MVP varía.
              Ordenados de menor a mayor inversión:
            </p>
          </Section>

          <div className="space-y-3 my-8">
            <MvpType
              type="Landing page + lista de espera"
              cost="500–1.500€"
              time="1 semana"
              validates="¿Hay demanda? ¿El mensaje conecta? ¿La gente quiere saber más?"
              whenToUse="Cuando no estás seguro de si hay mercado suficiente para la idea."
            />
            <MvpType
              type="Concierge MVP (servicio manual)"
              cost="0€ en tecnología"
              time="Días"
              validates="¿Están dispuestos a pagar? ¿El resultado les aporta valor real?"
              whenToUse='Cuando puedes simular el producto manualmente. Ejemplo: en vez de automatizar matching, hazlo tú a mano para los primeros 10 clientes.'
            />
            <MvpType
              type="Prototipo funcional (1-2 funcionalidades core)"
              cost="2.000–5.000€"
              time="2–3 semanas"
              validates="¿Lo usan? ¿Vuelven? ¿Están dispuestos a pagar?"
              whenToUse="Cuando ya sabes que hay demanda pero necesitas validar la solución técnica concreta."
            />
            <MvpType
              type="MVP completo básico"
              cost="5.000–15.000€"
              time="3–6 semanas"
              validates="¿El producto completo resuelve el problema? ¿La retención es suficiente?"
              whenToUse="Cuando ya has validado la demanda y la solución, y necesitas el producto completo para escalar."
            />
            <MvpType
              type="Producto de pagado completo"
              cost="15.000€+"
              time="2–6 meses"
              validates="No valida. Ya es el producto real."
              whenToUse="Cuando has completado los pasos anteriores y tienes evidencia suficiente para invertir a fondo."
            />
          </div>

          <Callout type="info">
            <strong>Truco práctico:</strong> Si tu MVP tardará más de 4 semanas en construirse, probablemente no es
            un MVP. Vuelve al paso anterior y reduce el alcance hasta llegar a algo que puedas lanzar en 2-3 semanas.
          </Callout>

          {/* Common mistakes */}
          <h2>Los 6 errores más comunes al definir un MVP</h2>

          <div className="space-y-3 my-8">
            <MistakeCard
              number="1"
              mistake="Construir para impresionar a inversores, no para validar el mercado"
              fix='Un MVP con 15 funcionalidades impresiona en un pitch pero no te dice nada útil sobre el mercado. Construye para aprender, no para demostrar.'
            />
            <MistakeCard
              number="2"
              mistake="No definir las métricas de éxito antes de lanzar"
              fix='Sin criterios previos, siempre encontrarás razones para interpretar los datos como "prometedores". Define antes: ¿qué número te haría pivotar? ¿cuál te haría escalar?'
            />
            <MistakeCard
              number="3"
              mistake="Construir el MVP y nunca lanzarlo"
              fix='El MVP perfecto no existe. Lanzar con algo que te da vergüenza es una señal de que lo estás haciendo bien. Si no te da vergüenza, llegaste demasiado tarde.'
            />
            <MistakeCard
              number="4"
              mistake="Ignorar el feedback negativo"
              fix='Los primeros usuarios que critican tu producto son los más valiosos. Son los que más quieren que funcione. Escúchalos en vez de defenderlo.'
            />
            <MistakeCard
              number="5"
              mistake="Confundir 'mínimo' con 'malo'"
              fix='Un MVP puede ser mínimo en alcance pero excelente en calidad. Una sola funcionalidad ejecutada perfectamente vale más que diez a medias. La experiencia de usuario importa desde el día 1.'
            />
            <MistakeCard
              number="6"
              mistake="No tener un camino claro de qué sigue si el MVP funciona"
              fix='Si el MVP valida las hipótesis, ¿qué construyes después? ¿Cómo escala la arquitectura? Esto debe estar pensado antes de empezar, no después.'
            />
          </div>

          {/* Our approach */}
          <h2>Cómo trabajamos los MVPs en Think Better</h2>
          <Section>
            <p>
              En Think Better, cuando un founder llega con una idea, lo primero que hacemos no es hablar de tecnología.
              Es hacer las preguntas incómodas: ¿ya tienes usuarios comprometidos? ¿Has cobrado algo aunque sea
              manualmente? ¿Has hablado con 20 potenciales clientes?
            </p>
            <p>
              Si la respuesta es no a todo, probablemente no necesitas código todavía. Necesitas validación.
            </p>
            <p>
              Cuando la validación ya existe y hay demanda demostrada, ahí es donde entramos nosotros. Nuestro plan
              Starter (2.000€) está diseñado exactamente para este caso: construir el primer producto funcional en
              producción en 1-2 semanas, con el mínimo necesario para que los primeros usuarios reales lo puedan usar
              y pagar.
            </p>
          </Section>

          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 my-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">El checklist del MVP bien definido</h3>
                <p className="text-zinc-400 text-sm">Antes de construir cualquier cosa, asegúrate de poder marcar todos estos puntos.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'He identificado las 3 hipótesis más arriesgadas de mi negocio',
                'He hablado con al menos 20 potenciales usuarios reales',
                'He definido métricas de éxito concretas y medibles',
                'El MVP puede construirse y lanzarse en menos de 4 semanas',
                'Resuelve UN problema principal, no diez problemas mediocres',
                'Tengo al menos 10 personas que han dicho que lo usarían',
                'Sé qué construyo después si el MVP funciona',
                'He definido qué resultado me haría pivotar o parar',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500/60 flex-shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Real case */}
          <h2>Caso real: de idea a primeros clientes en 3 semanas</h2>
          <Section>
            <p>
              Uno de nuestros proyectos recientes fue LeadHunter: una plataforma de prospección comercial automatizada
              para equipos de ventas B2B. El founder había pasado 8 meses intentando construirlo con un equipo
              externo, gastando más de 40.000€ y terminando con un producto que nadie quería exactamente así.
            </p>
            <p>
              Cuando llegó a nosotros, lo primero fue resetear el enfoque. ¿Cuál era el problema más doloroso para
              sus usuarios? La generación de listas de prospectos cualificados. Todo lo demás era accesorio.
            </p>
            <p>
              Construimos un MVP en 18 días: buscador por criterios (sector, tamaño, ubicación), exportación a CSV,
              enriquecimiento automático de datos con email verificado. Sin panel de administración, sin integraciones
              con CRM, sin notificaciones.
            </p>
            <p>
              En la primera semana tras el lanzamiento, 12 equipos de ventas se registraron y 4 compraron el plan de
              pago. Con esa evidencia, ya sabíamos qué construir después.
            </p>
          </Section>

          <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-6 my-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold text-sm">Resultado</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { metric: '18 días', label: 'De idea a producción' },
                { metric: '12', label: 'Equipos registrados en semana 1' },
                { metric: '4', label: 'Clientes de pago en 7 días' },
              ].map(({ metric, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{metric}</div>
                  <div className="text-zinc-400 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <h2>La pregunta correcta antes de construir</h2>
          <Section>
            <p>
              Antes de pedir un presupuesto de desarrollo, hazte esta pregunta: ¿qué es lo mínimo que necesito para
              saber si esto funciona?
            </p>
            <p>
              Si la respuesta es "necesito el producto completo", probablemente estás evitando la validación porque
              tienes miedo de que el mercado diga que no. Eso es humano. Pero construir durante un año para retrasar
              ese momento sale mucho más caro.
            </p>
            <p>
              Si la respuesta es "con 2-3 funcionalidades bien hechas ya podría aprender lo suficiente", eso es un
              MVP real. Y ese es el proyecto que tiene sentido construir ahora.
            </p>
          </Section>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-3">¿Tienes una idea que quieres validar?</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Cuéntanos tu proyecto. En 10 minutos y sin compromiso te decimos si tiene sentido construir un MVP ahora
            y cuánto costaría.
          </p>
          <Link
            to="/cuestionario"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
          >
            Calcular precio de mi MVP
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex items-center justify-between flex-wrap gap-4">
          <Link to="/blog" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>
          <p className="text-zinc-600 text-xs">
            © 2026 Think Better · Estudio AI-first de desarrollo de software en Barcelona
          </p>
        </div>
      </article>
    </div>
  );
}

/* ─── Helper components ─────────────────────────────────────────────────────── */

function Section({ children }: { children: ReactNode }) {
  return <div className="mb-8 space-y-4 text-zinc-300 leading-relaxed">{children}</div>;
}

function Callout({ type, children }: { type: 'info' | 'warning'; children: ReactNode }) {
  const colors =
    type === 'warning'
      ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
      : 'bg-blue-500/10 border-blue-500/30 text-blue-200';
  return (
    <div className={`my-6 p-5 rounded-xl border ${colors} text-sm leading-relaxed`}>{children}</div>
  );
}

function MvpCard({
  type,
  title,
  items,
}: {
  type: 'right' | 'wrong';
  title: string;
  items: string[];
}) {
  const isRight = type === 'right';
  return (
    <div
      className={`rounded-xl border p-5 ${
        isRight ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        {isRight ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        ) : (
          <XCircle className="w-4 h-4 text-red-400" />
        )}
        <span className={`text-sm font-semibold ${isRight ? 'text-emerald-400' : 'text-red-400'}`}>{title}</span>
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
            {isRight ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/50 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-red-500/50 flex-shrink-0 mt-0.5" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HypothesisStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 p-5 rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center flex-shrink-0">
        {number}
      </div>
      <div>
        <p className="text-white font-semibold mb-1">{title}</p>
        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function MvpType({
  type,
  cost,
  time,
  validates,
  whenToUse,
}: {
  type: string;
  cost: string;
  time: string;
  validates: string;
  whenToUse: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between flex-wrap gap-2">
        <span className="text-white font-semibold text-sm">{type}</span>
        <div className="flex items-center gap-3 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">{cost}</span>
          <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400">{time}</span>
        </div>
      </div>
      <div className="p-5 grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wide mb-1">Valida</p>
          <p className="text-zinc-300 leading-relaxed">{validates}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wide mb-1">Úsalo cuando</p>
          <p className="text-zinc-300 leading-relaxed">{whenToUse}</p>
        </div>
      </div>
    </div>
  );
}

function MistakeCard({
  number,
  mistake,
  fix,
}: {
  number: string;
  mistake: string;
  fix: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
      <div className="flex items-start gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400 font-bold text-sm">#{number}</span>
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-1.5">{mistake}</p>
          <p className="text-zinc-400 text-sm leading-relaxed">{fix}</p>
        </div>
      </div>
    </div>
  );
}
