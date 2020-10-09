import { Action } from "redux";

export const AUTH_LOGIN_INIT = "[Authentication] Auth Login Init";
export const AUTH_LOGIN = "[Authentication] Auth Login";
export const AUTH_LOGIN_SUCCESS = "[Authentication] Auth Login Success";
export const AUTH_LOGIN_FAIL = "[Authentication] Auth Login Fail";

export const AUTH_LOGOUT = "[Authentication] Auth Logout";
export const AUTH_LOGOUT_SUCCESS = "[Authentication] Auth Logout Success";
export const AUTH_LOGOUT_FAIL = "[Authentication] Auth Logout Fail";

export const AUTH_TIMEOUT = "[Authentication] Auth Timeout";
export const AUTH_TIMEOUT_FAIL = "[Authentication] Auth Timeout Fail";

export const AUTH_CHECK_SESSION = "[Authentication] Auth Check Session";

export const authLoginInit: Action = (formData) => {
  return {
    type: AUTH_LOGIN_INIT,
    payload: formData,
  };
};

export const authLogin: Action = () => {
  return {
    type: AUTH_LOGIN,
  };
};

export const authLoginSuccess: Action = (apiResponse) => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: apiResponse,
  };
};

export const authLoginFail: Action = (errorMessage) => {
  return {
    type: AUTH_LOGIN_FAIL,
    payload: errorMessage,
  };
};

export const authLogout: Action = () => {
  // clearSession();
  return {
    type: AUTH_LOGOUT,
  };
};

export const authLogoutSuccess: Action = () => {
  return {
    type: AUTH_LOGOUT_SUCCESS,
  };
};

export const authLogoutFail: Action = (errorMessage) => {
  return {
    type: AUTH_LOGOUT_FAIL,
    payload: errorMessage,
  };
};

export const authLogoutTimeout: Action = (apiResponse) => {
  return {
    type: AUTH_TIMEOUT,
    payload: apiResponse,
  };
};

export const authLogoutTimeoutFail: Action = () => {
  // *** this action is related with authTimeoutHandler on Sagas fails
  return {
    type: AUTH_TIMEOUT_FAIL,
  };
};

export const authCheckSession: Action = () => {
  return {
    type: AUTH_CHECK_SESSION,
  };
};

export type AuthenticationAction =
  | authLoginInit
  | authLogin
  | authLoginSuccess
  | authLoginFail
  | authLogout
  | authLogoutSuccess
  | authLogoutFail
  | authLogoutTimeout
  | authLogoutTimeoutFail
  | authCheckSession;
