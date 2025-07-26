import { detectInputType, isValidEmail, isValidPhoneNumber } from '@/helpers';
import { useAuthStore } from '@/store';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from '@heroui/react';
import { addToast } from '@heroui/toast';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { object, string } from 'yup';

interface EditProfileFormProps {
  onFinishSubmit?: () => void;
}

interface ProfileFormValues {
  first_name: string;
  last_name: string;
  bio: string;
  email?: string;
  phone_number?: string;
}

const getValidationSchema = (createdBy: string) => {
  const isCreatedByPhone = isValidPhoneNumber(createdBy);
  return object().shape({
    first_name: string()
      .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
      .max(50, 'نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد')
      .required('نام الزامی است'),
    last_name: string()
      .min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد')
      .max(50, 'نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد')
      .required('نام خانوادگی الزامی است'),
    bio: string().max(500, 'بیوگرافی نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد'),
    email: isCreatedByPhone ? string().email('ایمیل نامعتبر است').required('ایمیل الزامی است') : string().email('ایمیل نامعتبر است'),
    phone_number: !isCreatedByPhone
      ? string()
          .matches(/^[0-9\-+]{9,15}$/, 'شماره تلفن نامعتبر است')
          .required('شماره تلفن الزامی است')
      : string(),
  });
};

export const EditProfileForm = ({ onFinishSubmit }: EditProfileFormProps) => {
  const { user, updateProfile, sendVerificationOtp, updateEmail, updatePhoneNumber, isLoading } = useAuthStore();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);

  const [recipient, setRecipient] = useState('');
  const [showResendOtp, setShowResendOtp] = useState(false);
  const [otp, setOtp] = useState('');

  const router = useRouter();

  const defaultValues: ProfileFormValues = {
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    bio: user.bio || '',
    email: user.email || '',
    phone_number: user.phone_number || '',
  };

  const handleSubmit = async (values: ProfileFormValues) => {
    try {
      const { email, phone_number, ...profile } = values;
      await updateProfile(profile);
      addToast({
        title: 'پروفایل شما با موفقیت بروزرسانی شد',
        color: 'success',
      });
      router.back();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'خطا در بروزرسانی پروفایل';
      addToast({ title: errorMessage, color: 'danger' });
      throw error;
    }
  };

  const handleSubmitOtp = async (recipient: string) => {
    try {
      const identity = detectInputType(recipient);

      if (identity === 'email') {
        await updateEmail({ email: recipient, otp });
      } else {
        await updatePhoneNumber({ phone_number: recipient, otp });
      }
      addToast({
        title: `${detectInputType(recipient) === 'email' ? 'ایمیل' : 'شماره همراه'} با موفقیت تایید شد`,
        color: 'success',
      });
      onClose();
    } catch (error: any) {
      const statusCode = error?.response?.status || error?.status || 500;
      if (statusCode === 410) {
        setShowResendOtp(true);
      }
    }
  };

  const handleResendOtp = async (recipient: string) => {
    setIsLoadingOtp(true);
    sendVerificationOtp(recipient).then(() => {
      setIsLoadingOtp(false);
      setShowResendOtp(false);
    });
  };

  return (
    <>
      <Formik
        initialValues={defaultValues}
        validationSchema={getValidationSchema(user.created_by || '')}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await handleSubmit(values);
          } finally {
            onFinishSubmit?.();
            setSubmitting(false);
          }
        }}
        enableReinitialize
      >
        {({ values, initialValues, errors, touched, handleChange, handleBlur, isSubmitting }) => {
          const emailChanged = values.email !== initialValues.email;
          const phoneChanged = values.phone_number !== initialValues.phone_number;

          return (
            <Form dir="rtl">
              <div className="flex flex-col gap-4  w-full flex-1">
                <Input
                  name="first_name"
                  label="نام"
                  placeholder="نام خود را وارد کنید"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={touched.first_name && errors.first_name}
                  isInvalid={touched.first_name && !!errors.first_name}
                  variant="bordered"
                  labelPlacement="inside"
                  size="lg"
                />
                <Input
                  name="last_name"
                  label="نام خانوادگی"
                  placeholder="نام خانوادگی خود را وارد کنید"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={touched.last_name && errors.last_name}
                  isInvalid={touched.last_name && !!errors.last_name}
                  variant="bordered"
                  labelPlacement="inside"
                  size="lg"
                />
                <Textarea
                  dir="rtl"
                  name="bio"
                  label="بیوگرافی"
                  placeholder="درباره خودتان بنویسید"
                  value={values.bio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={touched.bio && errors.bio}
                  isInvalid={touched.bio && !!errors.bio}
                  variant="bordered"
                  labelPlacement="inside"
                  size="lg"
                  minRows={3}
                  maxRows={5}
                />
                <div className="flex items-center gap-2">
                  <Input
                    name="email"
                    label="ایمیل"
                    placeholder="example@example.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={touched.email && errors.email}
                    isInvalid={touched.email && !!errors.email}
                    variant="bordered"
                    labelPlacement="inside"
                    size="lg"
                    className="flex-1"
                    isDisabled={user.created_by === 'email' || user.created_by === 'social_login'}
                    endContent={
                      emailChanged &&
                      isValidEmail(values.email || '') && (
                        <Button
                          isDisabled={isLoading}
                          isLoading={isLoading}
                          type="button"
                          color="primary"
                          onPress={async () => {
                            await sendVerificationOtp(values.email || '');
                            setRecipient(values.email || '');
                            onOpen();
                          }}
                        >
                          تایید ایمیل
                        </Button>
                      )
                    }
                  />
                </div>
                <Input
                  name="phone_number"
                  label="شماره تلفن"
                  placeholder="09123456789"
                  value={values.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={touched.phone_number && errors.phone_number}
                  isInvalid={touched.phone_number && !!errors.phone_number}
                  variant="bordered"
                  labelPlacement="inside"
                  size="lg"
                  isDisabled={user.created_by === 'phone_number'}
                  endContent={
                    phoneChanged &&
                    isValidPhoneNumber(values.phone_number || '') && (
                      <Button
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        type="button"
                        color="primary"
                        onPress={async () => {
                          await sendVerificationOtp(values.phone_number || '');
                          setRecipient(values.phone_number || '');
                          onOpen();
                        }}
                      >
                        تایید شماره
                      </Button>
                    )
                  }
                />

                <Button type="submit" color="primary" size="lg" className="w-full mt-4" isLoading={isSubmitting} isDisabled={isSubmitting}>
                  ذخیره تغییرات
                </Button>
                <Button
                  type="button"
                  color="secondary"
                  variant="bordered"
                  size="lg"
                  className="w-full "
                  onPress={() => {
                    router.back();
                  }}
                >
                  بازگشت
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>

      {/* Modal for OTP Verification */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                تایید {detectInputType(recipient) === 'email' ? 'ایمیل' : 'شماره همراه'}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => e.preventDefault()}>
                  <Input
                    label="کد تایید"
                    labelPlacement="outside"
                    placeholder={`کدی که برای ${recipient} ارسال شده`}
                    variant="faded"
                    size="lg"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    autoFocus
                  />
                </form>
                {showResendOtp && (
                  <Button
                    isLoading={isLoadingOtp}
                    isDisabled={isLoadingOtp || isLoading}
                    color="secondary"
                    variant="bordered"
                    className="w-full mt-4"
                    size="lg"
                    onPress={() => {
                      handleResendOtp(recipient);
                    }}
                  >
                    ارسال مجدد کد یک بار‌مصرف
                  </Button>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  بستن
                </Button>
                <Button
                  color="primary"
                  isDisabled={isLoading || isLoadingOtp}
                  isLoading={isLoading || isLoadingOtp}
                  onPress={() => {
                    handleSubmitOtp(recipient);
                  }}
                >
                  تایید {detectInputType(recipient) === 'email' ? 'ایمیل' : 'شماره همراه'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
