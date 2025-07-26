import { Link } from '@heroui/react';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <div className="flex gap-8 flex-col items-center">
        <Link href="/">
          <Image src="/images/logo/solid-logo.svg" alt="Radio Script logo" width={56} height={56} priority className="dark:invert " />
        </Link>
        <div className="md:w-96">{children}</div>
      </div>
    </div>
  );
}
