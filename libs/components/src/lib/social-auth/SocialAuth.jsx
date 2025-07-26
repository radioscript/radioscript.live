import { API_BASE_URL_VERSIONED } from '@/constants';
import { GithubIcon, GoogleIcon } from '../icons';

const validateIdentity = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+98|0)?9\d{9}$/; // Iranian phone number format

  if (emailRegex.test(input)) return 'email';
  if (phoneRegex.test(input)) return 'phone';
  return null;
};

const SocialButtonAuth = ({ onClick, Icon, text }) => {
  return (
    <button
      onClick={onClick}
      className="relative w-full h-12 flex justify-center items-center bg-black dark:text-black text-white dark:bg-white px-3 rounded-lg gap-2"
      type="button"
    >
      <Icon className="absolute start-3" />
      {text}
    </button>
  );
};

export function SocialAuth({ isDisabled }) {
  const handleGoogleClick = () => {
    window.location.href = `${API_BASE_URL_VERSIONED}/auth/google`;
  };
  const handleGithubClick = () => {
    window.location.href = `${API_BASE_URL_VERSIONED}/auth/github`;
  };

  const handleIdentityInput = (input) => {
    const type = validateIdentity(input);
    if (type === 'email') {
      // Handle email login
      console.log('Email login:', input);
    } else if (type === 'phone') {
      // Handle phone login
      console.log('Phone login:', input);
    } else {
      // Invalid input
      console.log('Invalid input');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <SocialButtonAuth onClick={() => handleGoogleClick()} Icon={GoogleIcon} text="ورود با گوگل" />
      <SocialButtonAuth onClick={() => handleGithubClick()} Icon={GithubIcon} text="ورود با گیت‌هاب" />
    </div>
  );
}
