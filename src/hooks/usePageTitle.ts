import { useEffect } from 'react';

const DEFAULT_TITLE = 'Think Better | Desarrollo de Software Acelerado por IA';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}
