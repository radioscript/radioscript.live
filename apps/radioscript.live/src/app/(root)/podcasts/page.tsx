import { PodcastItem } from '@/components';

export default function Podcasts() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className="app-container py-4">
      <h1 className="text-3xl font-black mb-8 mt-4">پادکست ها</h1>

      {items.map((i) => (
        <PodcastItem
          key={i}
          href="/podcasts/اپیزود-صفر"
          caption="اپیزود صفر، باید شروع کرد"
          description="اثین ثسمت از رادیو اسکریپت درباره شروع برنامه نویسی و چالش هاش هست"
          feature_image="/images/cover.webp"
        />
      ))}
    </div>
  );
}
