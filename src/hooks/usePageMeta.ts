import { useEffect } from 'react';

const DEFAULT_DESCRIPTION =
  'Estudio de desarrollo de software con IA en Barcelona. Cuestionario de 10 min → precio exacto → app en producción en 3 semanas. Desde 2.000€. Código 100% tuyo.';

/**
 * Sets the page <meta name="description"> dynamically.
 * Restores the default landing description when the component unmounts.
 */
export function usePageMeta(description: string) {
  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    const previous = meta.getAttribute('content') ?? DEFAULT_DESCRIPTION;
    meta.setAttribute('content', description);
    return () => {
      meta!.setAttribute('content', previous);
    };
  }, [description]);
}
