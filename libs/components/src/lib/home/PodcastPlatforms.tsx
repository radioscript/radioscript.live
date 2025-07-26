import Image from 'next/image';

export function PodcastPlatforms() {
  return (
    <div className="app-container py-40 border-t">
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
  );
}
