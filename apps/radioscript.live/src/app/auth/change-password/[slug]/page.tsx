'use client';
import { useAuthStore } from '@/store';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { addToast, Alert, Button, Card, CardBody, Input } from '@heroui/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ForgotPassword() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [showResendOtp, setShowResendOtp] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const [password, setPassword] = useState('');

  const router = useRouter();
  const routeParam = useParams();
  const identityInput = decodeURIComponent(routeParam.slug as any);

  const { changePassword, sendOtp, isLoading, errorMessage } = useAuthStore();

  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

  const handleResendOtp = async () => {
    setIsLoadingOtp(true);
    sendOtp(identityInput).then((c: any) => {
      addToast({ title: c.message, color: 'success' });
      setIsLoadingOtp(false);
    });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword({ identityInput, otp, password });
      router.push('/');
      router.refresh();
    } catch (error: any) {
      const statusCode = error?.response?.status || error?.status || 500;
      if (statusCode === 410) {
        setShowResendOtp(true);
      }
    }
  };

  return (
    <form onSubmit={handleChangePassword}>
      <div className="text-center mb-6">
        <p className="text-lg font-bold">ایجاد کلمه عبور جدید</p>
        <p className="text-small text-default-500">کد یک بار‌مصرف و کلمه عبور جدید را وارد کنید</p>
      </div>
      {errorMessage && <Alert className="my-4" color="danger" description={errorMessage} />}
      <Card>
        <CardBody className="px-6 py-8 flex items-center">
          <div className="flex flex-col gap-4 w-full">
            <Input
              label="کد یک بار‌مصرف"
              labelPlacement="outside"
              placeholder="کدی که برای شما ارسال شده"
              variant="bordered"
              size="lg"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
            <Input
              endContent={
                <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisiblePassword ? <EyeSlashIcon className=" w-6 h-6" /> : <EyeIcon className=" w-6 h-6" />}
                </button>
              }
              label="رمز عبور"
              placeholder="یک رمز عبور وارد کنید"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
            isDisabled={isLoading}
            autoFocus={true}
            type="submit"
            color="primary"
            className="w-full mt-4"
            size="lg"
          >
            تغییر کلمه عبور
          </Button>
        </CardBody>
      </Card>
    </form>
  );
}
