import { motion } from 'motion/react';
import { Check, X, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

type CellValue = true | false | null | string;

interface ComparisonRow {
  label: string;
  thinkBetter: CellValue;
  agency: CellValue;
  freelancer: CellValue;
  noCode: CellValue;
}

const rows: ComparisonRow[] = [
  {
    label: 'Precio',
    thinkBetter: '2.000–7.000€',
    agency: '15.000–80.000€',
    freelancer: '3.000–20.000€',
    noCode: '0–500€/año',
  },
  {
    label: 'Tiempo de entrega',
    thinkBetter: '1–4 semanas',
    agency: '3–12 meses',
    freelancer: '2–8 semanas',
    noCode: '1 semana',
  },
  {
    label: 'Precio cerrado',
    thinkBetter: true,
    agency: false,
    freelancer: false,
    noCode: true,
  },
  {
    label: 'Código 100% tuyo',
    thinkBetter: true,
    agency: true,
    freelancer: true,
    noCode: false,
  },
  {
    label: 'Precio antes de la 1ª llamada',
    thinkBetter: true,
    agency: false,
    freelancer: false,
    noCode: true,
  },
  {
    label: 'Dashboard de progreso',
    thinkBetter: true,
    agency: false,
    freelancer: false,
    noCode: false,
  },
  {
    label: 'IA integrable',
    thinkBetter: true,
    agency: null,
    freelancer: null,
    noCode: false,
  },
  {
    label: 'Escala sin límites',
    thinkBetter: true,
    agency: true,
    freelancer: null,
    noCode: false,
  },
];

function Cell({ value }: { value: CellValue }) {
  if (value === true) return <Check className="w-5 h-5 text-emerald-400 mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-zinc-600 mx-auto" />;
  if (value === null) return <Minus className="w-4 h-4 text-zinc-700 mx-auto" />;
  return <span className="text-sm font-medium text-zinc-300">{value}</span>;
}

export function Comparison() {
  return (
    <section id="comparativa" className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué Think Better?</h2>
          <p className="text-zinc-400 text-lg">
            Comparamos honestamente con las alternativas. Cada opción tiene su caso de uso — aquí tienes los datos para decidir.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="overflow-x-auto"
        >
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-4 pr-6 text-zinc-500 font-medium w-[35%]" />
                <th className="py-4 px-4 text-center">
                  <div className="inline-flex flex-col items-center gap-1">
                    <span className="text-white font-bold">Think Better</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                      Recomendado
                    </span>
                  </div>
                </th>
                <th className="py-4 px-4 text-center text-zinc-400 font-medium">Agencia</th>
                <th className="py-4 px-4 text-center text-zinc-400 font-medium">Freelancer</th>
                <th className="py-4 px-4 text-center text-zinc-400 font-medium">No-code</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-t border-zinc-800/60 ${i % 2 === 0 ? 'bg-zinc-900/20' : ''}`}
                >
                  <td className="py-3.5 pr-6 text-zinc-400 font-medium">{row.label}</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-500/5">
                    <Cell value={row.thinkBetter} />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Cell value={row.agency} />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Cell value={row.freelancer} />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Cell value={row.noCode} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <Link
            to="/cuestionario"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
          >
            Descubrir precio de mi proyecto
          </Link>
          <p className="text-zinc-600 text-xs mt-3">
            ✓ Sin tarjeta · ✓ Precio en 10 min · ✓ Sin compromiso
          </p>
        </motion.div>
      </div>
    </section>
  );
}
