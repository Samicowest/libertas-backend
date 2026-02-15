export const COOKIE_NAME = "libertas_token";
export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "Libertas Alpha";

export const APP_LOGO =
  import.meta.env.VITE_APP_LOGO ||
  "/libertas-logo.png";

export const getLoginUrl = () => {
  return "/login";
};