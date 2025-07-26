import { ProfileMiniCard, ThemeToggle } from '@/components';
import { hasTokens } from '@/hooks/server';
import Image from 'next/image';
import Link from 'next/link';
import { DrawerMenu } from '../drawer-menu/Drawer';
import HorizontalMenu from '../layout-horizontal-menu/HorizontalMenu';

export async function Header() {
  const isAuthenticated = await hasTokens();
  return (
    <header className="flex min-h-16 border-b sticky top-0 bg-background z-40">
      <div className="app-container !px-3 !md:px-6 flex justify-between w-full">
        <div className="flex items-center">
          <DrawerMenu />

          <Link className="flex" href="/">
            <Image
              src="/images/logo/logo-type-black.svg"
              alt="Radio Script logo"
              width={160}
              height={48}
              className="dark:invert"
              priority
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center">
          <HorizontalMenu />
        </div>
        <div className="flex items-center gap-4 font-yekan">
          <ProfileMiniCard isAuthenticated={isAuthenticated} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
