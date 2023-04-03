import { getCookie } from "../../utils/cookie";
import { tokens } from "../../utils/constants";

export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_STOP = "WS_CONNECTION_STOP";
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";

export const startWsConnection = (url, isTokenRequired = false) => {
  const token = isTokenRequired ? getCookie(tokens.accessToken) : null;
  if (isTokenRequired && !token) throw new Error("Empty accessToken");
  return {
    type: WS_CONNECTION_START,
    payload: {
      token: token,
      url: url,
    },
  };
};

export const stopWsConnection = () => {
  return {
    type: WS_CONNECTION_STOP,
  };
};

export const sendWsMessage = () => {
  return {
    type: WS_SEND_MESSAGE,
  };
};

export const successWsConnection = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const closeWsConnection = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const errorWsConnection = () => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const getWsMessage = () => {
  return {
    type: WS_GET_MESSAGE,
  };
};
