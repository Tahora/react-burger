import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWSActions,
} from "../actions/websocket";
import { IWsOrdersState } from "../../utils/types";
import { Reducer } from "redux";

export interface IWsState {
  wsConnected: boolean;
  messages: IWsOrdersState[];
}

export const initialStateWsSocket: IWsState = {
  wsConnected: false,
  messages: new Array<IWsOrdersState>(),
};

export const wsReducer: Reducer<IWsState, TWSActions> = (
  state = initialStateWsSocket,
  action: TWSActions
) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE: {
      return {
        ...state,
        messages: [
          { ...action.payload, timestamp: new Date().getTime() / 1000 },
        ],
      };
    }

    default:
      return state;
  }
};
