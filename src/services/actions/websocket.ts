import { getCookie } from "../../utils/cookie";
import { tokens } from "../../utils/constants";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_CONNECTION_STOP: "WS_CONNECTION_STOP" = "WS_CONNECTION_STOP";

export type TWSActions =
  | IWsConnectionStartAction
  | IWsConnectionStopAction
  | IWsSendMessageAction
  | IWsOpenEventAction
  | IWsCloseEventAction
  | IWsGetMessageAction
  | IWsErrorAction;

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: {
    readonly token: string;
    readonly url: string;
  };
}

export interface IWsConnectionStopAction {
  readonly type: typeof WS_CONNECTION_STOP;
}

export interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: any;
}

export interface IWsOpenEventAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: Event;
}

export interface IWsCloseEventAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: CloseEvent;
}

export interface IWsErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any;
}

export const startWsConnection = (
  url: string,
  isTokenRequired = false
): IWsConnectionStartAction => {
  const token: string | undefined = isTokenRequired
    ? getCookie(tokens.accessToken)
    : undefined;
  if (isTokenRequired && !token) throw new Error("Empty accessToken");
  return {
    type: WS_CONNECTION_START,
    payload: {
      token: token ? token : "",
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
