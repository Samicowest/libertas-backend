export const getApiUrl = () => {
    // In development, or if explicitly set, use the environment variable
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    // Fallback to relative path (useful if serving frontend from same origin, or proxying)
    return '/api';
};

export const API_URL = getApiUrl();
