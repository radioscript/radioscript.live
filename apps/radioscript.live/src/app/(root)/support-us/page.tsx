import { SupportUsComponent } from '@/components';
import { Spinner } from '@heroui/react';
import { Suspense } from 'react';

const SupportUsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center">
          <div className="text-center mb-6">
            <p className="text-lg font-bold">در حال بارگذاری...</p>
            <p className="text-small text-default-500">لطفا کمی صبر کنید.</p>
          </div>
          <Spinner color="primary" size="lg" />
        </div>
      }
    >
      <SupportUsComponent />
    </Suspense>
  );
};

export default SupportUsPage;
