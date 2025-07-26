'use server';
import { cookies } from 'next/headers';

export const hasTokens = async () => {
  const cookieStore = await cookies();
  return !!cookieStore.get('access_token')?.value && !!cookieStore.get('refresh_token')?.value;
};

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');
  return accessToken?.value;
};

export const getTokens = async () => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get('access_token');
  const refresh_token = cookieStore.get('refresh_token');
  return { access_token, refresh_token };
};
