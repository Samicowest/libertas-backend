import { useCallback, useEffect, useMemo, useState } from "react";
import { API_URL } from "../../lib/api-config";

type User = {
  id: string;
  email: string;
  username?: string;
  role?: string;
};

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

const USER_STORAGE_KEY = "libertas_user";
const TOKEN_STORAGE_KEY = "libertas_token";

// ---------------------------------------------------------------------------
// safeJson — parses the response as JSON only if the server actually sent JSON.
// If it gets back HTML (Render sleeping page, nginx 502, misconfigured proxy),
// it logs the full raw text so you can see exactly what the server returned.
// ---------------------------------------------------------------------------
async function safeJson(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  if (!isJson) {
    const rawText = await response.text();

    // Detect Render's "service starting" page specifically
    const isRenderWakeup =
      rawText.toLowerCase().includes('starting') ||
      rawText.toLowerCase().includes('render') ||
      response.status === 503 ||
      response.status === 502;

    console.error(
      `[API] Expected JSON but received "${contentType}" from ${response.url}\n` +
      `HTTP status: ${response.status} ${response.statusText}\n` +
      `API_URL configured as: ${API_URL}\n` +
      `Raw response (first 800 chars):\n${rawText.slice(0, 800)}`
    );

    if (isRenderWakeup) {
      throw new Error(
        'The server is starting up (it goes to sleep after inactivity on the free plan). ' +
        'Please wait about 30 seconds and try again.'
      );
    }

    throw new Error(
      `Server returned an unexpected response (HTTP ${response.status} ${response.statusText}). ` +
      `Open the browser console (F12 → Console) to see what the server actually sent back. ` +
      `Common causes: wrong API URL, backend is down, or a proxy is returning an error page.`
    );
  }

  return response.json();
}

// ---------------------------------------------------------------------------
// fetchWithWakeup — wraps fetch so that any network-level failure (server
// completely unreachable / CORS error) also gives a friendly message.
// ---------------------------------------------------------------------------
async function fetchWithWakeup(url: string, options: RequestInit): Promise<Response> {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (networkErr: unknown) {
    const msg = networkErr instanceof Error ? networkErr.message : String(networkErr);
    console.error(`[API] Network error reaching ${url}:`, networkErr);

    if (msg.toLowerCase().includes('failed to fetch') || msg.toLowerCase().includes('networkerror')) {
      throw new Error(
        'Cannot reach the server. This usually means:\n' +
        '• The backend is offline or still starting up (wait 30s and retry)\n' +
        '• Your internet connection has an issue\n' +
        `• The API URL is wrong (currently: ${API_URL})`
      );
    }

    throw new Error(`Network error: ${msg}`);
  }
}

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = "/login" } =
    options ?? {};

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log(`[Auth] POST ${API_URL}/auth/login`);
      const response = await fetchWithWakeup(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await safeJson(response) as { message?: string };
        throw new Error(errorData.message || `Login failed (HTTP ${response.status})`);
      }

      const data = await safeJson(response) as { result: User; token: string };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.result));
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      setUser(data.result);
      return data.result;
    } catch (err) {
      console.error('[Auth] login error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log(`[Auth] POST ${API_URL}/auth/register`);
      const response = await fetchWithWakeup(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await safeJson(response) as { message?: string };
        throw new Error(errorData.message || `Signup failed (HTTP ${response.status})`);
      }

      const data = await safeJson(response);
      return data;
    } catch (err) {
      console.error('[Auth] signup error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
    setIsLoading(false);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      console.log(`[Auth] POST ${API_URL}/auth/forgot-password`);
      const response = await fetchWithWakeup(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await safeJson(response) as { message?: string };
      if (!response.ok) throw new Error(data.message || `Request failed (HTTP ${response.status})`);
      return data;
    } catch (err) {
      console.error('[Auth] forgotPassword error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (token: string, password: string) => {
    setIsLoading(true);
    try {
      console.log(`[Auth] POST ${API_URL}/auth/reset-password`);
      const response = await fetchWithWakeup(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await safeJson(response) as { message?: string };
      if (!response.ok) throw new Error(data.message || `Reset failed (HTTP ${response.status})`);
      return data;
    } catch (err) {
      console.error('[Auth] resetPassword error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const state = useMemo(() => {
    return {
      user,
      loading: isLoading,
      isAuthenticated: Boolean(user),
    };
  }, [user, isLoading]);

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (isLoading) return;
    if (user) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname === redirectPath) return;

    window.location.href = redirectPath;
  }, [redirectOnUnauthenticated, redirectPath, isLoading, user]);

  return {
    ...state,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
  };
}

