import { Settings } from 'lucide-react';

export function Ajustes() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Ajustes</h1>
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 text-center">
        <Settings className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <p className="text-zinc-400 mb-2">Configuración de cuenta próximamente.</p>
        <p className="text-sm text-zinc-500">Actualiza tu perfil, empresa y preferencias de notificación.</p>
      </div>
    </div>
  );
}
