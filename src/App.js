import "./App.css";
import About from "./About";
import Account from "./Account";
import { HashRouter, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./components/NavBar";
import React from "react";
import Tours from "./Tours";
import UploadTour from "./UploadTour";
import TourPage from "./components/TourPage";
import CommentMod from "./components/CommentMod";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <HashRouter>
          <div className="content">
            <Route component={Home} exact path="/" />
            <Route component={About} path="/About" />
            <Route component={Account} path="/Account" />
            <Route component={Tours} path="/Tours" />
            <Route component={UploadTour} path="/UploadTour" />
            <Route component={TourPage} path="/TourPage/:Id" />
            <div className="centered">
              <Route component={CommentMod} path="/TourPage/:Id" />
            </div>
          </div>
        </HashRouter>
        <footer></footer>
      </div>
    );
  }
}
