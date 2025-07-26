import { Footer, Header } from '@/layouts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
