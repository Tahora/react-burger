import { getCookie } from "./cookie";
import { tokens } from "./constants";
import {
  IMessageResponse,
  IEmail,
  IPassword,
  IName,
  IToken,
  TApiData,
} from "./types";

export const WS_BASE_URL: string = "wss://norma.nomoreparties.space/orders";
export const WS_BASE_URL_ALL: string =
  "wss://norma.nomoreparties.space/orders/all";

const BASE_URL: string = "https://norma.nomoreparties.space/api";

const urlApi: { [f: string]: string } = {
  ingredients: `${BASE_URL}/ingredients`,
  order: `${BASE_URL}/orders`,
  resetPassword: `${BASE_URL}/password-reset`,
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,
  logout: `${BASE_URL}/auth/logout`,
  token: `${BASE_URL}/auth/token`,
  user: `${BASE_URL}/auth/user`,
};

const isMessage = (o: any): o is IMessageResponse => {
  return "message" in o;
};

/*
const  hasntArguments=(x: Function): x is () => Promise<Response> => {
  return x.length > 0;
}

type TParamsApi<P,T extends ((params:P)=>any)|(()=>any)> = T extends (params:P)=>any
    ? P
    : undefined;
    */

export async function getData<T extends TApiData, P>(
  callbackApi: (params: P) => Promise<Response>,
  paramsApi: P
) {
  const res = await callbackApi(paramsApi);
  const data: T = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(
      `Ошибка получения данных ${callbackApi.name}. ${
        isMessage(data) ? data.message : ""
      }`,
      { cause: res }
    );
  }
  return data;
}

export function getIngredientsRequest() {
  return fetch(urlApi.ingredients);
}

export function getOrderIdRequest(ingredientsId: string[]) {
  const token = getCookie(tokens.accessToken);
  if (!token) throw new Error("Empty accessToken");
  return fetch(urlApi.order, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  });
}

export function registerUserRequest({
  email,
  password,
  name,
}: IEmail & IPassword & IName) {
  return fetch(urlApi.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
}

export function resetPasswordRequest({ email }: IEmail) {
  return fetch(urlApi.resetPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
}

export function setPasswordRequest({ password, token }: IToken & IPassword) {
  return fetch(`${urlApi.resetPassword}/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });
}

export function loginRequest({ email, password }: IEmail & IPassword) {
  return fetch(urlApi.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

export function logoutRequest() {
  const token = getCookie(tokens.refreshToken);
  if (!token) throw new Error("Empty refreshToken");
  return fetch(urlApi.logout, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
}

export function refreshTokenRequest() {
  const token = getCookie(tokens.refreshToken);
  if (!token) throw new Error("Empty refreshToken");
  return fetch(urlApi.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
}

export function getUserDataRequest() {
  const token = getCookie(tokens.accessToken);
  if (!token) throw new Error("Empty accessToken");
  return fetch(urlApi.user, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function setUserDataRequest(fields: IEmail & IPassword & IName) {
  const token = getCookie(tokens.accessToken);
  if (!token) throw new Error("Empty accessToken");
  const { email, name, password } = { ...fields };
  return fetch(urlApi.user, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  });
}
