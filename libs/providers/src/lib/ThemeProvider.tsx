'use client';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
