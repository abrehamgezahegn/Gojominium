import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./Routers/AppRouter";
import registerServiceWorker from "./registerServiceWorker";
import "tachyons";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

ReactDOM.render(<AppRouter />, document.getElementById("root"));
registerServiceWorker();
