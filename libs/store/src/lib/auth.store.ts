import { fetcher } from '@/apis';
import { API_BASE_URL_VERSIONED } from '@/constants';
import { createIdentityObject } from '@/helpers';
import { hasTokens } from '@/hooks/server';

import {
  ChangePasswordDto,
  ChangePasswordResponse,
  ForgotPasswordDto,
  GeneralResponse,
  GoogleOneTapDto,
  GoogleOneTapResponse,
  IdentityResponse,
  LoginDto,
  LoginResponse,
  ProfileResponse,
  RegisterDto,
  RegisterResponse,
  SocialAuthDto,
  User,
  authProviderName,
} from '@/types';
import { create } from 'zustand';

type AuthState = {
  user: User;
  isHydrated: boolean;
  isAuthenticated?: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  authProviderName: authProviderName;
  message: string;
};

type AuthActions = {
  initStates: () => void;
  identity: (identity: string) => Promise<IdentityResponse>;

  socialLogin: (socialAuthDto: SocialAuthDto) => Promise<void>;
  googleOneTapLogin: (googleOneTapDto: GoogleOneTapDto) => Promise<void>;

  login: (loginDto: LoginDto) => Promise<void>;
  register: (registerDto: RegisterDto) => Promise<void>;
  sendOtp: (identity: string) => Promise<GeneralResponse>;

  forgotPassword: (forgotPasswordDto: ForgotPasswordDto) => Promise<GeneralResponse>;
  changePassword: (forgotPasswordDto: ChangePasswordDto) => Promise<void>;

  getProfile: () => Promise<ProfileResponse>;
  updateProfile: (profileDto: User) => Promise<ProfileResponse>;
  updateAvatar: (formData: FormData) => Promise<ProfileResponse>;
  sendVerificationOtp: (identity: string) => Promise<GeneralResponse>;
  updateEmail: ({ email, otp }: { email: string; otp: string }) => Promise<ProfileResponse>;
  updatePhoneNumber: ({ phone_number, otp }: { phone_number: string; otp: string }) => Promise<ProfileResponse>;

  logout: () => Promise<void>;

  deleteAccount: () => Promise<void>;

  clearError: () => void;
};

const initialState: AuthState = {
  user: {},
  isAuthenticated: false,
  isLoading: false,
  errorMessage: null,
  authProviderName: '',
  isHydrated: false,
  message: '',
};

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  ...initialState,
  devtools: true,

  initStates: async () => {
    set({ isLoading: true });
    const HAS_TOKENS: boolean = await hasTokens();
    console.log(get().user);

    if (HAS_TOKENS) {
      set({
        isAuthenticated: true,
        isHydrated: true,
        isLoading: false,
      });
      await get().getProfile();
    } else {
      set({
        isAuthenticated: false,
        isHydrated: true,
        isLoading: false,
      });
    }
  },

  identity: async (identity: string): Promise<IdentityResponse> => {
    set({ isLoading: true, errorMessage: null });
    try {
      const inputType = createIdentityObject(identity);
      console.log('API_BASE_URL_VERSIONED', API_BASE_URL_VERSIONED);

      const response = await fetcher<IdentityResponse>(`${API_BASE_URL_VERSIONED}/auth/identity`, {
        method: 'POST',
        body: { ...inputType },
      });

      set({ isLoading: false });

      return response;
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در تایید هویت',
        isLoading: false,
      });
      throw error;
    }
  },

  socialLogin: async ({ provider }: SocialAuthDto): Promise<void> => {
    set({ isLoading: true, errorMessage: null });

    try {
      switch (provider) {
        case 'github':
          set({ authProviderName: 'گیت‌هاب' });
          break;
        case 'google':
          set({ authProviderName: 'گوگل' });

          break;
      }
      set({ isAuthenticated: true });
      get().getProfile();
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در ورود با شبکه اجتماعی',
        isLoading: false,
      });
      throw error;
    }
  },

  googleOneTapLogin: async ({ credential }: GoogleOneTapDto): Promise<void> => {
    set({ isLoading: true, errorMessage: null });
    try {
      const response = await fetcher<GoogleOneTapResponse>(`${API_BASE_URL_VERSIONED}/auth/google-one-tap`, {
        method: 'POST',
        body: { credential },
      });
      set({
        user: { ...response },
        isAuthenticated: true,
      });
      get().getProfile();
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در ورود با گوگل',
        isLoading: false,
      });
      throw error;
    }
  },

  login: async ({ identityInput, password }: LoginDto): Promise<void> => {
    set({ isLoading: true, errorMessage: null });
    const inputType = createIdentityObject(identityInput);

    try {
      await fetcher<LoginResponse>(`${API_BASE_URL_VERSIONED}/auth/login`, {
        method: 'POST',
        body: { ...inputType, password },
      });

      set({
        isAuthenticated: true,
      });
      get().getProfile();
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در ورود ',
        isLoading: false,
      });
      throw error; // Re-throw the error to maintain the Promise chain
    }
  },

  register: async ({ identityInput, password, otp }: RegisterDto): Promise<void> => {
    set({ isLoading: true, errorMessage: null });
    try {
      const inputType = createIdentityObject(identityInput);

      const user = await fetcher<RegisterResponse>(`${API_BASE_URL_VERSIONED}/auth/register`, {
        method: 'POST',
        body: { ...inputType, password, otp },
      });
      set({ user, isAuthenticated: true });
      get().getProfile();
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در ثبت نام',
        isLoading: false,
      });
      throw error;
    }
  },

  sendOtp: async (identityInput: string): Promise<GeneralResponse> => {
    set({ isLoading: true, errorMessage: null });
    try {
      const inputType = createIdentityObject(identityInput);

      const response = await fetcher<GeneralResponse>(`${API_BASE_URL_VERSIONED}/auth/send-otp`, {
        method: 'POST',
        body: { ...inputType },
      });

      set({ isLoading: false });
      return response;
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در ارسال رمز یکبارمصرف',
        isLoading: false,
      });
      throw error;
    }
  },

  forgotPassword: async ({ identityInput }: ForgotPasswordDto): Promise<GeneralResponse> => {
    set({ errorMessage: null });
    const inputType = createIdentityObject(identityInput);
    try {
      const { message } = await fetcher<GeneralResponse>(`${API_BASE_URL_VERSIONED}/auth/forgot-password`, {
        method: 'POST',
        body: { ...inputType },
      });
      set({ isLoading: false, message });
      return { message };
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در فراموشی رمز عبور',
        isLoading: false,
      });
      throw error;
    }
  },

  changePassword: async ({ identityInput, password, otp }: ChangePasswordDto): Promise<void> => {
    set({ isLoading: true, errorMessage: null });
    const inputType = createIdentityObject(identityInput);

    try {
      await fetcher<ChangePasswordResponse>(`${API_BASE_URL_VERSIONED}/auth/change-password`, {
        method: 'PATCH',
        body: { ...inputType, password, otp },
      });
      set({
        isAuthenticated: true,
      });
      get().getProfile();
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در تغییر کلمه عبور',
        isLoading: false,
      });
      throw error;
    }
  },

  getProfile: async (): Promise<ProfileResponse> => {
    set({ isLoading: true });
    try {
      const user: User = await fetcher(`${API_BASE_URL_VERSIONED}/auth/profile`);

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        isHydrated: true,
      });
      return user;
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در دریافت پروفایل',
        isLoading: false,
      });
      throw error;
    }
  },

  updateProfile: async (profileDto: User): Promise<ProfileResponse> => {
    set({ isLoading: true, errorMessage: null });
    try {
      const user: User = await fetcher<ChangePasswordResponse>(`${API_BASE_URL_VERSIONED}/auth/profile`, {
        method: 'PUT',

        body: { ...profileDto },
      });

      set({
        user,
        isLoading: false,
      });
      return user;
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در بروزرسانی پروفایل',
        isLoading: false,
      });
      throw error;
    }
  },

  updateAvatar: async (formData: FormData): Promise<ProfileResponse> => {
    set({ isLoading: true, errorMessage: null });
    try {
      const response = await fetcher<ProfileResponse>(`${API_BASE_URL_VERSIONED}/auth/avatar`, {
        method: 'PATCH',
        body: formData,
        isFormData: true,
      });

      set({
        isLoading: false,
        user: { avatar_url: response.avatar_url, ...response },
      });
      return response;
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در بروزرسانی پروفایل',
        isLoading: false,
      });

      throw error;
    }
  },

  sendVerificationOtp: async (identityInput: string): Promise<GeneralResponse> => {
    set({ isLoading: true, errorMessage: null });
    try {
      const inputType = createIdentityObject(identityInput);
      const response = await fetcher<GeneralResponse>(`${API_BASE_URL_VERSIONED}/auth/send-verification-otp`, {
        method: 'POST',
        body: { ...inputType },
      });

      set({ isLoading: false });
      return response;
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در ارسال کد تایید',
        isLoading: false,
      });
      throw error;
    }
  },

  updateEmail: async ({ email, otp }): Promise<ProfileResponse> => {
    set({ isLoading: true, errorMessage: null });
    try {
      const user: User = await fetcher<ChangePasswordResponse>(`${API_BASE_URL_VERSIONED}/auth/email`, {
        method: 'PATCH',
        body: { email, otp },
      });

      set({
        user,
        isLoading: false,
      });
      return user;
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در بروزرسانی پروفایل',
        isLoading: false,
      });
      throw error;
    }
  },

  updatePhoneNumber: async ({ phone_number, otp }): Promise<ProfileResponse> => {
    set({ isLoading: true, errorMessage: null });
    try {
      const user: User = await fetcher<ChangePasswordResponse>(`${API_BASE_URL_VERSIONED}/auth/phone-number`, {
        method: 'PATCH',

        body: { phone_number, otp },
      });

      set({
        user,
        isLoading: false,
      });
      return user;
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در بروزرسانی پروفایل',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    set({ isLoading: true, errorMessage: null });
    try {
      await fetcher<GoogleOneTapResponse>(`${API_BASE_URL_VERSIONED}/auth/logout`, {
        method: 'GET',
      });

      set(initialState);
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در خروج از حساب کاربری',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteAccount: async (): Promise<void> => {
    set({ isLoading: true, errorMessage: null });
    try {
      await fetcher<GoogleOneTapResponse>(`${API_BASE_URL_VERSIONED}/auth/delete-account`, {
        method: 'DELETE',
      });

      set(initialState);
    } catch (error) {
      set({
        errorMessage: error instanceof Error ? error.message : 'خطا در حذف حساب کاربری',
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ errorMessage: null }),
}));
