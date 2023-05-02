import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../services/reducers";
import retry from "../middleware/retry-middleware";
import thunk, { ThunkAction } from "redux-thunk";
import { socketMiddleware } from "../middleware/socket-middleware";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../services/actions/websocket";
import { AnyAction } from "redux";
import {IWSActions} from "../utils/types";

const wsActions:IWSActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_STOP,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [retry, thunk, socketMiddleware(wsActions)],
});

export type RootState = ReturnType<typeof store.getState>;
// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;
export type AppThunkAction<R> = ThunkAction<R, RootState, unknown, AnyAction>;


