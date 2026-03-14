import { usePageTitle } from '../hooks/usePageTitle';

export function AvisoLegal() {
  usePageTitle('Aviso Legal | Think Better');
  return (
    <article className="prose-legal">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Aviso Legal</h1>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: marzo 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">1. Datos identificativos</h2>
        <p className="text-zinc-400 leading-relaxed">
          En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que este sitio web es propiedad de:
        </p>
        <ul className="list-none text-zinc-400 mt-2 space-y-1">
          <li><strong className="text-zinc-300">Denominación:</strong> Think Better (Servicios & Productos Online)</li>
          <li><strong className="text-zinc-300">Domicilio:</strong> Barcelona, España</li>
          <li><strong className="text-zinc-300">Email:</strong> <a href="mailto:hola@thinkbetter.dev" className="text-emerald-400 hover:text-emerald-300">hola@thinkbetter.dev</a></li>
          <li><strong className="text-zinc-300">Actividad:</strong> Desarrollo de software y consultoría tecnológica</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">2. Objeto</h2>
        <p className="text-zinc-400 leading-relaxed">
          A través de este sitio web, Think Better ofrece información sobre sus servicios de desarrollo de software, aplicaciones web y móviles, y consultoría tecnológica. Los precios mostrados son orientativos y pueden variar según las necesidades específicas de cada proyecto.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">3. Propiedad intelectual</h2>
        <p className="text-zinc-400 leading-relaxed">
          Todos los contenidos de este sitio web (textos, imágenes, diseños, logotipos, código fuente) son propiedad de Think Better o de sus respectivos autores y están protegidos por las leyes de propiedad intelectual. Queda prohibida su reproducción, distribución o modificación sin autorización expresa.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">4. Limitación de responsabilidad</h2>
        <p className="text-zinc-400 leading-relaxed">
          Think Better no se hace responsable de los daños o perjuicios derivados del uso de este sitio web, ni de la falta de disponibilidad temporal del mismo. Los presupuestos generados automáticamente son orientativos y no constituyen una oferta contractual vinculante.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">5. Legislación aplicable</h2>
        <p className="text-zinc-400 leading-relaxed">
          Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de Barcelona.
        </p>
      </section>
    </article>
  );
}
