import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/app/app";
import { createStore, applyMiddleware } from "redux";
import { rootReducer, initState } from "./services/reducers";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import retry from "./middleware/retry-middleware";
import { socketMiddleware } from "./middleware/socket-middleware";
import { BrowserRouter } from "react-router-dom";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_SEND_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_CONNECTION_STOP,
} from "./services/actions/websocket";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_STOP,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(
  rootReducer,
  initState,
  composeEnhancers(
    applyMiddleware(retry, thunk, socketMiddleware(wsActions)) //
    // other store enhancers if any
  )
);

const root = createRoot(document.querySelector("#root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
