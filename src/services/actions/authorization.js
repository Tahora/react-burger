import {
  getData,
  resetPasswordRequest,
  setPasswordRequest,
  registerUserRequest,
  loginRequest,
  getUserDataRequest,
  setUserDataRequest,
  refreshTokenRequest,
  logoutRequest,
} from "../../utils/api";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_REQUEST_SUCCESS = "RESET_PASSWORD_REQUEST_SUCCESS";
export const RESET_PASSWORD_REQUEST_FAILED = "RESET_PASSWORD_REQUEST_FAILED";
export const CLEAN_RESET_PASSWORD_RESULT = "RESET_PASSWORD_RESULT";

export const SET_PASSWORD_REQUEST = "SET_PASSWORD_REQUEST";
export const SET_PASSWORD_REQUEST_SUCCESS = "SET_PASSWORD_REQUEST_SUCCESS";
export const SET_PASSWORD_REQUEST_FAILED = "SET_PASSWORD_REQUEST_FAILED";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_REQUEST_SUCCESS = "REGISTER_USER_REQUEST_SUCCESS";
export const REGISTER_USER_REQUEST_FAILED = "REGISTER_USER_REQUEST_FAILED";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_REQUEST_SUCCESS = "LOGIN_USER_REQUEST_SUCCESS";
export const LOGIN_USER_REQUEST_FAILED = "LOGIN_USER_REQUEST_FAILED";

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_REQUEST_SUCCESS = "LOGOUT_USER_REQUEST_SUCCESS";
export const LOGOUT_USER_REQUEST_FAILED = "LOGOUT_USER_REQUEST_FAILED";

export const GET_USER_DATA_REQUEST = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_REQUEST_SUCCESS = "GET_USER_DATA_REQUEST_SUCCESS";
export const GET_USER_DATA_REQUEST_FAILED = "GET_USER_DATA_REQUEST_FAILED";

export const SET_USER_DATA_REQUEST = "SET_USER_DATA_REQUEST";
export const SET_USER_DATA_REQUEST_SUCCESS = "SET_USER_DATA_REQUEST_SUCCESS";
export const SET_USER_DATA_REQUEST_FAILED = "SET_USER_DATA_REQUEST_FAILED";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_REQUEST_SUCCESS = "REFRESH_TOKEN_REQUEST_SUCCESS";
export const REFRESH_TOKEN_REQUEST_FAILED = "REFRESH_TOKEN_REQUEST_FAILED";

export function resetPassword(email) {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    // Запрашиваем данные у сервера
    getData(resetPasswordRequest, { email })
      .then((res) => {
        dispatch({ type: RESET_PASSWORD_REQUEST_SUCCESS, data: res });
      })
      .catch((err) => {
        dispatch({ type: RESET_PASSWORD_REQUEST_FAILED });
      });
  };
}

export const clearResetPasswordResult = () => {
  return {
    type: CLEAN_RESET_PASSWORD_RESULT,
  };
};

export function setPassword({ password, token }) {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: SET_PASSWORD_REQUEST,
    });
    // Запрашиваем данные у сервера
    getData(setPasswordRequest, { password, token })
      .then((res) => {
        dispatch({ type: SET_PASSWORD_REQUEST_SUCCESS, data: res });
      })
      .catch((err) => {
        dispatch({ type: SET_PASSWORD_REQUEST_FAILED });
      });
  };
}

export function registerUser(email, password, name) {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    // Запрашиваем данные у сервера
    getData(registerUserRequest, { email, password, name })
      .then((res) => {
        dispatch({ type: REGISTER_USER_REQUEST_SUCCESS, data: res });
      })
      .catch((err) => {
        dispatch({ type: REGISTER_USER_REQUEST_FAILED });
      });
  };
}

export function loginUser(email, password) {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    // Запрашиваем данные у сервера
    getData(loginRequest, { email, password })
      .then((res) => {
        dispatch({ type: LOGIN_USER_REQUEST_SUCCESS, data: res });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_USER_REQUEST_FAILED });
      });
  };
}

export function logoutUser() {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    // Запрашиваем данные у сервера
    getData(logoutRequest)
      .then((res) => {
        dispatch({ type: LOGOUT_USER_REQUEST_SUCCESS, data: res });
      })
      .catch((err) => {
        dispatch({ type: LOGOUT_USER_REQUEST_FAILED });
      });
  };
}

export function refreshToken(isContinueExeption = false) {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    // Запрашиваем данные у сервера
    const r = getData(refreshTokenRequest)
      .then((res) => {
        dispatch({ type: REFRESH_TOKEN_REQUEST_SUCCESS, data: res });
      })
      .catch((err) => {
        dispatch({ type: REFRESH_TOKEN_REQUEST_FAILED });
        if (isContinueExeption) {
          throw err;
        }
      });
    return r;
  };
}

export function getUserData(isContinueExeption = false) {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: GET_USER_DATA_REQUEST,
    });
    const r = getData(getUserDataRequest).then(
      (res) => {
        dispatch({ type: GET_USER_DATA_REQUEST_SUCCESS, data: res });
      },
      (err) => {
        dispatch({ type: GET_USER_DATA_REQUEST_FAILED });
        if (isContinueExeption) {
          throw err;
        }
      }
    );
    return r;
  };
}

export function setUserData(fields, isContinueExeption = false) {
  return async function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    const r = getData(setUserDataRequest, fields).then(
      (res) => {
        dispatch({ type: SET_USER_DATA_REQUEST_SUCCESS, data: res });
      },
      (err) => {
        dispatch({ type: SET_USER_DATA_REQUEST_FAILED });
        if (isContinueExeption) {
          throw err;
        }
      }
    );
    return r;
  };
}

//
export const tryGetUserData = ({ errName = "none" }) => {
  return function (dispatch) {
    dispatch([getUserData(true), refreshToken(true)]);
  };
};

export const trySetUserData = ({ fields, errName = "none" }) => {
  return function (dispatch) {
    dispatch([setUserData(fields, true), refreshToken(true)]);
  };
};
