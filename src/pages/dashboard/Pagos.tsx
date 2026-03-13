import { CreditCard } from 'lucide-react';

export function Pagos() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Pagos</h1>
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 text-center">
        <CreditCard className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <p className="text-zinc-400 mb-2">Historial de pagos próximamente.</p>
        <p className="text-sm text-zinc-500">Gestiona pagos de entrada, finales y suscripciones de mantenimiento.</p>
      </div>
    </div>
  );
}
