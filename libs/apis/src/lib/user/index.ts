import { API_BASE_URL_VERSIONED } from '@/constants';
import { User, ProfileResponse } from '@/types';
import { fetcher } from '../fetcher';

export const getProfile = async (url: string): Promise<ProfileResponse> => {
  return await fetcher<ProfileResponse>(`${API_BASE_URL_VERSIONED}/${url}`, { method: 'GET' });
};

export const updateProfile = async (url: string, { arg }: { arg: User }): Promise<ProfileResponse> => {
  return await fetcher<ProfileResponse>(`${API_BASE_URL_VERSIONED}/${url}`, { method: 'POST', body: arg });
};
