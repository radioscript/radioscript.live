'use client';
import { AboutRadio, Hero, PodcastPlatforms } from '@/components';
import dynamic from 'next/dynamic';
import './page.css';

const DynamicLottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Page() {
  return (
    <>
      <Hero />
      <AboutRadio />
      <PodcastPlatforms />
    </>
  );
}
