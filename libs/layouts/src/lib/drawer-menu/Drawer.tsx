'use client';
import { MenuItem } from '@/types';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from '@heroui/react';
export function DrawerMenu() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const menuItems: MenuItem[] = [
    {
      text: 'پادکست',
      href: '/podcasts',
      key: 'podcasts',
    },
    // {
    //   text: 'وبلاگ',
    //   href: '/blog',
    //   key: 'blog',
    // },
    {
      text: 'حمایت مالی',
      href: 'support-us?tab=financial',
      key: 'financial',
    },
    {
      text: 'حمایت اجتماعی',
      href: '/support-us?tab=social',
      key: 'social',
    },
    {
      text: 'درباره ما',
      href: '/about',
      key: 'about',
    },
    {
      text: 'تماس با ما',
      href: '/contact',
      key: 'contact',
    },
    {
      text: 'حفظ حریم خصوصی',
      href: '/privacy',
      key: 'privacy',
    },
  ];
  return (
    <>
      <Button isIconOnly variant="light" className="flex md:hidden me-2" onPress={onOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </Button>
      <Drawer size="xs" isOpen={isOpen} onOpenChange={onOpenChange} closeButton={false}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">رادیو اسکریپت</DrawerHeader>
              <DrawerBody>
                <ul className="space-y-2" role="list">
                  {menuItems.map((item) => (
                    <a
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-primary-700 group"
                      href={item.href}
                    >
                      <li>{item.text}</li>
                    </a>
                  ))}
                </ul>
              </DrawerBody>
              <DrawerFooter>
                <Button color="secondary" onPress={onClose}>
                  بستن
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
