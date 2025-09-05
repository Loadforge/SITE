const TOKEN_KEY = "ws_token";
const URI_KEY = "ws_uri";

export const connectionStorage = {
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  },

  getUri(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(URI_KEY);
  },

  setUri(uri: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(URI_KEY, uri);
  },

  removeUri(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(URI_KEY);
  },

  has(): boolean {
    if (typeof window === "undefined") return false;

    const token = localStorage.getItem(TOKEN_KEY);
    const uri = localStorage.getItem(URI_KEY);

    return !!token && !!uri; 
  },

  clearAll(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(URI_KEY);
  },
};
