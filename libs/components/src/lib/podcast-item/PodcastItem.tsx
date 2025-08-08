'use client';
import { motion } from 'framer-motion';
import { PlayCircle } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
export interface Podcast {
  href: string;
  caption: string;
  feature_image: string;
}
export function PodcastItem({ href, caption, feature_image }: Podcast) {
  return (
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Link href={href} className="flex flex-col gap-4 m-6 overflow-hidden duration-300 group max-h-72 group">
        <div className="relative w-full h-52 overflow-hidden flex items-end justify-center rounded-md">
          <Image src={feature_image} objectFit="cover" layout="fill" alt="Radio Script logo" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-4 start-2 flex items-center gap-2 invisible group-hover:visible transition-all duration-300 text-white">
            <PlayCircle size="32" color="#fff" variant="Bold" />
            گوش کنید
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h2 className="text-base font-bold">{caption}</h2>
          <div className="text-sm transition-all duration-300 opacity-50">مدت: 30 دقیقه ، 2 روز پیش</div>
        </div>
      </Link>
    </motion.button>
  );
}
