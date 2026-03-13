import { useState } from 'react';

interface SliderFieldProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  minLabel?: string;
  maxLabel?: string;
  /** Format the displayed value */
  formatValue?: (v: number) => string;
  onComplete: (value: number) => void;
  disabled?: boolean;
}

export function SliderField({
  min, max, step = 1, defaultValue, minLabel, maxLabel,
  formatValue = (v) => String(v), onComplete, disabled,
}: SliderFieldProps) {
  const [value, setValue] = useState(defaultValue ?? Math.round((min + max) / 2));
  const [submitted, setSubmitted] = useState(false);

  const pct = ((value - min) / (max - min)) * 100;

  function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    onComplete(value);
  }

  return (
    <div className="space-y-3">
      <div className="text-center">
        <span className="text-2xl font-bold text-emerald-400">{formatValue(value)}</span>
      </div>

      <div className="px-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => !submitted && !disabled && setValue(Number(e.target.value))}
          disabled={submitted || disabled}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-zinc-800
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-emerald-300
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-emerald-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-emerald-300"
          style={{
            background: `linear-gradient(to right, #10B981 ${pct}%, #27272a ${pct}%)`,
          }}
          aria-label="Seleccionar valor"
        />
        {(minLabel || maxLabel) && (
          <div className="flex justify-between mt-1">
            <span className="text-xs text-zinc-500">{minLabel}</span>
            <span className="text-xs text-zinc-500">{maxLabel}</span>
          </div>
        )}
      </div>

      {!submitted && (
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
        >
          Confirmar
        </button>
      )}
    </div>
  );
}
