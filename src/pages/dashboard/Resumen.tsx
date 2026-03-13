import { LayoutDashboard } from 'lucide-react';

export function Resumen() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Panel de control</h1>
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 text-center">
        <LayoutDashboard className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <p className="text-zinc-400 mb-2">Tu panel de cliente estará disponible próximamente.</p>
        <p className="text-sm text-zinc-500">Aquí podrás ver el estado de tus proyectos, mensajes, propuestas y pagos.</p>
      </div>
    </div>
  );
}
