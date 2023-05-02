import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/app/app";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/index";

const root = createRoot(document.querySelector("#root") as Element);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
