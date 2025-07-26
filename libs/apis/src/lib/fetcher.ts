import { API_BASE_URL_VERSIONED } from '@/constants';
import { getAccessToken } from '@/hooks/server';
import { addToast } from '@heroui/react';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type FetcherOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  isFormData?: boolean;
};

const refreshToken = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL_VERSIONED}/auth/refresh-token`, {
    method: 'POST',
    credentials: 'include', // Send cookies (refresh_token)
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    deleteAllCookie();
    window.location.pathname = '/auth/identity';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  await response.json();
};

export const fetcher = async <T>(
  url: string,
  { method = 'GET', headers = {}, body = null, isFormData = false }: FetcherOptions = {}
): Promise<T> => {
  const sendRequest = async () => {
    const token = await getAccessToken();
    const options: RequestInit = {
      method,
      credentials: 'include',
      headers: {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...headers,
      },
    };
    if (body) {
      options.body = isFormData ? (body as FormData) : JSON.stringify(body);
    }
    return fetch(url, options);
  };

  try {
    let response = await sendRequest();

    if (response.status === 401) {
      await refreshToken();
      response = await sendRequest();
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const err = new Error(errorData.message || 'An error occurred');
      (err as any).status = response.status;
      addToast({
        title: 'خطا',
        description: err.message,
        color: 'danger',
        timeout: 10000,
      });
      throw err;
    }

    return (await response.json()) as T;
  } catch (e: unknown) {
    if (e instanceof TypeError) {
      // Network‐level error: create and throw a new Error with your own message
      const netErr = new Error('ارتباط با سرور برقرار نشد. لطفاً اتصال شبکهٔ خود را بررسی کنید و دوباره تلاش کنید.');
      addToast({
        title: 'خطای ارتباط',
        description: netErr.message,
        color: 'warning',
        timeout: 10000,
      });
      throw netErr;
    }
    // Re‐throw any other errors untouched
    throw e;
  }
};

export async function deleteAllCookie(): Promise<void> {
  // 1) Hit your logout/clear‑cookies endpoint
  try {
    await fetch(`${API_BASE_URL_VERSIONED}/auth/logout`, {
      method: 'POST',
      credentials: 'include', // so the server can see & clear the HttpOnly cookie
    });
  } catch (err) {
    // even if the server call fails, we still want to clear client cookies
    console.warn('Failed to clear server cookies:', err);
  }

  // 2) Clear all cookies visible to JavaScript
  document.cookie.split(';').forEach((cookieString) => {
    const [rawName] = cookieString.split('=');
    const name = rawName.trim();
    // Overwrite with an expired cookie.
    // We include `path=/` to match cookies set on the root path.
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
  });
}
