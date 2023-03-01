import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./main.scss";
import store from "./store/index.js";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
