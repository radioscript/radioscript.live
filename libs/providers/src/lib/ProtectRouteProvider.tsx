'use client';

import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isHydrated } = useAuthStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isHydrated) {
      if (!isAuthenticated) {
        router.replace('/auth/identity');
      }
      setIsChecking(false);
    }
  }, [isAuthenticated, isHydrated, router]);

  // Show loading state while checking authentication or while hydrating
  if (isChecking || !isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? {children} : null;
}
