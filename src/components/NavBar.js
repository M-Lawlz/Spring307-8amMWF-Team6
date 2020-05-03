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
import React from "react";
import SignUp from "./SignUp.js";

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
                <h2>SimTrek</h2>
              </Typography>
              <Grid
                container
                alignItems="flex-start"
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
