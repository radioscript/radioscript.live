'use client';
import { useAuthStore } from '@/store';
import { addToast } from '@heroui/react';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (callback: (notification: { isNotDisplayed: () => boolean; isSkippedMoment: () => boolean }) => void) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          disableAutoSelect: () => void;
          storeCredential: (credential: { id: string; password: string }) => Promise<void>;
          cancel: () => void;
          revoke: (userId: string, callback: () => void) => void;
        };
      };
    };
  }
}

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
  client_id: string;
}

const GOOGLE_CLIENT_ID = '539302863775-ei5gpad6im9jfp8o7r6e1lpocsh21rq5.apps.googleusercontent.com';

export const GoogleOneTap = ({ children }: { children: React.ReactNode }) => {
  const { googleOneTapLogin, isAuthenticated, isHydrated } = useAuthStore();
  const hasPromptShown = useRef(false);
  const isProcessingLogin = useRef(false);

  useEffect(() => {
    const style = document.createElement('style');
    const styleId = 'google-one-tap-dark-mode';
    style.id = styleId;

    // Function to update dark mode styles
    const updateDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      style.textContent = isDark
        ? `
        #credential_picker_container {
          background-color: rgb(32, 33, 36) !important;
        }
        .S7wjIf {
          background-color: rgb(32, 33, 36) !important;
          color: #fff !important;
        }
        .haAclf {
          color: #fff !important;
        }
        .Y5sE8d {
          color: #e3e3e3 !important;
        }
      `
        : '';
    };

    // Initial setup
    document.head.appendChild(style);
    updateDarkMode();

    // Watch for class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Load Google Identity Services Script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (!window.google || isAuthenticated || !isHydrated || hasPromptShown.current || window.location.pathname.includes('/auth')) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: GoogleCredentialResponse) => {
          if (response.credential && !isProcessingLogin.current) {
            try {
              isProcessingLogin.current = true;
              await googleOneTapLogin({ credential: response.credential });
              // PureRouter('/');
            } catch (error) {
              console.error(error);
              addToast({
                title: 'خطا در دریافت اطلاعات، روشی دیگری را امتحان کنید یا با پشتیبانی تماس بگیرید.',
                color: 'danger',
              });
            } finally {
              isProcessingLogin.current = false;
            }
          }
        },
        auto_select: false,
        cancel_on_tap_outside: false,
      });

      window.google.accounts.id.prompt((notification) => {
        hasPromptShown.current = true;
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('One Tap prompt not displayed:', notification);
        }
      });
    };

    return () => {
      style.remove();
      observer.disconnect();
      window.google?.accounts.id.cancel();
      hasPromptShown.current = false;
      isProcessingLogin.current = false;
      const scriptElement = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [googleOneTapLogin, isAuthenticated, isHydrated]);

  return <>{children}</>;
};

export default GoogleOneTap;
