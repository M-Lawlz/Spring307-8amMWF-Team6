import AccountForm from "./components/AccountForm";
import App from "firebase/app";
import { Avatar, Button } from "@material-ui/core";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
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
        this.fetchProfilePicture();
      }
    });
  }

  emailClicked = (newVal) => {
    this.setState({ isChangingEmail: newVal });
  };

  async fetchProfilePicture() {
    const profilePictureRef = App.storage().ref(
      "/profilePictures/" + this.state.user.email + ".jpg"
    );
    await profilePictureRef
      .getDownloadURL()
      .then((profilePictureURL) =>
        this.setState({ profilePicture: { uri: profilePictureURL } })
      );
  }

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
            sidebar={
              <div style={{ position: "absolute" }}>
                <Button
                  onClick={this.setSidebarStatus}
                  style={styles.sidebarButton}
                >
                  Close Account Settings
                </Button>
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
            styles={{
              overlay: { zIndex: -1 },
              root: { height: "100%", top: 102, width: 250 },
              sidebar: { backgroundColor: "white", width: 250 },
            }}
          />
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
          <div
            class={"centered"}
            style={{ flexDirection: "column", marginTop: 20 }}
          >
            <Avatar
              src={
                this.state.profilePicture ? this.state.profilePicture.uri : null
              }
              style={{ height: 200, width: 200 }}
            />
            <h1>Hi there, {this.state.userData.firstName}.</h1>
            <h2>
              {this.state.userData.tours
                ? "Here are your tours."
                : "It looks like you haven't uploaded any tours yet."}
            </h2>
            <h3>
              {this.state.userData.tours
                ? null
                : "You can upload a tour using the navigation bar at the top."}
            </h3>
          </div>
          {this.state.sidebarOpen ? null : (
            <Button
              onClick={this.setSidebarStatus}
              style={{ position: "absolute", left: 10, top: 110, zIndex: 2 }}
            >
              Account Settings
            </Button>
          )}
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
