import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./Routers/AppRouter";
import registerServiceWorker from "./registerServiceWorker";
import "tachyons";
import "mdbreact/dist/css/mdb.css";

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById("root")
);
registerServiceWorker();
