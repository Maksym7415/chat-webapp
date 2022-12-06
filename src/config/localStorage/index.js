// Token
export const setTokenLS = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  refreshToken && localStorage.setItem("refreshToken", refreshToken);
};

export const getTokenLS = () => {
  return localStorage.getItem("accessToken");
};

export const removeTokenLS = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Lang
export const setLanguageLS = (lang) => {
  localStorage.setItem("@@lang", lang);
};

export const getLanguageLS = () => {
  return localStorage.getItem("@@lang");
};
