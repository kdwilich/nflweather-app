import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Counters from "./components/counters";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<Counters />, document.getElementById("root"));
serviceWorker.unregister();
