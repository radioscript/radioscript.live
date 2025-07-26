'use client';
import { addToast, Alert, Button } from '@heroui/react';
import { Copy } from 'iconsax-react';
import Image from 'next/image';
import { EmailIcon, LinkedinIcon, TelegramIcon, WhatsAppIcon } from '../icons';

export function SocialSupportComponent() {
  const shareText = `
    سلام، من یه سایت پیدا کردم که در مورد برنامه نویسی و تکنولوژی پادکست و پست داره، گفتم برای شما هم بفرستم تا استفاده کنید.
   
  `;
  const shareUrl = 'https://radioscript.ir';
  const source = 'RadioScript.live';
  const telegramUrl = `https://t.me/share/url?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent('معرفی رادیو اسکریپت')}&body=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
  const linkedinUrl =
    `https://www.linkedin.com/shareArticle?mini=true` +
    `&url=${encodeURIComponent(shareUrl)}` +
    `&title=${encodeURIComponent(shareText)}` +
    `&summary=${encodeURIComponent(shareText)}` +
    `&source=${encodeURIComponent(source)}`;

  const shareOptions = [
    {
      name: 'تلگرام',
      icon: <TelegramIcon className="w-6 h-6" />,
      url: telegramUrl,
    },
    {
      name: 'واتساپ',
      icon: <WhatsAppIcon className="w-6 h-6" />,
      url: whatsappUrl,
    },
    {
      name: 'لینکدین',
      icon: <LinkedinIcon className="w-6 h-6" />,
      url: linkedinUrl,
    },
    {
      name: 'ایمیل',
      icon: <EmailIcon className="w-6 h-6" />,
      url: emailUrl,
    },
  ];

  return (
    <div className="w-full h-full max-w-xl">
      <Alert
        color="primary"
        variant="bordered"
        title="برای حمایت اجتمای از ما کافیه متن و عکس زیر رو توی شبکه های اجتماعی که دارید ارسال کنید تا دوستان بیشتری با ما آشنا بشن."
      />

      <div className="w-96 border p-4 rounded-2xl my-4 mx-auto">
        <Image width={256} height={256} className="rounded-2xl mb-4 w-full " alt="Radio Script logo 3d" src="/images/radio-script.jpg" />
        <p>{shareText}</p>
        <p>{shareUrl}</p>
        <div className="mx-auto flex gap-4 items-center justify-center mt-8">
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              color="secondary"
              radius="full"
              isIconOnly
              onPress={() => window.open(option.url, '_blank')}
              title={option.name}
            >
              {option.icon}
            </Button>
          ))}
          <Button
            color="secondary"
            radius="full"
            isIconOnly
            onPress={async () => {
              await navigator.clipboard.writeText(shareText + shareUrl);
              addToast({ title: 'متن کپی شد.', color: 'success' });
            }}
          >
            <Copy className="w-6 h-6 stroke-default" />
          </Button>
        </div>
      </div>
    </div>
  );
}
