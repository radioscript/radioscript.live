import { API_BASE_URL_VERSIONED } from '@/constants';
import {
  ChangePasswordResponse,
  ForgotPasswordDto,
  GeneralResponse,
  GoogleOneTapDto,
  GoogleOneTapResponse,
  IdentityDto,
  IdentityResponse,
  LoginDto,
  LoginResponse,
  RegisterDto,
  RegisterResponse,
} from '@/types';
import { fetcher } from '../fetcher';

export const identity = async (url: string, { arg }: { arg: IdentityDto }): Promise<IdentityResponse> => {
  return await fetcher<IdentityResponse>(`${API_BASE_URL_VERSIONED}/${url}`, { method: 'POST', body: arg });
};

export const register = async (url: string, { arg }: { arg: RegisterDto }): Promise<RegisterResponse> => {
  return await fetcher<RegisterResponse>(`${API_BASE_URL_VERSIONED}/${url}`, { method: 'POST', body: arg });
};

export const login = async (url: string, { arg }: { arg: LoginDto }): Promise<LoginResponse> => {
  return await fetcher<LoginResponse>(`${API_BASE_URL_VERSIONED}/${url}`, { method: 'POST', body: arg });
};

export const forgotPassword = async (url: string, { arg }: { arg: ForgotPasswordDto }): Promise<GeneralResponse> => {
  return await fetcher<GeneralResponse>(`${API_BASE_URL_VERSIONED}/${url}`, { method: 'POST', body: arg });
};

export const changePassword = async (url: string, { arg }: { arg: ForgotPasswordDto }): Promise<ChangePasswordResponse> => {
  return await fetcher<ChangePasswordResponse>(`${API_BASE_URL_VERSIONED}/${url}`, { method: 'PATCH', body: arg });
};

export const googleAuth = async (url: string): Promise<any> => {
  return await fetcher<any>(`${API_BASE_URL_VERSIONED}/${url}`, { method: 'GET' });
};

export const githubAuth = async (url: string): Promise<any> => {
  return await fetcher<any>(`${API_BASE_URL_VERSIONED}/${url}`, { method: 'GET' });
};

export const googleOneTapLogin = async (url: string, { arg }: { arg: GoogleOneTapDto }): Promise<GoogleOneTapResponse> => {
  return await fetcher<GoogleOneTapResponse>(`${API_BASE_URL_VERSIONED}/${url}`, { method: 'POST', body: arg });
};
