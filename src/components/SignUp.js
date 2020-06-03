import App from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Form } from "react-bootstrap";
import React from "react";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      open: props.signUpShowing ? true : false,
      password: "",
      username: "",
    };
    this.auth = App.auth();
  }

  addUserToDatabase = () => {
    const usersCollection = App.firestore().collection("users");
    usersCollection
      .doc(this.state.email)
      .set({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        toursLiked: []
      })
      .then(this.closeSignUp)
      .catch(this.handleError);
  };

  attemptSignUp = () => {
    this.auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.addUserToDatabase)
      .catch(this.handleError);
  };

  cancelSignUp = () => {
    this.setState({ open: false });
    this.props.signUpShowing(false);
  };

  closeSignUp = () => {
    this.setState({ open: false });
    this.props.signUpShowing(false);
    alert("Successfully made an account! Welcome to SimTrek.");
  };

  handleEmailInput = (email) => {
    this.setState({ email: email.target.value });
  };

  handleError = (error) => {
    alert("Error: " + error.message);
  };

  handleFirstNameInput = (firstName) => {
    this.setState({ firstName: firstName.target.value });
  };

  handleLastNameInput = (lastName) => {
    this.setState({ lastName: lastName.target.value });
  };

  handlePasswordInput = (password) => {
    this.setState({ password: password.target.value });
  };

  handleUsernameInput = (username) => {
    this.setState({ username: username.target.value });
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
                  onInput={this.handleFirstNameInput}
                  placeholder={"First Name"}
                  required
                  type={"text"}
                  value={this.state.firstName}
                />
              </Form.Group>
              <br />
              <Form.Label>Last Name</Form.Label>
              <Form.Group controlId={"formLastname"}>
                <Form.Control
                  name={"formLast"}
                  onInput={this.handleLastNameInput}
                  placeholder={"Last Name"}
                  required
                  type={"text"}
                  value={this.state.lastName}
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
                onInput={this.handleUsernameInput}
                placeholder={"Username"}
                required
                type={"text"}
                value={this.state.username}
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
            <Button color={"primary"} onClick={this.cancelSignUp}>
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
