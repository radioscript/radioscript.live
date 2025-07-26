import { Play } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroItem() {
  return (
    <Link href="/podcasts/اپیزود-صفر">
      <div className="min-h-[60vh] app-container grid grid-cols-12 place-content-center py-8">
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center items-start order-2 md:order-1">
          <div className="text-3xl md:text-6xl mt-4 md:mt-0 font-black">اپیزود 0، باید شروع کرد.</div>
          <p className="opacity-50 my-4">
            رادیو اسکریپت از یه سری گفتگوی دوستانه بین ما تو تیم شروع شد. همیشه عادت داشتیم دربارۀ برنامه نویسی، تکنولوژی و اینجور چیزا باهم
            بحث کنیم. یه روز تصمیم گرفتیم
          </p>
        </div>
        <div className="col-span-12 md:col-span-6 flex justify-center md:justify-end items-center relative order-1 md:order-2">
          <div className="relative w-48 h-48 md:h-96 md:w-96 rounded-2xl overflow-hidden cursor-pointer">
            <div className="bg-black/50 h-full w-full absolute z-10 flex items-center justify-center">
              <Play size="80" color="#fff" variant="Bulk" />
            </div>
            <Image src="/images/cover.webp" fill className="rounded-2xl" alt="Radio Script logo" />
          </div>
        </div>
      </div>
    </Link>
  );
}
