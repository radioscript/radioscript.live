import Image from 'next/image';
import Link from 'next/link';
export interface Podcast {
  href: string;
  caption: string;
  feature_image: string;
  description: string;
}
export function PodcastItem({ href, caption, feature_image, description }: Podcast) {
  return (
    <Link href={href} className="flex gap-4 mb-4">
      <Image src={feature_image} width={120} height={120} className="rounded-2xl cursor-pointer" alt="Radio Script logo" />
      <div>
        <div className="mt-2 opacity-30">مدت: 30 دقیقه ، 2 روز پیش</div>
        <h3 className="text-2xl my-2 font-bold">{caption}</h3>
        <p className="opacity-50">{description}</p>
      </div>
    </Link>
  );
}
