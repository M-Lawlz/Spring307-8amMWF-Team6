import AccountForm from "./components/AccountForm";
import App from "firebase/app";
import { Button } from "@material-ui/core";
import "firebase/auth";
import "firebase/firestore";
import React from "react";
import Sidebar from "react-sidebar";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChangingEmail: false,
      isChangingFirstName: false,
      isChangingLastName: false,
      isChangingPassword: false,
      sidebarOpen: false,
      user: null,
      userData: null,
    };
  }

  async componentDidMount() {
    await App.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
        this.fetchUserInfo();
      }
    });
  }

  emailClicked = (newVal) => {
    this.setState({ isChangingEmail: newVal });
  };

  fetchUserInfo = () => {
    const userDoc = App.firestore()
      .collection("users")
      .doc(this.state.user.email);
    userDoc
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ userData: doc.data() });
        }
      })
      .catch((error) => {
        console.error("Error: ", error.message);
      });
  };

  firstNameClicked = (newVal) => {
    this.setState({ isChangingFirstName: newVal });
  };

  lastNameClicked = (newVal) => {
    this.setState({ isChangingLastName: newVal });
  };

  passwordClicked = (newVal) => {
    this.setState({ isChangingPassword: newVal });
  };

  setSidebarStatus = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  render() {
    if (!this.state.userData) {
      return null;
    } else {
      return (
        <div>
          <Sidebar
            onSetOpen={this.setSidebarStatus}
            open={this.state.sidebarOpen}
            shadow={false}
            sidebar={
              <div style={{ position: "absolute", top: 140 }}>
                <Button
                  onClick={this.firstNameClicked}
                  style={styles.sidebarButton}
                >
                  Change First Name
                </Button>
                <Button
                  onClick={this.lastNameClicked}
                  style={styles.sidebarButton}
                >
                  Change Last Name
                </Button>
                <Button
                  onClick={this.emailClicked}
                  style={styles.sidebarButton}
                >
                  Change Email
                </Button>
                <Button
                  onClick={this.passwordClicked}
                  style={styles.sidebarButton}
                >
                  Change Password
                </Button>
              </div>
            }
            styles={{ sidebar: { backgroundColor: "white", width: 250 } }}
          ></Sidebar>
          {this.state.isChangingFirstName ? (
            <AccountForm
              formType={"firstName"}
              isFormShowing={this.firstNameClicked}
            />
          ) : null}
          {this.state.isChangingLastName ? (
            <AccountForm
              formType={"lastName"}
              isFormShowing={this.lastNameClicked}
            />
          ) : null}
          {this.state.isChangingEmail ? (
            <AccountForm formType={"email"} isFormShowing={this.emailClicked} />
          ) : null}
          {this.state.isChangingPassword ? (
            <AccountForm
              formType={"password"}
              isFormShowing={this.passwordClicked}
            />
          ) : null}
          <h1>Welcome, {this.state.userData.firstName}.</h1>
          <h3>Use the sidebar to change things about your account.</h3>
          <Button
            onClick={this.setSidebarStatus}
            style={{ position: "absolute", left: 10, top: 110, zIndex: 2 }}
          >
            {this.state.sidebarOpen
              ? "Close Account Settings"
              : "Account Settings"}
          </Button>
        </div>
      );
    }
  }
}

const styles = {
  sidebarButton: {
    color: "black",
    marginTop: 20,
  },
};
