import Image from 'next/image';

export function AboutRadio() {
  return (
    <div className="app-container pt-24 pb-24 flex items-center flex-col select-none border-t">
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
        رادیو اسکریپت از یه سری گفتگوی دوستانه بین ما تو تیم شروع شد. همیشه عادت داشتیم دربارۀ برنامه نویسی، تکنولوژی و اینجور چیزا باهم بحث
        کنیم. یه روز تصمیم گرفتیم این بحثها رو جایی منتشر کنیم تا بقیه هم بتونن ازشون استفاده کنن. صادقانه، اینکه بدونیم حرفهامون حتی یه کم
        هم که شده به برنامه نویسا، علاقه مندان یا کسایی که تازه شروع کردن کمک میکنه، واقعاً بهمون انرژی میده!
      </p>
    </div>
  );
}
