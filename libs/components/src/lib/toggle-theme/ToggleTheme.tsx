'use client';

import { Button } from '@heroui/react';
import { Moon, Sun1 } from 'iconsax-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button isIconOnly color="secondary" variant="light" onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <Sun1 variant="Bold" className="h-5 w-5 dark:hidden" color="#000" />
      <Moon variant="Bold" className="hidden h-5 w-5 dark:block" color="#fff" />
      <span className="sr-only">تغییر تم</span>
    </Button>
  );
}
