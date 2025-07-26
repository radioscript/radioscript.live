'use client';
import { UserCard } from '@/components';
import { EditProfileForm } from '@/forms';

export default function EditProfile() {
  return (
    <>
      <UserCard className="mb-4" />
      <EditProfileForm />
    </>
  );
}
