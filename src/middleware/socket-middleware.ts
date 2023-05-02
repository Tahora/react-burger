import { wsCloseReason } from "../utils/constants";
import { Middleware } from "redux";
import { IWsOrdersResponse } from "../utils/types";

export const socketMiddleware = (wsActions: any): Middleware => {
  return (store) => {
    let socket: WebSocket | undefined = undefined;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const {
        wsInit,
        wsClose,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;
      if (type === wsInit) {
        const wsUrl = `${payload.url}${
          payload.token ? `?token=${payload.token}` : ""
        }`;
        socket = new WebSocket(`${wsUrl}`);
      }
      if (socket) {
        if (type === wsClose) {
          socket.close(wsCloseReason.closeNormal, "закрыто клиентом");
        }

        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: Event) => {
          console.log(event);
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData: IWsOrdersResponse = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
