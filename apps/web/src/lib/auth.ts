export const setToken = (token: string) => {
  localStorage.setItem("token", token);
  // Set cookie for Middleware access
  document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
};
