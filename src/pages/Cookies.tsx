export function Cookies() {
  return (
    <article className="prose-legal">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Política de Cookies</h1>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: marzo 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">1. ¿Qué son las cookies?</h2>
        <p className="text-zinc-400 leading-relaxed">
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan para recordar tus preferencias, mejorar la experiencia de navegación y recopilar información estadística.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">2. Cookies que utilizamos</h2>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-3 pr-4 text-zinc-300 font-medium">Tipo</th>
                <th className="py-3 pr-4 text-zinc-300 font-medium">Finalidad</th>
                <th className="py-3 text-zinc-300 font-medium">Duración</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400">
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 pr-4">Técnicas</td>
                <td className="py-3 pr-4">Necesarias para el funcionamiento del sitio</td>
                <td className="py-3">Sesión</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 pr-4">Analíticas</td>
                <td className="py-3 pr-4">Estadísticas anónimas de uso (Vercel Analytics)</td>
                <td className="py-3">1 año</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 pr-4">Preferencias</td>
                <td className="py-3 pr-4">Guardar tus preferencias de navegación</td>
                <td className="py-3">1 año</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">3. Gestión de cookies</h2>
        <p className="text-zinc-400 leading-relaxed">
          Puedes configurar tu navegador para rechazar cookies o para que te avise cuando se envíe una cookie. Ten en cuenta que si desactivas las cookies, algunas funcionalidades del sitio podrían no estar disponibles.
        </p>
        <p className="text-zinc-400 leading-relaxed mt-2">
          Puedes gestionar tus preferencias de cookies en los ajustes de tu navegador:
        </p>
        <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
          <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
          <li>Firefox: Ajustes → Privacidad y seguridad</li>
          <li>Safari: Preferencias → Privacidad</li>
          <li>Edge: Configuración → Cookies y permisos del sitio</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">4. Contacto</h2>
        <p className="text-zinc-400 leading-relaxed">
          Si tienes preguntas sobre nuestra política de cookies, contacta con nosotros en{' '}
          <a href="mailto:hola@thinkbetter.dev" className="text-emerald-400 hover:text-emerald-300">hola@thinkbetter.dev</a>.
        </p>
      </section>
    </article>
  );
}
