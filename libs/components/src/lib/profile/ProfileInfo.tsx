'use client';

import { useAuthStore } from '@/store';
import { convertToTimeAgo } from '@/utilities';
import { useEffect, useState } from 'react';
import { ProfileActions } from './ProfileActionBar';
import { UserCard } from './UserCard';

export const ProfileInfoComponent = () => {
  const { user, isLoading } = useAuthStore();
  const [userInfo, setUserInfo] = useState<any[]>([]);
  useEffect(() => {
    if (user) {
      setUserInfo([
        {
          text: 'نام',
          value: user.first_name ?? '---',
        },
        {
          text: 'نام خانوادگی',
          value: user.last_name ?? '---',
        },
        {
          text: 'شماره همراه',
          value: user.phone_number ?? '---',
        },
        {
          text: 'ایمیل',
          value: user.email ?? '---',
        },
        {
          text: 'تاریخ پیوستن ',
          value: convertToTimeAgo(user.created_at || new Date()) ?? '---',
        },
        {
          text: 'تاریخ آخرین ویرایش',
          value: convertToTimeAgo(user.updated_at || new Date()) ?? '---',
        },
      ]);
    }
  }, [user]);
  return (
    <>
      <UserCard />
      <ProfileActions />
      <ul className="py-2">
        {userInfo.map((item, index) => (
          <li key={index} className="border-b py-4 px-3 flex justify-between">
            <span className=" text-gray-500 ">{item.text}</span>
            <span className=" font-semibold">{item.value} </span>
          </li>
        ))}
      </ul>
    </>
  );
};
