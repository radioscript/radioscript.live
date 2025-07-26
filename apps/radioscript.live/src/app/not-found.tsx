'use client'; // Add this directive at the top

import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation'; // Note: It's 'next/navigation' not 'next/router'

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen bg-background text-foreground flex flex-col items-center justify-center gap-2">
      <div className="text-6xl">404</div>
      <small className="opacity-75">صفحه مورد نظر یافت نمیشه!</small>
      <div className="flex flex-col mt-4 text-lg">
        <span>همه مرغان هم آواز پراکنده شدند</span>
        <span>آه از این باد بلاخیز که زد در چمنم</span>
        <small className="opacity-60 text-end mt-4">هوشنگ ابتهاج (سایه)</small>
      </div>
      <div className="flex gap-2 flex-col md:flex-row mt-4">
        <Button onPress={() => router.back()}>بازگشت</Button>
        <Button variant="bordered" onPress={() => router.push('/')}>
          بازگشت به صفحه اصلی
        </Button>
      </div>
    </div>
  );
}
