'use client';
import { Tab, Tabs } from '@heroui/react';
import { Heart } from 'iconsax-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CircleHeading } from '../circle-heading/CircleHeading';
import { FinancialSupportComponent } from './FinancialSupport';
import { SocialSupportComponent } from './SocialSupport';

export function SupportUsComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState('financial');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'financial' || tab === 'social') {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (key: any) => {
    setSelectedTab(key as string);
    router.push(`/support-us?tab=${key}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-10 h-full">
      <CircleHeading
        icon={<Heart className="fill-secondary-foreground" size="44" />}
        title="انرژی مثبت"
        description="اگه از پادکست‌هامون خوشت اومده، می‌تونی با حمایتت باعث بشی که بیشتر کنارت بمونیم."
      />
      <div className="flex flex-col items-center">
        <Tabs variant="solid" color="secondary" radius="full" size="lg" selectedKey={selectedTab} onSelectionChange={handleTabChange}>
          <Tab key="financial" title="حمایت مالی">
            <FinancialSupportComponent />
          </Tab>
          <Tab key="social" title="حمایت اجتماعی">
            <SocialSupportComponent />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
