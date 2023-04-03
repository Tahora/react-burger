import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../actions/websocket";

export const initialStateWsSocket = {
  wsConnected: false,
  messages: [],
};

export const wsReducer = (state = initialStateWsSocket, action) => {
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
      console.log(`get from WS ${action.payload}`);
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
