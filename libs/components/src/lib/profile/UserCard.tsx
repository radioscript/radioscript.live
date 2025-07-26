'use client';
import { useAuthStore } from '@/store';
import { Skeleton } from '@heroui/react';
import { UserAvatar } from './UserAvatar';

export function UserCard({ className }: { className?: string }) {
  const { user, isLoading } = useAuthStore();

  return (
    <div className={className}>
      {isLoading ? (
        <div className=" w-full flex flex-col items-center gap-4">
          <div>
            <Skeleton className="flex rounded-full size-20" />
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-2 w-md mx-auto">
            <Skeleton className="h-7 w-3/5 rounded-lg" />
            <Skeleton className="h-5 w-4/5 rounded-lg" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center  gap-4 ">
          <div className="min-w-20">
            <UserAvatar />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-lg flex">
              {!user.first_name ? (
                <strong> کاربر عزیز رادیو اسکریپت </strong>
              ) : (
                <strong>
                  {' '}
                  {user.first_name} {user.last_name}{' '}
                </strong>
              )}
            </div>
            <p className="text-justify text-sm">
              {user.bio ?? <span className="inline-block  cursor-pointer">یه جمله راجع به خودت اضافه کن 😊</span>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
