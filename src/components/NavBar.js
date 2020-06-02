import App from "firebase/app";
import "firebase/auth";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Login from "./Login.js";
import { HashRouter, Link } from "react-router-dom";
import React from "react";
import SignUp from "./SignUp.js";
import NavSearch from "./NavSearch.js";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoginShowing: false,
      isSignUpShowing: false,
      user: null,
    };
  }

  attemptLogout = () => {
    App.auth().signOut().then(this.logout).catch(this.handleError);
    /* added this refresh to prevent commenting
    immediately after they log out */
    window.location.reload(true);
  };

  componentDidMount() {
    App.auth().onAuthStateChanged((user) => {
      this.setState({ isLoading: false, user: user });
    });
  }

  handleError = (error) => {
    alert(error.message);
  };

  loginClicked = (newVal) => {
    this.setState({
      isLoginShowing: newVal,
    });
  };

  logout = () => {
    alert("You have been logged out of SimTrek.");
    this.setState({
      user: null,
    });
  };

  signUpClicked = (newVal) => {
    this.setState({
      isSignUpShowing: newVal,
    });
  };

  render() {
    if (this.state.isLoading) {
      return null;
    } else {
      return (
        <div>
          <AppBar position="static" style={{ background: "#00CED1" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
              ></IconButton>
              <Typography variant="h6">
                <div>
                  <h2>SimTrek</h2>
                </div>
              </Typography>
              <HashRouter>
                <Link style={{ color: "inherit" }} to={"/About"}>
                  <Button
                    color={"inherit"}
                    style={{ marginLeft: 50, width: 150 }}
                  >
                    <h3>About Us</h3>
                  </Button>
                </Link>
                <Link style={{ color: "inherit" }} to={"/Tours"}>
                  <Button color={"inherit"} style={{ marginLeft: 25 }}>
                    <h3>Tours</h3>
                  </Button>
                </Link>

                <Link style={{ color: "inherit" }} to={"/UploadTour"}>
                  <Button
                    color={"inherit"}
                    style={{ marginLeft: 35, width: 100 }}
                  >
                    <h3>Upload a Tour</h3>
                  </Button>
                </Link>

                <div className="tab">
                  <NavSearch />
                </div>
              </HashRouter>
              <Grid
                container
                alignItems="center"
                justify="flex-end"
                direction="row"
              >
                {this.state.user ? null : (
                  <Button
                    color="inherit"
                    variant="outlined"
                    type="submit"
                    onClick={this.loginClicked}
                  >
                    <em>Log In</em>
                  </Button>
                )}
                &nbsp;
                {this.state.isLoginShowing ? (
                  <Login loginShowing={this.loginClicked} />
                ) : null}
                {this.state.user ? (
                  <HashRouter>
                    <Link
                      style={{ color: "inherit", marginRight: 20 }}
                      to={"/Account"}
                    >
                      <Button color={"inherit"} variant={"outlined"}>
                        <em>Account</em>
                      </Button>
                    </Link>
                  </HashRouter>
                ) : null}
                {this.state.user ? (
                  <Button
                    color="inherit"
                    variant="outlined"
                    type="submit"
                    onClick={this.attemptLogout}
                  >
                    <em>Log Out</em>
                  </Button>
                ) : (
                  <Button
                    color="inherit"
                    variant="outlined"
                    type="submit"
                    onClick={this.signUpClicked}
                  >
                    <em>Sign Up</em>
                  </Button>
                )}
                {this.state.isSignUpShowing ? (
                  <SignUp signUpShowing={this.signUpClicked} />
                ) : null}
              </Grid>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }
}
