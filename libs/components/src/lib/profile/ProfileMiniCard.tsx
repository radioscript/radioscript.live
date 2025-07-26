'use client';

import { useAuthStore } from '@/store';
import { Avatar, Button } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export function ProfileMiniCard({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { logout, user } = useAuthStore();
  const router = useRouter();

  return (
    <>
      {isAuthenticated ? (
        <Link href="/user/profile" className="min-w-8">
          <Avatar className="w-8 h-8 cursor-pointer" color="secondary" src={user.avatar_url} />
        </Link>
      ) : (
        <Link href="/auth/identity">
          <Button className="hidden md:flex" color="default" variant="solid">
            <span>ورود / ثبت‌نام</span>
          </Button>
          <Button className="flex md:hidden" color="default" variant="solid" isIconOnly>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Link>
      )}
    </>
  );
}
