import { MessageSquare } from 'lucide-react';

export function Mensajes() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Mensajes</h1>
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 text-center">
        <MessageSquare className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <p className="text-zinc-400 mb-2">Chat interno próximamente disponible.</p>
        <p className="text-sm text-zinc-500">Comunícate directamente con el equipo de desarrollo sin salir de la plataforma.</p>
      </div>
    </div>
  );
}
