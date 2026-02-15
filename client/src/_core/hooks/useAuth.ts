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
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const { result, token } = await response.json();
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result));
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      setUser(result);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    // No need to call a backend endpoint for logout with JWT, just clear local storage
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
    setIsLoading(false);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Request failed');
      return data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (token: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Reset failed');
      return data;
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
