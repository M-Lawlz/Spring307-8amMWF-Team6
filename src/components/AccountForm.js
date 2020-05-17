import App from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Form } from "react-bootstrap";
import React from "react";

export default class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: props.formType ? props.formType : "",
      input: "",
      inputType: "",
      open: props.isFormShowing ? true : false,
      user: null,
    };
  }

  async componentDidMount() {
    await App.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
      }
    });
    switch (this.state.formType) {
      case "firstName":
        this.setState({ inputType: "text", printType: "First Name" });
        break;
      case "lastName":
        this.setState({ inputType: "text", printType: "Last Name" });
        break;
      case "email":
        this.setState({ inputType: "email", printType: "Email" });
        break;
      case "password":
        this.setState({ inputType: "password", printType: "Password" });
        break;
      default:
    }
  }

  attemptUpdate = () => {
    const userDoc = App.firestore()
      .collection("users")
      .doc(this.state.user.email);
    if (this.state.formType === "firstName") {
      userDoc
        .update({ firstName: this.state.input })
        .then(this.closeForm)
        .catch(this.handleError);
    } else if (this.state.formType === "lastName") {
      userDoc
        .update({ lastName: this.state.input })
        .then(this.closeForm)
        .catch(this.handleError);
    } else if (this.state.formType === "email") {
      this.state.user
        .updateEmail(this.state.input)
        .then(this.closeForm)
        .catch(this.handleError);
    } else if (this.state.formType === "password") {
      this.state.user
        .updatePassword(this.state.input)
        .then(this.closeForm)
        .catch(this.handleError);
    }
  };

  cancelForm = () => {
    this.setState({ open: false });
    this.props.isFormShowing(false);
  };

  closeForm = () => {
    this.setState({ open: false });
    this.props.isFormShowing(false);
    alert(`Your account information has been updated.`);
  };

  handleError = (error) => {
    alert("Error: " + error.message);
  };

  handleInput = (input) => {
    this.setState({ input: input.target.value });
  };

  submitForm = (event) => {
    event.preventDefault();
    this.attemptUpdate();
  };

  render() {
    if (this.state.open) {
      return (
        <Dialog
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          contentStyle={{ height: 200, width: 300 }}
          modal={true}
          open={this.state.open}
        >
          <DialogTitle style={{ textAlign: "center" }}>
            {`Change ${this.state.printType}`}
          </DialogTitle>
          <DialogContent>
            <Form onSubmit={this.submitForm}>
              <Form.Text>{"Please enter your new information."}</Form.Text>
              <br />
              <br />
              <Form.Group controlId={"formField"}>
                <Form.Control
                  name={"formField"}
                  onInput={this.handleInput}
                  placeholder={this.state.printType}
                  required
                  type={this.state.inputType}
                  value={this.state.input}
                />
              </Form.Group>
              <br />
              <Button color={"primary"} onClick={this.cancelForm}>
                Cancel
              </Button>
              <Button color={"primary"} type={"submit"}>
                {`Change ${this.state.printType}`}
              </Button>
            </Form>
          </DialogContent>
        </Dialog>
      );
    } else {
      return null;
    }
  }
}
