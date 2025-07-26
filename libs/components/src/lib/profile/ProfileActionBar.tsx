'use client';
import { useAuthStore } from '@/store';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@heroui/react';
import { More } from 'iconsax-react';
import { useRouter } from 'next/navigation';

export function ProfileActions() {
  const { logout } = useAuthStore();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const router = useRouter();

  return (
    <div className="flex gap-4 items-center justify-center mt-4">
      <Button color="secondary" onPress={() => router.push('/user/profile/edit')}>
        ویرایش پروفایل
      </Button>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly color="secondary">
            <More size="24" className="stroke-secondary-foreground" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem href="/user/comments" key="comments">
            نظرات من
          </DropdownItem>

          <DropdownItem href="/user/profile/password" key="password" showDivider={true}>
            تغییر/ثبت رمز عبور
          </DropdownItem>
          <DropdownItem
            key="logout"
            className="text-danger"
            color="danger"
            onPress={async () => {
              await logout();
              router.push('/');
            }}
          >
            خروج از حساب کاربری
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
