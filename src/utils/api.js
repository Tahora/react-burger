import { getCookie } from "./cookie";
import { tokens } from "./constants";

const urlApi = {
  ingredients: "https://norma.nomoreparties.space/api/ingredients",
  order: "https://norma.nomoreparties.space/api/orders",
  resetPassword: "https://norma.nomoreparties.space/api/password-reset",
  register: "https://norma.nomoreparties.space/api/auth/register",
  login: "https://norma.nomoreparties.space/api/auth/login",
  logout: "https://norma.nomoreparties.space/api/auth/logout",
  token: "https://norma.nomoreparties.space/api/auth/token",
  user: "https://norma.nomoreparties.space/api/auth/user",
};

export async function getData(callbackApi, paramsApi) {
  const res = await callbackApi(paramsApi);
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(
      `Ошибка получения данных ${callbackApi.name}. ${data?.message}`,
      { cause: res }
    );
  }
  return data;
}

export function getIngredientsRequest() {
  return fetch(urlApi.ingredients);
}

export function getOrderIdRequest(ingredientsId) {
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

export function registerUserRequest({ email, password, name }) {
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

export function resetPasswordRequest({ email }) {
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

export function setPasswordRequest({ password, token }) {
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

export function loginRequest({ email, password }) {
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

export function setUserDataRequest() {
  const token = getCookie(tokens.accessToken);
  if (!token) throw new Error("Empty accessToken");
  return fetch(urlApi.user, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

