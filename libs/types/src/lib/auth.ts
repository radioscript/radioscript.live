export interface IdentityDto {
  identityInput: string;
}

export interface RegisterDto {
  identityInput: string;
  otp: string;
  password: string;
}

export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
}

export interface IdentityResponse {
  userExist: boolean;
}

export interface LoginDto {
  identityInput: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar_url: string;
  email: string;
  phone_number: string;
  blocked: boolean;
  block_reason: string;
}

export interface ForgotPasswordDto {
  identityInput: string;
}

export interface ChangePasswordDto {
  identityInput: string;
  otp: string;
  password: string;
}
export type ChangePasswordResponse = LoginResponse;

export interface SocialAuthDto {
  provider: authProvider;
}

export interface GoogleOneTapDto {
  credential: string;
}
export type authProvider = 'google' | 'github' | '';
export type authProviderName = 'گوگل' | 'گیت‌هاب' | '';

export type GoogleOneTapResponse = LoginResponse;

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}
