import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Mic, Square, Trash2, Play, Pause } from 'lucide-react';

const MAX_DURATION_S = 180; // 3 min

interface AudioRecorderFieldProps {
  onComplete: (audio: { blob: Blob; duration: number } | null) => void;
  disabled?: boolean;
}

export function AudioRecorderField({ onComplete, disabled }: AudioRecorderFieldProps) {
  const [state, setState] = useState<'idle' | 'recording' | 'recorded' | 'playing' | 'submitted'>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobRef = useRef<Blob | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioURL) URL.revokeObjectURL(audioURL);
    };
  }, [audioURL]);

  const startRecording = useCallback(async () => {
    if (disabled) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        blobRef.current = blob;
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setState('recorded');
      };

      mediaRef.current = recorder;
      recorder.start();
      setState('recording');
      setElapsed(0);

      timerRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev >= MAX_DURATION_S - 1) {
            recorder.stop();
            clearInterval(timerRef.current);
            return prev + 1;
          }
          return prev + 1;
        });
      }, 1000);
    } catch {
      // Permission denied or not supported
    }
  }, [disabled]);

  function stopRecording() {
    if (mediaRef.current?.state === 'recording') {
      mediaRef.current.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }

  function discard() {
    if (audioURL) URL.revokeObjectURL(audioURL);
    setAudioURL(null);
    blobRef.current = null;
    setElapsed(0);
    setState('idle');
  }

  function togglePlay() {
    if (!audioRef.current || !audioURL) return;
    if (state === 'playing') {
      audioRef.current.pause();
      setState('recorded');
    } else {
      audioRef.current.play();
      setState('playing');
    }
  }

  function handleSubmit() {
    if (!blobRef.current) return;
    setState('submitted');
    onComplete({ blob: blobRef.current, duration: elapsed });
  }

  function handleSkip() {
    setState('submitted');
    onComplete(null);
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  }

  return (
    <div className="space-y-3">
      {state === 'idle' && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={startRecording}
            disabled={disabled}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 transition-colors"
          >
            <Mic className="w-4 h-4" />
            Grabar audio
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="px-4 py-2.5 text-sm rounded-xl border border-zinc-700 text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            Omitir
          </button>
        </div>
      )}

      {state === 'recording' && (
        <div className="flex items-center gap-3 bg-zinc-900 border border-red-500/30 rounded-xl px-4 py-3">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-3 h-3 rounded-full bg-red-500"
          />
          <span className="text-sm text-zinc-200 tabular-nums flex-1">
            Grabando... {formatTime(elapsed)} / {formatTime(MAX_DURATION_S)}
          </span>
          <button
            type="button"
            onClick={stopRecording}
            className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
            aria-label="Detener grabación"
          >
            <Square className="w-4 h-4" />
          </button>
        </div>
      )}

      {(state === 'recorded' || state === 'playing') && audioURL && (
        <>
          <audio
            ref={audioRef}
            src={audioURL}
            onEnded={() => setState('recorded')}
          />
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
            <button type="button" onClick={togglePlay} className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400" aria-label={state === 'playing' ? 'Pausar' : 'Reproducir'}>
              {state === 'playing' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="text-xs text-zinc-400 tabular-nums">{formatTime(elapsed)}</span>
            <button type="button" onClick={discard} className="text-zinc-500 hover:text-red-400 transition-colors" aria-label="Descartar">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          {state !== 'submitted' && (
            <button type="button" onClick={handleSubmit} className="px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors">
              Enviar audio
            </button>
          )}
        </>
      )}

      {state === 'submitted' && (
        <div className="text-xs text-zinc-500">Audio enviado ({formatTime(elapsed)})</div>
      )}
    </div>
  );
}
