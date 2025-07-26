'use client';
import { EmailIcon, SocialAuth } from '@/components';
import { detectInputType } from '@/helpers';
import { useAuthStore } from '@/store';
import { Alert, Button, Card, CardBody, Input } from '@heroui/react';
import { Call } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Login() {
  const router = useRouter();

  const [identityInput, setIdentityInput] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputType, setInputType] = useState<'email' | 'phone' | ''>('');
  const [inputMode, setInputMode] = useState<'email' | 'tel'>('email');

  const { isLoading, errorMessage, identity } = useAuthStore();

  useEffect(() => {
    handleInputChange(identityInput);
  }, [identityInput]);

  const handleInputChange = async (value: string, e?: React.ChangeEvent<HTMLInputElement>) => {
    const startsWithNumber = /^\d/.test(value);

    if (startsWithNumber) {
      setInputMode('tel');
      // Move cursor to the end after state update
      setTimeout(() => {
        e?.target.setSelectionRange(value.length, value.length);
      }, 0);
    } else {
      setInputMode('email');
    }

    setIdentityInput(value);
    const _inputType = detectInputType(value);

    switch (_inputType) {
      case 'email':
        setInputType('email');
        setIsDisabled(false);
        break;
      case 'phone':
        setInputType('phone');
        setIsDisabled(false);
        break;
      case 'invalid':
        setInputType('');
        setIsDisabled(true);
        break;
    }
  };

  const toggleInputMode = () => {
    if (inputMode === 'email') {
      setInputMode('tel');
    } else {
      setInputMode('email');
    }
  };

  const handleNextClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const { userExist } = await identity(identityInput);
    if (userExist) {
      router.push(`/auth/login/${identityInput}`);
    } else {
      router.push(`/auth/register/${identityInput}`);
    }
  };

  return (
    <form onSubmit={handleNextClick}>
      <div className="text-center mb-6">
        <p className="text-lg font-bold">ورود / ثبت‌نام</p>
        <p className="text-small text-default-500">حضورتون باعث دلگریمه</p>
      </div>
      {errorMessage && <Alert className="my-4" color="danger" title={errorMessage} />}
      <Card>
        <CardBody className="px-6 py-8">
          <Input
            dir="ltr"
            isRequired
            errorMessage="ایمیل یا شماره همراه را وارد کنید"
            label="ایمیل یا شماره همراه"
            labelPlacement="outside"
            validationBehavior="aria"
            name="phoneNumber"
            type={inputMode}
            size="lg"
            value={identityInput}
            variant="bordered"
            onChange={(e) => {
              handleInputChange(e.target.value, e);
            }}
            autoFocus
            startContent={
              <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={toggleInputMode}>
                {inputMode === 'email' ? (
                  <EmailIcon className=" w-6 h-6" />
                ) : (
                  <Call className="w-6 h-6 stroke-default-foreground" variant="Linear" />
                )}
              </button>
            }
          />
          <div className="flex gap-2 flex-col">
            <Button
              type="submit"
              color="primary"
              className="w-full mb-12 mt-4"
              size="lg"
              isDisabled={isDisabled || isLoading}
              isLoading={isLoading}
            >
              ادامه
            </Button>

            <SocialAuth isDisabled={isLoading} />
          </div>
        </CardBody>
      </Card>
    </form>
  );
}
