import App from "firebase/app";
import "firebase/auth";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import Form from "react-bootstrap/Form";
import React from "react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isForgotPassword: false,
      open: props.loginShowing ? true : false,
      password: "",
      validated: false,
    };
  }

  attemptLogin = () => {
    App.auth()
      .setPersistence(App.auth.Auth.Persistence.LOCAL)
      .catch(this.handleError);
    App.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.login)
      .catch(this.handleError);
  };

  checkFormValidation(event) {
    event.preventDefault();
    if (event.currentTarget.checkValidity() !== false) {
      this.setState({
        validated: true,
      });
    }
  }

  closeLogin = () => {
    this.setState({
      open: false,
    });
    this.props.loginShowing(false);
  };

  finishResetPassword = () => {
    alert("Password reset email sent!");
    this.toggleForgotPassword();
  }

  handleEmailInput = (email) => {
    this.setState({ email: email.target.value });
  };

  handleError = (error) => {
    alert(error.message);
  };

  handlePasswordInput = (password) => {
    this.setState({ password: password.target.value });
  };

  login = () => {
    alert("Successfully signed in!");
    this.closeLogin();
  };

  sendPasswordResetEmail = (email) => {
    App.auth()
      .sendPasswordResetEmail(email)
      .then(this.finishResetPassword)
      .catch(this.handleError);
  };

  submitForm = (event) => {
    this.checkFormValidation(event);
    if (this.state.isForgotPassword) {
      this.sendPasswordResetEmail(this.state.email);
    } else {
      this.attemptLogin();
    }
  }

  toggleForgotPassword = () => {
    this.setState({
      isForgotPassword: !this.state.isForgotPassword,
    });
  };

  render() {
    if (this.state.isForgotPassword) {
      return (
        <Dialog
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          contentStyle={{ height: "200px", width: "300px" }}
          modal={true}
          onClose={this.toggleForgotPassword}
          open={this.state.open}
        >
          <DialogTitle style={{ textAlign: "center" }}>
            Forgot Password
          </DialogTitle>
          <DialogContent>
            <Form
              onSubmit={this.submitForm}
              validated={this.state.validated}
            >
              <Form.Text>
                If you've forgotten your password, please enter your email
                below. If it exists in our system, you'll receive an email with
                instructions on how to reset your password shortly.
              </Form.Text>
              <br />
              <br />
              <Form.Label style={{ alignSelf: "center" }}>Email</Form.Label>
              <Form.Group controlId={"formEmail"}>
                <Form.Control
                  name={"formEmail"}
                  onInput={this.handleEmailInput}
                  placeholder={"Email"}
                  required
                  style={{ width: "200px" }}
                  type={"email"}
                  value={this.state.email}
                />
              </Form.Group>
              <br />
              <Button color={"primary"} onClick={this.toggleForgotPassword}>
                Cancel
              </Button>
              <Button color={"primary"} type={"Submit"}>
                Send Email
              </Button>
            </Form>
          </DialogContent>
        </Dialog>
      );
    } else {
      return (
        <Dialog
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          contentStyle={{ height: "200px", width: "300px" }}
          modal={true}
          onClose={this.closeLogin}
          open={this.state.open}
        >
          <DialogTitle style={{ textAlign: "center" }}>Log In</DialogTitle>
          <DialogContent>
            <Form
              onSubmit={this.submitForm}
              validated={this.state.validated}
            >
              <Form.Label>Email</Form.Label>
              <Form.Group controlId={"formEmail"}>
                <Form.Control
                  name={"formEmail"}
                  onInput={this.handleEmailInput}
                  placeholder={"Email"}
                  required
                  type={"email"}
                  value={this.state.email}
                />
              </Form.Group>
              <br />
              <Form.Label>Password</Form.Label>
              <Form.Group controlId={"formPassword"}>
                <Form.Control
                  name={"formPass"}
                  onInput={this.handlePasswordInput}
                  placeholder={"Password"}
                  required
                  type={"password"}
                  value={this.state.password}
                />
              </Form.Group>
              <Button
                color={"primary"}
                style={{ fontSize: 10, textAlign: "left" }}
                onClick={this.toggleForgotPassword}
              >
                Forgot Password?
              </Button>
              <br />
              <br />
              <Button color={"primary"} onClick={this.closeLogin}>
                Cancel
              </Button>
              <Button color={"primary"} type={"submit"}>
                Login
              </Button>
            </Form>
          </DialogContent>
        </Dialog>
      );
    }
  }
}
