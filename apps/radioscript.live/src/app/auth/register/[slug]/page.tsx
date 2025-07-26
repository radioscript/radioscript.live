'use client';
import { useAuthStore } from '@/store';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Alert, Button, Card, CardBody, Input } from '@heroui/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [showResendOtp, setShowResendOtp] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const [password, setPassword] = useState('');

  const { register, identity, isLoading, errorMessage } = useAuthStore();
  const router = useRouter();
  const routeParam = useParams();
  const identityInput = decodeURIComponent(routeParam.slug as any);

  const handleResendOtp = async () => {
    setIsLoadingOtp(true);
    identity(identityInput).then((c: any) => {
      setIsLoadingOtp(false);
      setShowResendOtp(false);
    });
  };

  const handleNextClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ identityInput, otp, password });
      router.push('/');
      router.refresh();
    } catch (error: any) {
      const statusCode = error?.response?.status || error?.status || 500;
      if (statusCode === 410) {
        setShowResendOtp(true);
      }
    }
  };

  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

  return (
    <form onSubmit={handleNextClick}>
      <div className="text-center mb-6">
        <p className="text-lg font-bold">اعتبارسنجی و ثبت نام</p>
        <p className="text-small text-default-500">لطفا فیلد های خواسته شده رو پر کنید.</p>
      </div>
      {errorMessage && <Alert className="my-4" color="danger" title={errorMessage} />}
      <Card>
        <CardBody className="px-6 py-8 flex items-center">
          <div className="flex flex-col gap-4 w-full">
            <Input
              label="کد یک بار‌مصرف"
              labelPlacement="outside"
              variant="bordered"
              dir="ltr"
              size="lg"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              autoFocus
            />
            <Input
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none ps-4"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisiblePassword ? <EyeSlashIcon className=" w-6 h-6" /> : <EyeIcon className=" w-6 h-6" />}
                </button>
              }
              label="رمز عبور"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              dir="ltr"
              type={isVisiblePassword ? 'text' : 'password'}
              variant="bordered"
              labelPlacement="outside"
              size="lg"
            />
          </div>
          {showResendOtp && (
            <Button
              isLoading={isLoadingOtp}
              isDisabled={isLoadingOtp || isLoading}
              color="secondary"
              variant="ghost"
              className="w-full mt-4"
              size="lg"
              onPress={handleResendOtp}
            >
              ارسال مجدد کد یک بار‌مصرف
            </Button>
          )}
          <Button
            isLoading={isLoading}
            isDisabled={isLoading || isLoadingOtp || !otp || !password}
            autoFocus={true}
            type="submit"
            color="primary"
            className="w-full mt-4"
            size="lg"
          >
            ثبت نام
          </Button>
        </CardBody>
      </Card>
    </form>
  );
}
