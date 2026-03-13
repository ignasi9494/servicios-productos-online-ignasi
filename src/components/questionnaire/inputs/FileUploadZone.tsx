import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, FileText, Image, Music, File } from 'lucide-react';

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
}

const ACCEPTED_TYPES = [
  'application/pdf', 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain', 'image/png', 'image/jpeg', 'image/svg+xml',
  'audio/mpeg', 'audio/webm',
];
const ACCEPT_STRING = '.pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.svg,.mp3,.webm';
const MAX_FILES = 10;
const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25MB

interface FileUploadZoneProps {
  onComplete: (files: { name: string; size: number; type: string }[]) => void;
  disabled?: boolean;
}

export function FileUploadZone({ onComplete, disabled }: FileUploadZoneProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalSize = files.reduce((s, f) => s + f.file.size, 0);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    setError(null);
    const toAdd: UploadedFile[] = [];

    for (const file of Array.from(newFiles)) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError(`Tipo no soportado: ${file.name}`);
        continue;
      }
      if (files.length + toAdd.length >= MAX_FILES) {
        setError(`Máximo ${MAX_FILES} archivos`);
        break;
      }
      const newTotal = totalSize + toAdd.reduce((s, f) => s + f.file.size, 0) + file.size;
      if (newTotal > MAX_TOTAL_SIZE) {
        setError('Tamaño total excede 25MB');
        break;
      }
      const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
      toAdd.push({ id: `${Date.now()}-${Math.random()}`, file, preview });
    }

    if (toAdd.length > 0) {
      setFiles((prev) => [...prev, ...toAdd]);
    }
  }, [files.length, totalSize]);

  function removeFile(id: string) {
    setFiles((prev) => {
      const f = prev.find((p) => p.id === id);
      if (f?.preview) URL.revokeObjectURL(f.preview);
      return prev.filter((p) => p.id !== id);
    });
  }

  function handleSubmit() {
    if (files.length === 0 || submitted) return;
    setSubmitted(true);
    onComplete(files.map((f) => ({ name: f.file.name, size: f.file.size, type: f.file.type })));
  }

  function getIcon(type: string) {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('audio/')) return Music;
    if (type.includes('pdf') || type.includes('word') || type.includes('text')) return FileText;
    return File;
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (!submitted && !disabled) addFiles(e.dataTransfer.files);
        }}
        onClick={() => !submitted && !disabled && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-emerald-500 bg-emerald-500/5'
            : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/50'
        } ${submitted ? 'opacity-60 cursor-default' : ''}`}
      >
        <Upload className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
        <p className="text-sm text-zinc-400">
          Arrastra archivos aquí o <span className="text-emerald-400">haz clic</span>
        </p>
        <p className="text-xs text-zinc-600 mt-1">
          PDF, DOC, TXT, imágenes, audio — máx. {MAX_FILES} archivos, 25MB total
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT_STRING}
          onChange={(e) => e.target.files && addFiles(e.target.files)}
          className="hidden"
          aria-label="Subir archivos"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {/* File list */}
      <AnimatePresence>
        {files.map((f) => {
          const Icon = getIcon(f.file.type);
          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2"
            >
              {f.preview ? (
                <img src={f.preview} alt="" className="w-8 h-8 rounded object-cover" />
              ) : (
                <Icon className="w-5 h-5 text-zinc-400 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-200 truncate">{f.file.name}</p>
                <p className="text-xs text-zinc-500">{formatSize(f.file.size)}</p>
              </div>
              {!submitted && (
                <button
                  type="button"
                  onClick={() => removeFile(f.id)}
                  className="text-zinc-500 hover:text-red-400 transition-colors"
                  aria-label={`Eliminar ${f.file.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {files.length > 0 && !submitted && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            {files.length}/{MAX_FILES} archivos — {formatSize(totalSize)}/25MB
          </span>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
          >
            Adjuntar ({files.length})
          </button>
        </div>
      )}
    </div>
  );
}
