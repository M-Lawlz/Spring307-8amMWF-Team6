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

  handleEmailInput = (email) => {
    this.setState({ email: email.target.value });
  };

  handleError = (error) => {
    alert(error.message);
  };

  closeLogin = () => {
    this.setState({
      open: false,
    });
    this.props.loginShowing(false);
  };

  handlePasswordInput = (password) => {
    this.setState({ password: password.target.value });
  };

  login = () => {
    alert("Successfully signed in!");
    this.closeLogin();
  };

  submitLoginForm = (event) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity() !== false) {
      this.setState({
        validated: true,
      });
    }
    this.attemptLogin();
  };

  render() {
    return (
      <Dialog
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        contentStyle={{ height: "200px", width: "300px" }}
        modal={true}
        onClose={this.closeLogin}
        open={this.state.open}
      >
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
          <Form
            onSubmit={this.submitLoginForm}
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
