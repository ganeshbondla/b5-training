// Base API URL
export const baseURL = "http://localhost:3049/api";

export const applicationBaseURL = "http://localhost:3000/";

// AUth Token
export const authTokenKey = "b5Token";

export const logoutHandler = () => {
  localStorage.removeItem(authTokenKey);
  window.location.href = applicationBaseURL;
};
