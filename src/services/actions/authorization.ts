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
import { AppThunkAction } from "../../store";
import {
  IEmail,
  IMessageResponse,
  IName,
  IPassword,
  IRegisteredUser,
  IToken,
  ITokensResponse,
} from "../../utils/types";
import { TRetryAction } from "../../middleware/retry-middleware";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_REQUEST_SUCCESS: "RESET_PASSWORD_REQUEST_SUCCESS" =
  "RESET_PASSWORD_REQUEST_SUCCESS";
export const RESET_PASSWORD_REQUEST_FAILED: "RESET_PASSWORD_REQUEST_FAILED" =
  "RESET_PASSWORD_REQUEST_FAILED";
export const CLEAN_RESET_PASSWORD_RESULT: "RESET_PASSWORD_RESULT" =
  "RESET_PASSWORD_RESULT";

export const SET_PASSWORD_REQUEST: "SET_PASSWORD_REQUEST" =
  "SET_PASSWORD_REQUEST";
export const SET_PASSWORD_REQUEST_SUCCESS: "SET_PASSWORD_REQUEST_SUCCESS" =
  "SET_PASSWORD_REQUEST_SUCCESS";
export const SET_PASSWORD_REQUEST_FAILED: "SET_PASSWORD_REQUEST_FAILED" =
  "SET_PASSWORD_REQUEST_FAILED";

export const REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST" =
  "REGISTER_USER_REQUEST";
export const REGISTER_USER_REQUEST_SUCCESS: "REGISTER_USER_REQUEST_SUCCESS" =
  "REGISTER_USER_REQUEST_SUCCESS";
export const REGISTER_USER_REQUEST_FAILED: "REGISTER_USER_REQUEST_FAILED" =
  "REGISTER_USER_REQUEST_FAILED";

export const LOGIN_USER_REQUEST: "LOGIN_USER_REQUEST" = "LOGIN_USER_REQUEST";
export const LOGIN_USER_REQUEST_SUCCESS: "LOGIN_USER_REQUEST_SUCCESS" =
  "LOGIN_USER_REQUEST_SUCCESS";
export const LOGIN_USER_REQUEST_FAILED: "LOGIN_USER_REQUEST_FAILED" =
  "LOGIN_USER_REQUEST_FAILED";

export const LOGOUT_USER_REQUEST: "LOGOUT_USER_REQUEST" = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_REQUEST_SUCCESS: "LOGOUT_USER_REQUEST_SUCCESS" =
  "LOGOUT_USER_REQUEST_SUCCESS";
export const LOGOUT_USER_REQUEST_FAILED: "LOGOUT_USER_REQUEST_FAILED" =
  "LOGOUT_USER_REQUEST_FAILED";

export const GET_USER_DATA_REQUEST: "GET_USER_DATA_REQUEST" =
  "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_REQUEST_SUCCESS: "GET_USER_DATA_REQUEST_SUCCESS" =
  "GET_USER_DATA_REQUEST_SUCCESS";
export const GET_USER_DATA_REQUEST_FAILED: "GET_USER_DATA_REQUEST_FAILED" =
  "GET_USER_DATA_REQUEST_FAILED";

export const SET_USER_DATA_REQUEST: "SET_USER_DATA_REQUEST" =
  "SET_USER_DATA_REQUEST";
export const SET_USER_DATA_REQUEST_SUCCESS: "SET_USER_DATA_REQUEST_SUCCESS" =
  "SET_USER_DATA_REQUEST_SUCCESS";
export const SET_USER_DATA_REQUEST_FAILED: "SET_USER_DATA_REQUEST_FAILED" =
  "SET_USER_DATA_REQUEST_FAILED";

export const REFRESH_TOKEN_REQUEST: "REFRESH_TOKEN_REQUEST" =
  "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_REQUEST_SUCCESS: "REFRESH_TOKEN_REQUEST_SUCCESS" =
  "REFRESH_TOKEN_REQUEST_SUCCESS";
export const REFRESH_TOKEN_REQUEST_FAILED: "REFRESH_TOKEN_REQUEST_FAILED" =
  "REFRESH_TOKEN_REQUEST_FAILED";

export type TAuthorizationActions =
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | ISetPasswordRequestAction
  | ICleanResetPasswordAction
  | ISetPasswordSuccessAction
  | ISetPasswordFailedAction
  | IRegisterUserAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | ILoginUserAction
  | ILoginUserSuccessAction
  | ILoginUserFailedAction
  | ILogoutUserAction
  | ILogoutUserSuccessAction
  | ILogoutUserFailedAction
  | IRefreshTokenFailedAction
  | IRefreshTokenSuccessAction
  | IRefreshTokenAction
  | IGetUserDataAction
  | IGetUserDataSuccessAction
  | IGetUserDataFailedAction
  | ISetUserDataAction
  | ISetUserDataSuccessAction
  | ISetUserDataFailedAction;

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_REQUEST_SUCCESS;
  readonly data: IMessageResponse;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_REQUEST_FAILED;
}

export interface ICleanResetPasswordAction {
  readonly type: typeof CLEAN_RESET_PASSWORD_RESULT;
}

export interface ISetPasswordRequestAction {
  readonly type: typeof SET_PASSWORD_REQUEST;
}

export interface ISetPasswordSuccessAction {
  readonly type: typeof SET_PASSWORD_REQUEST_SUCCESS;
  readonly data: IMessageResponse;
}

export interface ISetPasswordFailedAction {
  readonly type: typeof SET_PASSWORD_REQUEST_FAILED;
}

export interface IRegisterUserAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_REQUEST_SUCCESS;
  readonly data: IRegisteredUser;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_REQUEST_FAILED;
}

export interface ILoginUserAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_REQUEST_SUCCESS;
  readonly data: IRegisteredUser;
}

export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_REQUEST_FAILED;
}

export interface ILogoutUserAction {
  readonly type: typeof LOGOUT_USER_REQUEST;
}

export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_REQUEST_SUCCESS;
  readonly data: IMessageResponse;
}

export interface ILogoutUserFailedAction {
  readonly type: typeof LOGOUT_USER_REQUEST_FAILED;
}

export interface IGetUserDataAction {
  readonly type: typeof GET_USER_DATA_REQUEST;
}

export interface IGetUserDataSuccessAction {
  readonly type: typeof GET_USER_DATA_REQUEST_SUCCESS;
  readonly data: IRegisteredUser;
}

export interface IGetUserDataFailedAction {
  readonly type: typeof GET_USER_DATA_REQUEST_FAILED;
}

export interface ISetUserDataAction {
  readonly type: typeof SET_USER_DATA_REQUEST;
}

export interface ISetUserDataSuccessAction {
  readonly type: typeof SET_USER_DATA_REQUEST_SUCCESS;
  readonly data: IRegisteredUser;
}

export interface ISetUserDataFailedAction {
  readonly type: typeof SET_USER_DATA_REQUEST_FAILED;
}

export interface IRefreshTokenAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST_SUCCESS;
  readonly data: ITokensResponse;
}

export interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST_FAILED;
}

export function resetPassword(email: string): AppThunkAction<void> {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    // Запрашиваем данные у сервера
    getData<IMessageResponse, IEmail>(resetPasswordRequest, { email })
      .then((res) => {
        dispatch({ type: RESET_PASSWORD_REQUEST_SUCCESS, data: res });
      })
      .catch((err) => {
        dispatch({ type: RESET_PASSWORD_REQUEST_FAILED });
      });
  };
}

export const clearResetPasswordResult = (): ICleanResetPasswordAction => {
  return {
    type: CLEAN_RESET_PASSWORD_RESULT,
  };
};

export function setPassword({
  password,
  token,
}: IPassword & IToken): AppThunkAction<void> {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: SET_PASSWORD_REQUEST,
    });
    // Запрашиваем данные у сервера
    getData<IMessageResponse, IPassword & IToken>(setPasswordRequest, {
      password,
      token,
    })
      .then((res) => {
        dispatch({ type: SET_PASSWORD_REQUEST_SUCCESS, data: res });
      })
      .catch((err) => {
        dispatch({ type: SET_PASSWORD_REQUEST_FAILED });
      });
  };
}

export function registerUser(
  email: string,
  password: string,
  name: string
): AppThunkAction<void> {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    // Запрашиваем данные у сервера
    getData<IRegisteredUser, IPassword & IEmail & IName>(registerUserRequest, {
      email,
      password,
      name,
    })
      .then((res) => {
        dispatch({ type: REGISTER_USER_REQUEST_SUCCESS, data: res });
      })
      .catch((err) => {
        dispatch({ type: REGISTER_USER_REQUEST_FAILED });
      });
  };
}

export function loginUser(
  email: string,
  password: string
): AppThunkAction<void> {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    // Запрашиваем данные у сервера
    getData<IRegisteredUser, IPassword & IEmail>(loginRequest, {
      email,
      password,
    })
      .then((res) => {
        dispatch({ type: LOGIN_USER_REQUEST_SUCCESS, data: res });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_USER_REQUEST_FAILED });
      });
  };
}

export function logoutUser(): AppThunkAction<void> {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    // Запрашиваем данные у сервера
    getData<IMessageResponse, undefined>(logoutRequest, undefined)
      .then((res) => {
        dispatch({ type: LOGOUT_USER_REQUEST_SUCCESS, data: res });
      })
      .catch((err) => {
        dispatch({ type: LOGOUT_USER_REQUEST_FAILED });
      });
  };
}

export function refreshToken(isContinueExeption = false): AppThunkAction<void> {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    // Запрашиваем данные у сервера
    const r = getData<ITokensResponse, undefined>(
      refreshTokenRequest,
      undefined
    )
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

export function getUserData(isContinueExeption = false): AppThunkAction<void> {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: GET_USER_DATA_REQUEST,
    });
    const r = getData<IRegisteredUser, undefined>(
      getUserDataRequest,
      undefined
    ).then(
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

export function setUserData(
  fields: IEmail & IPassword & IName,
  isContinueExeption = false
): AppThunkAction<void> {
  return async function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    const r = getData<IRegisteredUser, IEmail & IPassword & IName>(
      setUserDataRequest,
      fields
    ).then(
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
export const tryGetUserData = ({
  errName = "none",
}): TRetryAction<AppThunkAction<void>> => {
  return function (dispatch) {
    dispatch([getUserData(true), refreshToken(true)]);
  };
};

export const trySetUserData = ({
  fields,
  errName = "none",
}: {
  fields: IEmail & IPassword & IName;
  errName: string;
}): TRetryAction<AppThunkAction<void>> => {
  return function (dispatch) {
    dispatch([setUserData(fields, true), refreshToken(true)]);
  };
};
