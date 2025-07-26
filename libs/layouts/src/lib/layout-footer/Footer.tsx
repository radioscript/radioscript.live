import { InstagramIcon, TelegramIcon, YouTubeIcon } from '@/components';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link className="flex" href="/">
              <Image
                src="/images/logo/radio-script-full-logo.svg"
                alt="Radio Script logo"
                width={180}
                height={48}
                className="dark:invert"
                priority
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">مطالب</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/podcasts" className="hover:underline">
                    پادکست
                  </Link>
                </li>
                {/* <li>
                  <Link href="/blog" className="hover:underline">
                    وبلاگ
                  </Link>
                </li> */}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">حمایت از ما</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/support-us?tab=financial" className="hover:underline ">
                    حمایت مالی
                  </Link>
                </li>
                <li>
                  <Link href="/support-us?tab=social" className="hover:underline">
                    حمایت اجتماعی
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">لینک ها</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/about" className="hover:underline">
                    درباره ما
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/contact" className="hover:underline">
                    تماس با ما
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    حفظ حریم خصوصی
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 lg:my-8 opacity-50" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            تمامی حقوق برای&nbsp;
            <Link href="/" className="hover:underline">
              رادیو اسکریپت
            </Link>
            &nbsp; محفوظ است
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 gap-2">
            <Link
              href="https://www.youtube.com/@RadioScriptlive"
              target="_blank"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <Button isIconOnly variant="light">
                <YouTubeIcon />
              </Button>
              <span className="sr-only">Youtube page</span>
            </Link>
            <Link href="https://t.me/radioscript" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <Button isIconOnly variant="light">
                <TelegramIcon />
              </Button>
              <span className="sr-only">Telegram channel</span>
            </Link>

            <Link
              href="https://www.instagram.com/radioscript.live"
              target="_blank"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <Button isIconOnly variant="light">
                <InstagramIcon />
              </Button>
              <span className="sr-only">Instagram page</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
