'use client';
import { useAuthStore } from '@/store';
import { addToast, Alert, Button, Card, CardBody, Input } from '@heroui/react';
import { Eye, EyeSlash } from 'iconsax-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);

  const { login, forgotPassword, isLoading, errorMessage } = useAuthStore();

  const router = useRouter();
  const routeParam = useParams();
  const identityInput = decodeURIComponent(routeParam.slug as any);

  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

  const handleLoginClick = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ identityInput, password });
    router.push('/');
  };

  const handleResetPasswordClick = async () => {
    try {
      setIsForgotPasswordLoading(true);
      const { message } = await forgotPassword({ identityInput });
      addToast({ title: message, timeout: 3000, color: 'success' });
      router.push(`/auth/change-password/${identityInput}`);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'خطایی رخ داد';
      addToast({ title: errorMessage, color: 'danger' });
    } finally {
      setIsForgotPasswordLoading(false);
    }
  };

  return (
    <form onSubmit={handleLoginClick}>
      <div className="text-center mb-6">
        <p className="text-lg font-bold">ورود </p>
        <p className="text-small text-default-500">برای ورود رمزعبور خود را وارد کنید</p>
      </div>
      {errorMessage && <Alert className="my-4" color="danger" title={errorMessage} />}
      <Card>
        <CardBody className="px-6 py-8">
          <Input
            endContent={
              <button aria-label="toggle password visibility" className="focus:outline-none ps-4" type="button" onClick={toggleVisibility}>
                {isVisiblePassword ? (
                  <EyeSlash className=" w-6 h-6 stroke-black dark:stroke-white" />
                ) : (
                  <Eye className="w-6 h-6 stroke-black dark:stroke-white" />
                )}
              </button>
            }
            label="رمز عبور"
            placeholder="یک رمز عبور وارد کنید"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            color="default"
            type={isVisiblePassword ? 'text' : 'password'}
            variant="bordered"
            labelPlacement="outside"
            size="lg"
            dir="ltr"
            autoFocus
          />

          <Button type="submit" color="primary" className="w-full mt-12" size="lg" isDisabled={isLoading} isLoading={isLoading}>
            ورود
          </Button>
          <Button
            color="secondary"
            variant="ghost"
            className="w-full mt-4"
            size="lg"
            onPress={handleResetPasswordClick}
            isDisabled={isLoading || isForgotPasswordLoading}
            isLoading={isForgotPasswordLoading}
          >
            رمز عبور رو فراموش کردم
          </Button>
        </CardBody>
      </Card>
    </form>
  );
}
