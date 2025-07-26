'use client';

import { useAuthStore } from '@/store';
import { useEffect } from 'react';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { initStates } = useAuthStore();

  useEffect(() => {
    initStates();
  }, [initStates]);

  return children;
}
