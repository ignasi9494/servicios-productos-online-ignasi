import { usePageTitle } from '../hooks/usePageTitle';

export function Privacidad() {
  usePageTitle('Política de Privacidad | Think Better');
  return (
    <article className="prose-legal">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Política de Privacidad</h1>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: marzo 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">1. Responsable del tratamiento</h2>
        <p className="text-zinc-400 leading-relaxed">
          Think Better (Servicios & Productos Online), con domicilio en Barcelona, España, es el responsable del tratamiento de los datos personales recogidos a través de este sitio web.
        </p>
        <p className="text-zinc-400 leading-relaxed mt-2">
          Contacto: <a href="mailto:hola@thinkbetter.dev" className="text-emerald-400 hover:text-emerald-300">hola@thinkbetter.dev</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">2. Datos que recopilamos</h2>
        <p className="text-zinc-400 leading-relaxed">Podemos recopilar los siguientes datos personales:</p>
        <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
          <li>Nombre y apellidos</li>
          <li>Dirección de correo electrónico</li>
          <li>Número de teléfono</li>
          <li>Nombre de la empresa</li>
          <li>Información del proyecto proporcionada a través del cuestionario</li>
          <li>Datos de navegación y cookies técnicas</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">3. Finalidad del tratamiento</h2>
        <p className="text-zinc-400 leading-relaxed">Utilizamos tus datos para:</p>
        <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
          <li>Gestionar solicitudes de presupuesto y consultas</li>
          <li>Elaborar y enviar propuestas de desarrollo</li>
          <li>Comunicarnos contigo sobre el estado de tu proyecto</li>
          <li>Emitir facturas y gestionar pagos</li>
          <li>Mejorar nuestros servicios y la experiencia de usuario</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">4. Base legal</h2>
        <p className="text-zinc-400 leading-relaxed">
          El tratamiento de tus datos se basa en tu consentimiento expreso al rellenar nuestros formularios, así como en la ejecución de un contrato cuando contratas nuestros servicios.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">5. Conservación de datos</h2>
        <p className="text-zinc-400 leading-relaxed">
          Conservamos tus datos mientras sea necesario para la finalidad para la que fueron recogidos y para cumplir con nuestras obligaciones legales. Los datos de clientes se conservan durante la relación contractual y hasta 5 años después para cumplir con obligaciones fiscales.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">6. Tus derechos</h2>
        <p className="text-zinc-400 leading-relaxed">
          Tienes derecho a acceder, rectificar, suprimir y portar tus datos, así como a limitar u oponerte a su tratamiento. Para ejercer estos derechos, contacta con nosotros en{' '}
          <a href="mailto:hola@thinkbetter.dev" className="text-emerald-400 hover:text-emerald-300">hola@thinkbetter.dev</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">7. Seguridad</h2>
        <p className="text-zinc-400 leading-relaxed">
          Implementamos medidas técnicas y organizativas para proteger tus datos personales contra accesos no autorizados, alteración, divulgación o destrucción.
        </p>
      </section>
    </article>
  );
}
