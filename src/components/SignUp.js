import App from "firebase/app";
import "firebase/auth";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Form } from "react-bootstrap";
import React from "react";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      open: props.signUpShowing ? true : false,
      password: "",
    };
    this.auth = App.auth();
  }

  attemptSignUp = () => {
    this.auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.closeSignUp)
      .catch(this.handleError);
  };

  handleEmailInput = (email) => {
    this.setState({ email: email.target.value });
  };

  handleError = (error) => {
    console.error("Failed to create account with error: ", error.message);
  };

  handlePasswordInput = (password) => {
    this.setState({ password: password.target.value });
  };

  closeSignUp = () => {
    this.setState({
      open: false,
    });
    this.props.signUpShowing(false);
  };

  submitSignUpForm = (event) => {
    event.preventDefault();
    this.attemptSignUp();
  };

  render() {
    return (
      //TODO: look into these properties later (not working)
      <Dialog
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        contentStyle={{ height: "200px", width: "300xp" }}
        modal={true}
        onClose={this.closeSignUp}
        open={this.state.open}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          Create An Account
        </DialogTitle>
        <DialogContent>
          <Form onSubmit={this.submitSignUpForm}>
            <Form.Row>
              <Form.Label>First Name</Form.Label>
              <Form.Group controlId={"formFirstname"}>
                <Form.Control
                  name={"formFirst"}
                  placeholder={"First Name"}
                  required
                  type={"text"}
                />
              </Form.Group>
              <br />
              <Form.Label>Last Name</Form.Label>
              <Form.Group controlId={"formLastname"}>
                <Form.Control
                  name={"formLast"}
                  placeholder={"Last Name"}
                  required
                  type={"text"}
                />
              </Form.Group>
              <br />
            </Form.Row>
            <Form.Label>Email</Form.Label>
            <Form.Group controlId={"enteredEmail"}>
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
            <Form.Label>Username</Form.Label>
            <Form.Group controlId={"formUsername"}>
              <Form.Control
                name={"formUser"}
                placeholder={"Username"}
                required
                type={"text"}
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
            <br />
            <Button color={"primary"} onClick={this.closeSignUp}>
              Cancel
            </Button>
            <Button color={"primary"} type={"submit"}>
              Sign Up!
            </Button>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
}
