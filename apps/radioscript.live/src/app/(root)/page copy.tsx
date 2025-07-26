'use client';
import { Button } from '@heroui/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import lottieJson from '../../../public/lottie/hero.json';
import './page.css';

const DynamicLottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Page() {
  return (
    <>
      <div className="dark:bg-black/30 border-b ">
        <div className="app-container py-20 relative md:min-h-[65vh] grid grid-cols-12">
          <div className="col-span-12 md:col-span-7 flex flex-col justify-center ">
            <h1 className="md:leading-tight font-black md:text-7xl tracking-tight text-3xl leading-tight">
              صدای ما رو از دنیای
              <br /> برنامه نویسی میشنوید !
            </h1>
            <div className="flex gap-4 mt-10">
              <Button color="primary" size="lg">
                پادکست
              </Button>
              <Button color="secondary" variant="bordered" size="lg">
                وبلاگ
              </Button>
            </div>
          </div>
          <div className="md:flex hidden col-span-5 p-12">
            <DynamicLottie autoPlay loop animationData={lottieJson} />
          </div>
        </div>
      </div>
      <div className="app-container pt-24 pb-24 flex items-center flex-col">
        <Image
          src="/images/logo/logo-rounded-black.svg"
          alt="Radio Script logo"
          width={48}
          height={48}
          priority
          className="dark:invert mb-4"
        />
        <div className="heading">
          <h3 className="text-2xl font-bold leading-loose">داستان رادیو اسکریپت</h3>
          <p className="subtitle">اینجوری شد که شروع کردیم</p>
        </div>
        <p className="md:w-1/2 text-lg font-normal w-full leading-loose mt-12 text-center mx-auto">
          رادیو اسکریپت از یه سری گفتگوی دوستانه بین ما تو تیم شروع شد. همیشه عادت داشتیم دربارۀ برنامه نویسی، تکنولوژی و اینجور چیزا باهم
          بحث کنیم. یه روز تصمیم گرفتیم این بحثها رو جایی منتشر کنیم تا بقیه هم بتونن ازشون استفاده کنن. صادقانه، اینکه بدونیم حرفهامون حتی
          یه کم هم که شده به برنامه نویسا، علاقه مندان یا کسایی که تازه شروع کردن کمک میکنه، واقعاً بهمون انرژی میده!
        </p>
      </div>
      <div className="dark:bg-black/30 border-t  ">
        <div className="app-container py-40 ">
          <div className="heading">
            <h3 className="text-2xl font-bold leading-loose">رادیو اسکریپت در پلتفرم ها</h3>
            <p className="subtitle">برای حمایت، ما رو توی پلتفرم ها دنبال کنید</p>
          </div>

          <div className="grid grid-cols-6 md:grid-cols-12 gap-4 child mt-8 md:w-1/2 mx-auto">
            <a className="social-card">
              <Image src="/images/social/youtubemusic.svg" alt="Next.js logo" width={56} height={56} priority className="dark:invert" />
              <span>Youtube Music</span>
            </a>
            <a className="social-card">
              <Image src="/images/social/castbox.svg" alt="Next.js logo" width={56} height={56} priority className="dark:invert" />
              <span>Castbox</span>
            </a>
            <a className="social-card">
              <Image src="/images/social/soundcloud.svg" alt="Next.js logo" width={56} height={56} priority className="dark:invert" />
              <span>Soundcloud</span>
            </a>
            <a className="social-card">
              <Image src="/images/social/podbean.svg" alt="Next.js logo" width={56} height={56} priority className="dark:invert" />
              <span>Podbean</span>
            </a>
          </div>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-4 child mt-4 md:mt-8 md:w-1/2 mx-auto">
            <a className="social-card">
              <Image src="/images/social/spotify.svg" alt="Next.js logo" width={56} height={56} priority className="dark:invert" />
              <span>Spotify</span>
            </a>
            <a className="social-card">
              <Image src="/images/social/pocketcasts.svg" alt="Next.js logo" width={56} height={56} priority className="dark:invert" />
              <span>Pocketcast</span>
            </a>
            <a className="social-card">
              <Image src="/images/social/overcast.svg" alt="Next.js logo" width={56} height={56} priority className="dark:invert" />
              <span>Overcast</span>
            </a>
            <a className="social-card">
              <Image src="/images/social/applepodcasts.svg" alt="Next.js logo" width={56} height={56} priority className="dark:invert" />
              <span>Apple Podcast</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
