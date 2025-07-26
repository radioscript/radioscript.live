import { WavePlayer } from '@/components';
import Image from 'next/image';

export default function PodcastPage() {
  return (
    <div className="app-container pt-8">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="size-64 md:min-w-64 relative">
          <Image src="/images/cover.webp" fill className="rounded-2xl cursor-pointer" alt="Radio Script logo" />
        </div>
        <div>
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl mb-4">اپیزود صفر، باید شروع کرد.</h1>
          <span className="opacity-30 text-lg">مدت: 30 دقیقه ، 2 روز پیش</span>
          <p className="pt-4">
            رادیو اسکریپت از یه سری گفتگوی دوستانه بین ما تو تیم شروع شد. همیشه عادت داشتیم دربارۀ برنامه نویسی، تکنولوژی و اینجور چیزا باهم
            بحث کنیم. یه روز تصمیم گرفتیم این بحثها رو جایی منتشر کنیم تا بقیه هم بتونن ازشون استفاده کنن. صادقانه، اینکه بدونیم حرفهامون
            حتی یه کم هم که شده به برنامه نویسا، علاقه مندان یا کسایی که تازه شروع کردن کمک میکنه، واقعاً بهمون انرژی میده!
          </p>
        </div>
      </div>
      <WavePlayer className="my-8" />

      {/* <Comment /> */}
    </div>
  );
}
