import { delay, put, call } from "redux-saga/effects";

import * as fromAuthActions from "../actions";
import axiosAuthInstance from "../../axios/axios-authentication";
import { API_KEY } from "../../axios/web-api-key";

export function* authLogoutEffect(
  action: fromAuthActions.AuthenticationAction
) {
  try {
    // example implementation with call([context, fnName], ...args) Saga API
    yield call([localStorage, "removeItem"], "idToken");
    yield call([localStorage, "removeItem"], "expirationDate");
    yield call([localStorage, "removeItem"], "userId");
    yield put(fromAuthActions.authLogoutSuccess());
  } catch (err) {
    yield put(fromAuthActions.authLogoutFail(err));
  }
}

export function* authTimeoutEffect(
  action: fromAuthActions.AuthenticationAction
) {
  const tokenExpiresTime = action.payload.expiresIn;
  try {
    yield delay(tokenExpiresTime * 1000);
    yield put(fromAuthActions.authLogout());
  } catch (err) {
    yield put(fromAuthActions.authLogoutTimeoutFail());
  }
}

const savedSession = (apiResponse) => {
  const tokenExpiresTime = apiResponse.expiresIn;
  const expirationTime = new Date(
    new Date().getTime() + tokenExpiresTime * 1000
  );

  const sessionData = {
    idToken: apiResponse.idToken,
    expirationDate: new Date(expirationTime),
    userId: apiResponse.localId,
  };
  localStorage.setItem("idToken", sessionData.idToken);
  localStorage.setItem("expirationDate", sessionData.expirationDate);
  localStorage.setItem("userId", sessionData.userId);
};

const authLoginApi = (url, authData) => {
  return axiosAuthInstance.post(`${url}?key=${API_KEY}`, authData);
};

export function* authLoginEffect(action: fromAuthActions.AuthenticationAction) {
  const formData = action.payload;
  const authData = {
    email: formData.username,
    password: formData.password,
    returnSecureToken: true,
  };
  const url = formData.isSignUp
    ? "/accounts:signUp"
    : "accounts:signInWithPassword";
  try {
    yield put(fromAuthActions.authLogin());
    // example implementation with call(fn, ...args) Saga API
    const response = yield call(authLoginApi, url, authData);
    yield call(savedSession, response.data);
    yield put(fromAuthActions.authLoginSuccess(response.data));
    yield put(fromAuthActions.authLogoutTimeout(response.data));
  } catch (err) {
    yield put(fromAuthActions.authLoginFail(err));
  }
}

export function* authCheckSessionEffect(
  action: fromAuthActions.AuthenticationAction
) {
  const idToken = yield localStorage.getItem("idToken");
  if (!idToken) {
    yield put(fromAuthActions.authLogout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate <= new Date()) {
      yield put(fromAuthActions.authLogout());
    } else {
      const sessionData = {
        idToken: idToken,
        localId: yield localStorage.getItem("userId"),
        expiresIn: (expirationDate.getTime() - new Date().getTime()) / 1000,
      };
      yield put(fromAuthActions.authLoginSuccess(sessionData));
      yield put(fromAuthActions.authLogoutTimeout(sessionData));
    }
  }
}
