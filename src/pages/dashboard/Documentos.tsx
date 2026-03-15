import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderOpen, Upload, File, FileText, Image, Download,
  X, Loader2, AlertCircle, RefreshCw, Eye, Trash2,
} from 'lucide-react';
import { supabase, supabaseConfigured } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useToast } from '../../contexts/ToastContext';
import { isMockDemo, MOCK_CLIENT_DOCUMENTS, MOCK_USER_ID } from '../../lib/mockDemoData';

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB
const ALLOWED_TYPES = [
  'image/', 'application/pdf', 'application/msword',
  'application/vnd.openxmlformats-officedocument',
  'application/vnd.ms-excel', 'application/vnd.ms-powerpoint',
  'text/', 'application/zip', 'application/x-rar',
];

function isAllowedType(file: File): boolean {
  return ALLOWED_TYPES.some((t) => file.type.startsWith(t));
}

interface ProjectFile {
  id: string;
  project_id: string;
  uploaded_by: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  description: string | null;
  created_at: string;
  uploaded_by_name?: string;
  uploaded_by_role?: string;
}

type FileFilter = 'todos' | 'documentos' | 'imagenes' | 'propuestas';

function formatBytes(bytes: number | null): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(fileType: string | null) {
  if (!fileType) return File;
  if (fileType.startsWith('image/')) return Image;
  if (fileType === 'application/pdf' || fileType.includes('document') || fileType.includes('text')) return FileText;
  return File;
}

function getFileCategory(file: ProjectFile): FileFilter {
  const t = file.file_type ?? '';
  if (t.startsWith('image/')) return 'imagenes';
  if (file.description?.toLowerCase().includes('propuesta') || file.file_name.toLowerCase().includes('propuesta'))
    return 'propuestas';
  return 'documentos';
}

export function Documentos() {
  usePageTitle('Documentos | Think Better');
  const { user, profile } = useAuth();
  const { success: toastSuccess, error: toastError } = useToast();
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FileFilter>('todos');
  const [projectId, setProjectId] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<ProjectFile | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load project
  useEffect(() => {
    // Mock demo mode
    if (isMockDemo()) {
      setProjectId('mock-proj-1');
      setFiles(MOCK_CLIENT_DOCUMENTS as ProjectFile[]);
      setLoading(false);
      return;
    }
    if (!user || !supabaseConfigured) {
      setLoading(false);
      return;
    }
    async function loadProject() {
      const { data } = await supabase
        .from('projects')
        .select('id')
        .eq('client_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(1);
      if (data && data.length > 0) {
        setProjectId((data[0] as { id: string }).id);
      }
      setLoading(false);
    }
    loadProject();
  }, [user]);

  const loadFiles = useCallback(async () => {
    // Mock demo mode — files already set in the project useEffect
    if (isMockDemo()) return;
    if (!projectId) return;
    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase
      .from('files')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (err) {
      setError('Error cargando archivos');
      setLoading(false);
      return;
    }

    const rawFiles = (data ?? []) as ProjectFile[];

    // Fetch uploader names
    const uploaderIds = [...new Set(rawFiles.map((f) => f.uploaded_by))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, full_name, role')
      .in('user_id', uploaderIds);

    const profileMap: Record<string, { name: string; role: string }> = {};
    if (profiles) {
      for (const p of profiles as { user_id: string; full_name: string; role: string }[]) {
        profileMap[p.user_id] = { name: p.full_name, role: p.role };
      }
    }

    setFiles(rawFiles.map((f) => ({
      ...f,
      uploaded_by_name: profileMap[f.uploaded_by]?.name ?? 'Usuario',
      uploaded_by_role: profileMap[f.uploaded_by]?.role ?? 'client',
    })));
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    if (projectId) loadFiles();
  }, [projectId, loadFiles]);

  async function handleUpload(selectedFiles: FileList | null) {
    if (isMockDemo()) return; // no-op in demo mode
    if (!selectedFiles || !projectId || !user) return;

    const fileArray = Array.from(selectedFiles);

    // Validate all files before starting any upload
    for (const file of fileArray) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toastError(`"${file.name}" supera el límite de 50 MB`);
        return;
      }
      if (!isAllowedType(file)) {
        toastError(`Tipo de archivo no permitido: "${file.name}"`);
        return;
      }
    }

    setUploading(true);
    setError(null);
    setUploadProgress({ current: 0, total: fileArray.length });

    let successCount = 0;

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      setUploadProgress({ current: i + 1, total: fileArray.length });

      const path = `${projectId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from('project-files')
        .upload(path, file);

      if (uploadErr || !uploadData) {
        const msg = uploadErr?.message ?? 'error desconocido';
        // Friendly message for missing bucket
        if (msg.includes('Bucket not found') || msg.includes('not found')) {
          toastError('El almacenamiento no está configurado. Contacta con el equipo.');
        } else {
          toastError(`Error subiendo "${file.name}": ${msg}`);
        }
        continue; // try remaining files
      }

      const { data: urlData } = supabase.storage.from('project-files').getPublicUrl(path);

      const { error: dbErr } = await supabase.from('files').insert({
        project_id: projectId,
        uploaded_by: user.id,
        file_name: file.name,
        file_url: urlData.publicUrl,
        file_type: file.type || null,
        file_size: file.size,
      });

      if (dbErr) {
        toastError(`Error guardando "${file.name}" en la base de datos`);
      } else {
        successCount++;
      }
    }

    setUploading(false);
    setUploadProgress(null);

    if (successCount > 0) {
      toastSuccess(
        successCount === 1
          ? 'Archivo subido correctamente'
          : `${successCount} archivos subidos correctamente`,
      );
      loadFiles();
    }
  }

  async function handleDelete(file: ProjectFile) {
    if (isMockDemo()) return; // no-op in demo mode
    if (!window.confirm(`¿Eliminar "${file.file_name}"? Esta acción no se puede deshacer.`)) return;
    await supabase.from('files').delete().eq('id', file.id);
    setFiles((prev) => prev.filter((f) => f.id !== file.id));
  }

  const filteredFiles = files.filter((f) => {
    if (filter === 'todos') return true;
    return getFileCategory(f) === filter;
  });

  // In mock mode use MOCK_USER_ID to distinguish "my files" from team files
  const currentUserId = isMockDemo() ? MOCK_USER_ID : user?.id;
  const myFiles = filteredFiles.filter((f) => f.uploaded_by === currentUserId);
  const teamFiles = filteredFiles.filter((f) => f.uploaded_by !== currentUserId);

  // Drag and drop handlers
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }
  function onDragLeave() {
    setDragOver(false);
  }
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleUpload(e.dataTransfer.files);
  }

  if (!isMockDemo() && (!supabaseConfigured || (!loading && !projectId))) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Documentos</h1>
          <p className="text-sm text-zinc-500 mt-1">Gestiona los archivos de tu proyecto</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => loadFiles()}
            disabled={loading}
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors disabled:opacity-50"
            title="Actualizar"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || !projectId}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Subir archivo</span>
            <span className="sm:hidden">Subir</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Drag and Drop zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`mb-6 border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
          uploading
            ? 'border-emerald-500/40 bg-emerald-500/5 cursor-default'
            : dragOver
            ? 'border-emerald-500 bg-emerald-500/5 cursor-pointer'
            : 'border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/30 cursor-pointer'
        }`}
      >
        {uploading && uploadProgress ? (
          <div className="space-y-3">
            <Loader2 className="w-8 h-8 text-emerald-500 mx-auto animate-spin" />
            <p className="text-sm text-zinc-300">
              Subiendo {uploadProgress.current} de {uploadProgress.total} archivo{uploadProgress.total > 1 ? 's' : ''}…
            </p>
            <div className="w-full max-w-xs mx-auto bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm text-zinc-400">
              Arrastra archivos aquí o <span className="text-emerald-400 font-medium">haz clic para seleccionar</span>
            </p>
            <p className="text-xs text-zinc-600 mt-1">Máximo 50 MB por archivo. Imágenes, PDFs, documentos y más.</p>
          </>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 bg-zinc-900/50 rounded-xl p-1 w-full sm:w-fit overflow-x-auto">
        {(['todos', 'documentos', 'imagenes', 'propuestas'] as FileFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === f
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {f === 'todos' ? 'Todos' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading && (
        <div className="py-16 text-center">
          <Loader2 className="w-8 h-8 text-zinc-600 animate-spin mx-auto mb-3" />
          <p className="text-zinc-500 text-sm">Cargando archivos...</p>
        </div>
      )}

      {!loading && filteredFiles.length === 0 && (
        <div className="py-16 text-center rounded-2xl border border-dashed border-zinc-800">
          <FolderOpen className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 mb-1">No hay archivos</p>
          <p className="text-sm text-zinc-600">Sube documentos, imágenes o archivos del proyecto.</p>
        </div>
      )}

      {!loading && filteredFiles.length > 0 && (
        <div className="space-y-6">
          {myFiles.length > 0 && (
            <FileSection title="Tus archivos" files={myFiles} onPreview={setPreviewFile} onDelete={handleDelete} canDelete />
          )}
          {teamFiles.length > 0 && (
            <FileSection title="Archivos del equipo" files={teamFiles} onPreview={setPreviewFile} onDelete={handleDelete} canDelete={false} />
          )}
        </div>
      )}

      {/* Preview modal */}
      <AnimatePresence>
        {previewFile && (
          <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function FileSection({
  title, files, onPreview, onDelete, canDelete,
}: {
  title: string;
  files: ProjectFile[];
  onPreview: (f: ProjectFile) => void;
  onDelete: (f: ProjectFile) => void;
  canDelete: boolean;
}) {
  return (
    <div>
      <h2 className="text-sm font-medium text-zinc-400 mb-3">{title}</h2>
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden divide-y divide-zinc-800">
        {files.map((file, i) => (
          <FileRow
            key={file.id}
            file={file}
            index={i}
            onPreview={onPreview}
            onDelete={onDelete}
            canDelete={canDelete}
          />
        ))}
      </div>
    </div>
  );
}

function FileRow({
  file, index, onPreview, onDelete, canDelete,
}: {
  file: ProjectFile;
  index: number;
  onPreview: (f: ProjectFile) => void;
  onDelete: (f: ProjectFile) => void;
  canDelete: boolean;
}) {
  const Icon = getFileIcon(file.file_type);
  const isImage = file.file_type?.startsWith('image/');
  const date = new Date(file.created_at).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
  const uploaderLabel = file.uploaded_by_role === 'admin'
    ? `${file.uploaded_by_name} (Equipo)`
    : file.uploaded_by_name;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-3 px-4 sm:px-5 py-3.5 hover:bg-zinc-800/30 transition-colors group"
    >
      <div className="shrink-0 w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center">
        <Icon className="w-4 h-4 text-zinc-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{file.file_name}</p>
        <p className="text-xs text-zinc-500 truncate">
          {uploaderLabel} · {date} · {formatBytes(file.file_size)}
        </p>
      </div>
      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
        {isImage && (
          <button
            onClick={() => onPreview(file)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
            title="Vista previa"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
        <a
          href={file.file_url}
          download={file.file_name}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          title="Descargar"
        >
          <Download className="w-4 h-4" />
        </a>
        {canDelete && (
          <button
            onClick={() => onDelete(file)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

function PreviewModal({ file, onClose }: { file: ProjectFile; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full max-h-[80vh] rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
          <p className="text-sm font-medium text-white truncate">{file.file_name}</p>
          <div className="flex items-center gap-2">
            <a
              href={file.file_url}
              download={file.file_name}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Descargar
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-auto max-h-[calc(80vh-60px)] flex items-center justify-center p-4">
          {file.file_type?.startsWith('image/') ? (
            <img
              src={file.file_url}
              alt={file.file_name}
              className="max-w-full max-h-full rounded-xl object-contain"
            />
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-sm">Vista previa no disponible para este tipo de archivo.</p>
              <a
                href={file.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                Abrir archivo
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Documentos</h1>
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-10 text-center">
        <FolderOpen className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
        <p className="text-zinc-400 mb-2">Aún no tienes un proyecto activo.</p>
        <p className="text-sm text-zinc-500">
          Completa el cuestionario para activar el gestor de documentos.
        </p>
      </div>
    </div>
  );
}
