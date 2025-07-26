'use client';
import { MenuItem } from '@/types';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import styles from './styles.module.scss';
const menuItems: MenuItem[] = [
  {
    key: 'home',
    text: 'صفحه نخست',
    href: '/',
  },
  {
    key: 'podcasts',

    text: 'پادکست ها',
    href: '/podcasts',
  },
  // {
  //   key: 'blog',

  //   text: 'وبلاگ',
  //   href: '/blog',
  // },
  {
    key: 'support-us',

    text: 'حمایت',
    href: '/support-us',
  },
  {
    key: 'about',

    text: 'درباره',
    href: '/about',
  },
  {
    key: 'contact',

    text: 'تماس',
    href: '/contact',
  },
];
export default function HorizontalMenu() {
  const pathname = usePathname();

  return (
    <ul className="flex gap-8 h-full items-center relative ">
      {menuItems.map(({ key, href, text }) => (
        <li key={key} className={`${styles.menuItem} menu-item ${pathname === href ? styles.menuActive : ''}`}>
          <Link className="flex items-center justify-center h-full" aria-label={text} href={href}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
