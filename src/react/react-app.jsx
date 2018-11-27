import React from "react";
import ReactDOM from "react-dom";
import store from "store";
import BunqJSClient from "@bunq-community/bunq-js-client";
import BunqDesktopClient from "./BunqDesktopClient";

// bunqDesktop entry point
import App from "./App";

// Css styling and libraries
import "../scss/main.scss";
import "animate.css";
import "typeface-roboto";

import Logger from "./Helpers/Logger";
import Analytics from "./Helpers/Analytics";

Analytics();

// create a new bunq js client and inject into the app
const BunqJSClientInstance = new BunqJSClient(store, Logger);
BunqJSClientInstance.setKeepAlive(false);

// global bunqdesktop client object
window.BunqDesktopClient = new BunqDesktopClient();

ReactDOM.render(<App BunqJSClient={BunqJSClientInstance} />, document.getElementById("app"));
