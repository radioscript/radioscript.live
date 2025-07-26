import { Footer, Header } from '@/layouts';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="app-container flex flex-col items-center justify-center gap-4 py-16 flex-1">
        <div className="mx-auto md:w-1/2 w-full px-6">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
