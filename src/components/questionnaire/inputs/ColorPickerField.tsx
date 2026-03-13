import { useState } from 'react';
import { Check, Plus } from 'lucide-react';

const PRESET_COLORS = [
  '#10B981', '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899',
  '#F43F5E', '#F97316', '#EAB308', '#84CC16', '#14B8A6',
  '#FFFFFF', '#A1A1AA', '#52525B', '#18181B', '#000000',
];

interface SelectedColor {
  role: string;
  hex: string;
}

const COLOR_ROLES = ['Primario', 'Secundario', 'Acento'];

interface ColorPickerFieldProps {
  onComplete: (colors: SelectedColor[]) => void;
  disabled?: boolean;
}

export function ColorPickerField({ onComplete, disabled }: ColorPickerFieldProps) {
  const [colors, setColors] = useState<SelectedColor[]>([]);
  const [activeRole, setActiveRole] = useState(0);
  const [customHex, setCustomHex] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const currentRole = COLOR_ROLES[activeRole];

  function selectColor(hex: string) {
    if (submitted || disabled) return;
    const newColor: SelectedColor = { role: currentRole, hex };
    setColors((prev) => {
      const existing = prev.findIndex((c) => c.role === currentRole);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newColor;
        return updated;
      }
      return [...prev, newColor];
    });
    if (activeRole < COLOR_ROLES.length - 1) {
      setActiveRole((prev) => prev + 1);
    }
  }

  function addCustomColor() {
    const hex = customHex.trim();
    if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) return;
    selectColor(hex.startsWith('#') ? hex : `#${hex}`);
    setCustomHex('');
  }

  function handleSubmit() {
    if (colors.length === 0 || submitted) return;
    setSubmitted(true);
    onComplete(colors);
  }

  function handleSkip() {
    if (submitted) return;
    setSubmitted(true);
    onComplete([]);
  }

  return (
    <div className="space-y-3">
      {/* Role tabs */}
      {!submitted && (
        <div className="flex gap-1">
          {COLOR_ROLES.map((role, i) => {
            const color = colors.find((c) => c.role === role);
            return (
              <button
                key={role}
                type="button"
                onClick={() => setActiveRole(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  activeRole === i
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                }`}
              >
                {color && (
                  <span
                    className="w-3 h-3 rounded-full border border-zinc-600"
                    style={{ backgroundColor: color.hex }}
                  />
                )}
                {role}
              </button>
            );
          })}
        </div>
      )}

      {/* Color info */}
      {!submitted && (
        <p className="text-xs text-zinc-500">
          Selecciona el color <strong className="text-zinc-300">{currentRole}</strong>
        </p>
      )}

      {/* Palette */}
      {!submitted && (
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((hex) => {
            const isSelected = colors.some((c) => c.hex === hex && c.role === currentRole);
            return (
              <button
                key={hex}
                type="button"
                onClick={() => selectColor(hex)}
                className={`w-8 h-8 rounded-lg border-2 transition-all ${
                  isSelected ? 'border-emerald-400 scale-110' : 'border-zinc-700 hover:border-zinc-400'
                }`}
                style={{ backgroundColor: hex }}
                aria-label={`Color ${hex}`}
              >
                {isSelected && (
                  <Check className={`w-4 h-4 mx-auto ${hex === '#FFFFFF' || hex === '#EAB308' ? 'text-zinc-800' : 'text-white'}`} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Custom hex input */}
      {!submitted && (
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">#</span>
            <input
              type="text"
              value={customHex}
              onChange={(e) => setCustomHex(e.target.value.replace(/[^0-9A-Fa-f#]/g, '').slice(0, 7))}
              onKeyDown={(e) => e.key === 'Enter' && addCustomColor()}
              placeholder="FF5733"
              maxLength={7}
              className="w-full pl-7 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
              aria-label="Color personalizado (hex)"
            />
          </div>
          <button type="button" onClick={addCustomColor} className="p-2 rounded-lg border border-zinc-700 text-zinc-400 hover:border-emerald-500 hover:text-emerald-400 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Selected preview */}
      {colors.length > 0 && (
        <div className="flex gap-3">
          {colors.map((c) => (
            <div key={c.role} className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded border border-zinc-600" style={{ backgroundColor: c.hex }} />
              <span className="text-xs text-zinc-400">{c.role}: {c.hex}</span>
            </div>
          ))}
        </div>
      )}

      {!submitted && (
        <div className="flex gap-2">
          {colors.length > 0 && (
            <button type="button" onClick={handleSubmit} className="px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors">
              Confirmar colores
            </button>
          )}
          <button type="button" onClick={handleSkip} className="px-4 py-2 text-sm rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-300 transition-colors">
            No tengo colores definidos
          </button>
        </div>
      )}
    </div>
  );
}
