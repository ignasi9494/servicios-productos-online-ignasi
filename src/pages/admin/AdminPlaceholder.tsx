import { Construction } from 'lucide-react';

interface Props {
  title: string;
  description?: string;
}

export function AdminPlaceholder({ title, description }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Construction className="w-12 h-12 text-zinc-700 mb-4" />
        <p className="text-zinc-400 font-medium mb-2">En construcción</p>
        <p className="text-zinc-600 text-sm max-w-sm">
          {description ?? 'Esta sección estará disponible próximamente.'}
        </p>
      </div>
    </div>
  );
}
