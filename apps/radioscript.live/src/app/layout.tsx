import { StoreProvider, ThemeProviders } from '@/providers';
import { ToastProvider } from '@heroui/react';
import localFont from 'next/font/local';
import './global.css';

export const metadata = {
  title: 'رادیو اسکریپت',
  description: 'پادکست و وبلاگ  فارسی',
  other: {
    enamad: 2148476,
  },
};
const yekanBakhFont = localFont({
  src: [
    {
      path: '../../public/fonts/YekanBakhNoEn-VF.woff2',
      weight: '100 900', // Specify the weight range for variable fonts
      style: 'normal', // Specify the style (normal or italic)
    },
  ],
  variable: '--font-yekan-bakh',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${yekanBakhFont.variable} antialiased `}>
        <StoreProvider>
          <ThemeProviders>
            {children}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-black p-4">{/* <ReactAudioPlayer /> */}</div>
          </ThemeProviders>
        </StoreProvider>
        <ToastProvider placement="top-center" />
      </body>
    </html>
  );
}
