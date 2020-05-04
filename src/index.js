import "./index.css";
import App from "./App";
import Firebase, { FirebaseContext } from "./components/Firebase";
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import About from './About'
import Tours from './Tours'



ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseContext.Provider>, document.getElementById("root")



);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
