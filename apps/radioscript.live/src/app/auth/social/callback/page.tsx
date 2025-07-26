'use client';
import { useAuthStore } from '@/store';
import { authProvider } from '@/types';
import { Alert, Spinner } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

const CallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { socialLogin, getProfile, authProviderName, isLoading, errorMessage } = useAuthStore();

  const provider: authProvider = (searchParams.get('provider') as authProvider) || '';

  useEffect(() => {
    socialLogin({ provider }).then(() => {
      getProfile().then(() => {
        router.push('/');
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-6">
        <p className="text-lg font-bold">ورود با {authProviderName} </p>
        <p className="text-small text-default-500">لطفا کمی صبر کنید تا اطلاعات دریافت شود.</p>
      </div>
      {errorMessage && <Alert className="my-4" color="danger" title={errorMessage} />}
      <Spinner color="secondary" size="lg" />
    </div>
  );
};

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center">
          <div className="text-center mb-6">
            <p className="text-lg font-bold">در حال بارگذاری...</p>
            <p className="text-small text-default-500">لطفا کمی صبر کنید.</p>
          </div>
          <Spinner color="secondary" size="lg" />
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
