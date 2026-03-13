import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Monitor, Tablet, Smartphone, ExternalLink, RefreshCw,
  Info, ArrowLeft, Maximize2, GitBranch, Clock,
} from 'lucide-react';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface DeviceConfig {
  label: string;
  icon: typeof Monitor;
  width: string;
  description: string;
}

const DEVICES: Record<DeviceType, DeviceConfig> = {
  desktop: {
    label: 'Escritorio',
    icon: Monitor,
    width: '100%',
    description: '1280px',
  },
  tablet: {
    label: 'Tablet',
    icon: Tablet,
    width: '768px',
    description: '768px',
  },
  mobile: {
    label: 'Móvil',
    icon: Smartphone,
    width: '375px',
    description: '375px',
  },
};

// Mock preview URL — in production this would come from the project record
const PREVIEW_URL = ''; // Empty = show placeholder

export function Preview() {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const hasPreview = Boolean(PREVIEW_URL);

  function handleRefresh() {
    setRefreshKey((k) => k + 1);
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Vista previa</h1>
          <p className="text-zinc-400 text-sm mt-0.5">
            Previsualiza tu aplicación en distintos dispositivos
          </p>
        </div>
        {hasPreview && (
          <a
            href={PREVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir en nueva pestaña
          </a>
        )}
      </div>

      {!hasPreview ? (
        <NoPreviewState />
      ) : (
        <>
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-3">
            {/* Device selector */}
            <div className="flex items-center gap-1 bg-zinc-800 rounded-xl p-1">
              {(Object.keys(DEVICES) as DeviceType[]).map((d) => {
                const config = DEVICES[d];
                const isActive = device === d;
                return (
                  <button
                    key={d}
                    onClick={() => setDevice(d)}
                    title={`${config.label} (${config.description})`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    <config.icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{config.label}</span>
                    <span className="text-xs opacity-60">({config.description})</span>
                  </button>
                );
              })}
            </div>

            {/* URL bar */}
            <div className="flex-1 hidden sm:flex items-center bg-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-500 font-mono truncate">
              {PREVIEW_URL}
            </div>

            {/* Actions */}
            <button
              onClick={handleRefresh}
              title="Recargar"
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              title="Pantalla completa"
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Version badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <GitBranch className="w-3 h-3" />
              v1.0 – Última actualización: hace 2 horas
            </span>
          </div>

          {/* iframe container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={device}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`flex-1 flex items-start justify-center bg-zinc-900 border border-zinc-800 rounded-2xl overflow-auto p-4 ${
                fullscreen ? 'fixed inset-0 z-50 rounded-none p-0' : ''
              }`}
            >
              {fullscreen && (
                <button
                  onClick={() => setFullscreen(false)}
                  className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/90 backdrop-blur border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Salir de pantalla completa
                </button>
              )}
              <iframe
                key={refreshKey}
                ref={iframeRef}
                src={PREVIEW_URL}
                title="Vista previa de tu aplicación"
                style={{
                  width: DEVICES[device].width,
                  height: fullscreen ? '100vh' : '600px',
                  border: 'none',
                  borderRadius: device !== 'desktop' ? '16px' : '8px',
                  boxShadow: device !== 'desktop'
                    ? '0 0 0 8px rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.5)'
                    : 'none',
                  transition: 'width 0.3s ease',
                  background: '#fff',
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Info bar */}
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-zinc-900/30 border border-zinc-800 px-4 py-3">
            <Info className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-500 leading-relaxed">
              Esta es la versión de previsualización de tu proyecto. Si detectas algún error o quieres
              solicitar ajustes, usa la sección de <strong className="text-zinc-400">Iteraciones</strong> para
              describirlos con detalle. Los cambios tardan habitualmente 24-48 horas.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function NoPreviewState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col items-center justify-center text-center py-20"
    >
      <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
        <Monitor className="w-8 h-8 text-zinc-600" />
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">
        Vista previa no disponible aún
      </h2>
      <p className="text-zinc-400 text-sm max-w-md mb-6">
        La vista previa de tu aplicación estará disponible cuando el equipo de Think Better
        despliegue la primera versión. Recibirás una notificación en el chat cuando esté lista.
      </p>
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <Clock className="w-3.5 h-3.5" />
        <span>Habitualmente disponible en 5-7 días hábiles desde el inicio del desarrollo</span>
      </div>
    </motion.div>
  );
}
