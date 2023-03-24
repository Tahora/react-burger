import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILED,
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_REQUEST_SUCCESS,
  SET_PASSWORD_REQUEST_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_REQUEST_SUCCESS,
  REGISTER_USER_REQUEST_FAILED,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_REQUEST_SUCCESS,
  GET_USER_DATA_REQUEST_FAILED,
  SET_USER_DATA_REQUEST,
  SET_USER_DATA_REQUEST_SUCCESS,
  SET_USER_DATA_REQUEST_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_REQUEST_SUCCESS,
  REFRESH_TOKEN_REQUEST_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_REQUEST_SUCCESS,
  LOGIN_USER_REQUEST_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_REQUEST_SUCCESS,
  LOGOUT_USER_REQUEST_FAILED,
} from "../actions/authorization";

import { tokens } from "../../utils/constants";

import { setCookie, deleteCookie } from "../../utils/cookie";

export const initStateRegister = {
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  registerRequest: false,
  registerFailed: false,
  userDataRequest: false,
  userDataFailed: false,
  setUserDataRequest: false,
  setUserDataFailed: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  setPasswordRequest: false,
  setPasswordFailed: false,
  user: {},
};

export const registerReducer = (state = initStateRegister, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return { ...state, registerRequest: true };
    }
    case REGISTER_USER_REQUEST_SUCCESS: {
      setCookie(tokens.refreshToken, action.data.refreshToken);
      setCookie(
        tokens.accessToken,
        action.data.accessToken.split("Bearer ")[1]
      );
      return {
        ...state,
        registerFailed: false,
        registerRequest: false,
        user: {
          ...action.data.user,
        },
      };
    }
    case REGISTER_USER_REQUEST_FAILED: {
      return { ...state, registerFailed: true, registerRequest: false };
    }
    case RESET_PASSWORD_REQUEST: {
      return { ...state, resetPasswordRequest: true };
    }
    case RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        resetPasswordFailed: false,
        resetPasswordRequest: false,
      };
    }
    case RESET_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
      };
    }
    case SET_PASSWORD_REQUEST: {
      return { ...state, setPasswordRequest: true };
    }
    case SET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        setPasswordFailed: false,
        setPasswordRequest: false,
      };
    }
    case SET_PASSWORD_REQUEST_FAILED: {
      return { ...state, setPasswordFailed: true, setPasswordRequest: false };
    }
    case LOGIN_USER_REQUEST: {
      return { ...state, loginRequest: true };
    }
    case LOGIN_USER_REQUEST_SUCCESS: {
      setCookie(tokens.refreshToken, action.data.refreshToken);
      setCookie(
        tokens.accessToken,
        action.data.accessToken.split("Bearer ")[1]
      );
      return {
        ...state,
        loginFailed: false,
        loginRequest: false,
        user: {
          ...action.data.user,
        },
      };
    }
    case LOGIN_USER_REQUEST_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }
    case LOGOUT_USER_REQUEST: {
      return { ...state, logoutRequest: true };
    }
    case LOGOUT_USER_REQUEST_SUCCESS: {
      deleteCookie(tokens.refreshToken);
      deleteCookie(tokens.accessToken);
      return {
        ...state,
        logoutFailed: false,
        logoutRequest: false,
        user: {},
      };
    }
    case LOGOUT_USER_REQUEST_FAILED: {
      return { ...state, logoutFailed: true, logoutRequest: false };
    }
    case GET_USER_DATA_REQUEST: {
      return { ...state, userDataRequest: true };
    }
    case GET_USER_DATA_REQUEST_SUCCESS: {
      return {
        ...state,
        userDataRequest: false,
        userDataRequestFailed: false,
        user: {
          ...action.data.user,
        },
      };
    }
    case GET_USER_DATA_REQUEST_FAILED: {
      return { ...state, userDataFailed: true, userDataRequest: false };
    }
    case SET_USER_DATA_REQUEST: {
      return { ...state, setUserDataRequest: true };
    }
    case SET_USER_DATA_REQUEST_SUCCESS: {
      return {
        ...state,
        setUserDataFailed: false,
        setUserDataRequest: false,
        user: {
          ...action.data.user,
        },
      };
    }
    case SET_USER_DATA_REQUEST_FAILED: {
      return { ...state, setUserDataFailed: true, setUserDataRequest: false };
    }
    case REFRESH_TOKEN_REQUEST: {
      return { ...state, refreshTokenRequest: true };
    }
    case REFRESH_TOKEN_REQUEST_SUCCESS: {
      setCookie(tokens.refreshToken, action.data.refreshToken);
      setCookie(
        tokens.accessToken,
        action.data.accessToken.split("Bearer ")[1]
      );
      return {
        ...state,
        refreshTokenFailed: false,
        refreshTokenRequest: false,
      };
    }
    case REFRESH_TOKEN_REQUEST_FAILED: {
      return { ...state, refreshTokenFailed: true, refreshTokenRequest: false };
    }
    default: {
      return state;
    }
  }
};
