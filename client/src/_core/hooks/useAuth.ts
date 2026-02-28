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
// If it gets back HTML (e.g. a Render sleeping-service page, an nginx 502, or
// a misconfigured proxy), it logs the raw text so you can see exactly what
// the server returned, then throws a human-readable error.
// ---------------------------------------------------------------------------
async function safeJson(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  if (!isJson) {
    // Read raw text so we can log the actual HTML / error page
    const rawText = await response.text();
    console.error(
      `[API] Expected JSON but received "${contentType}" from ${response.url}\n` +
      `HTTP status: ${response.status} ${response.statusText}\n` +
      `API_URL configured as: ${API_URL}\n` +
      `Raw response (first 500 chars):\n${rawText.slice(0, 500)}`
    );
    throw new Error(
      `Server returned a non-JSON response (${response.status} ${response.statusText}). ` +
      `Check the browser console for the full raw response. ` +
      `This usually means the API URL is wrong, the backend is down/sleeping, or a proxy is returning an error page.`
    );
  }

  return response.json();
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
      const response = await fetch(`${API_URL}/auth/login`, {
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
      const response = await fetch(`${API_URL}/auth/register`, {
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
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
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
      const response = await fetch(`${API_URL}/auth/reset-password`, {
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
