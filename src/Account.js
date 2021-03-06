import AccountForm from "./components/AccountForm";
import App from "firebase/app";
import { Avatar, Button, CardMedia } from "@material-ui/core";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { Link } from "react-router-dom";
import React from "react";
import ReactPlayer from "react-player";
import Sidebar from "react-sidebar";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverPhoto: null,
      isChangingCoverPhoto: false,
      isChangingEmail: false,
      isChangingFirstName: false,
      isChangingLastName: false,
      isChangingPassword: false,
      isChangingProfilePicture: false,
      profilePicture: null,
      sidebarOpen: false,
      user: null,
      userData: null,
      userTours: null,
    };
  }

  async componentDidMount() {
    await App.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
        this.fetchProfilePicture();
        this.fetchCoverPhoto();
        this.fetchUserTours();
      }
    });
  }

  coverPhotoClicked = (newVal) => {
    this.setState({ isChangingCoverPhoto: newVal });
  };

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

  async fetchCoverPhoto() {
    const coverPhotoRef = App.storage().ref(
      "/coverPhotos/" + this.state.user.email + "COVER.jpg"
    );
    await coverPhotoRef.getDownloadURL().then((coverPhotoURL) => {
      this.setState({ coverPhoto: { uri: coverPhotoURL } });
    });
  }

  async fetchUserInfo() {
    const userDoc = App.firestore()
      .collection("users")
      .doc(this.state.user.email);
    await userDoc
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ userData: doc.data() });
        }
      })
      .catch((error) => {
        console.error("Error: ", error.message);
      });
  }

  async fetchUserTours() {
    await this.fetchUserInfo();
    const fetchedTours = [];
    const toursRef = App.firestore().collection("Tours");
    await toursRef
      .where("userEmail", "==", this.state.user.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.error("Error: No matching documents.");
          return;
        }
        snapshot.forEach((document) => {
          fetchedTours.push(document.data());
        });
        this.setState({ userTours: fetchedTours });
      })
      .catch((error) => {
        console.error("Error: ", error.message);
      });
  }

  firstNameClicked = (newVal) => {
    this.setState({ isChangingFirstName: newVal });
  };

  lastNameClicked = (newVal) => {
    this.setState({ isChangingLastName: newVal });
  };

  passwordClicked = (newVal) => {
    this.setState({ isChangingPassword: newVal });
  };

  profilePictureClicked = (newVal) => {
    this.setState({ isChangingProfilePicture: newVal });
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
                <Button
                  onClick={this.profilePictureClicked}
                  style={styles.sidebarButton}
                >
                  Change Profile Picture
                </Button>
                <Button
                  onClick={this.coverPhotoClicked}
                  style={styles.sidebarButton}
                >
                  Change Cover Photo
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
          {this.state.isChangingProfilePicture ? (
            <AccountForm
              formType={"profilePicture"}
              isFormShowing={this.profilePictureClicked}
            />
          ) : null}
          {this.state.isChangingCoverPhoto ? (
            <AccountForm
              formType={"coverPhoto"}
              isFormShowing={this.coverPhotoClicked}
            />
          ) : null}
          <div
            className={"centered"}
            style={{ flexDirection: "column", marginTop: 20 }}
          >
            <Avatar
              src={
                this.state.profilePicture ? this.state.profilePicture.uri : null
              }
              style={{
                height: 200,
                position: "absolute",
                top: 170,
                width: 200,
              }}
            />
            <CardMedia
              image={this.state.coverPhoto ? this.state.coverPhoto.uri : null}
              style={{ height: 300, width: 800, borderRadius: 5 }}
            />
            <h1>Hi there, {this.state.userData.firstName}.</h1>
            <h2>
              {this.state.userTours
                ? "Here are the tours you've uploaded:"
                : "It looks like you haven't uploaded any tours yet."}
            </h2>
            {this.state.userTours ? (
              this.state.userTours.map((tour) => (
                <article class="media content-section">
                  <div class="media-body">
                    <h3 class="media-heading">
                      <Link to={"TourPage/" + tour.tourId}>
                        {tour.location}
                      </Link>
                    </h3>

                    <p>{tour.description}</p>
                    <p>{tour.uploadDate.toString()}</p>
                    <div class="centered">
                      <ReactPlayer url={tour.videoUrl} controls />
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <h3>
                You can upload a tour using the navigation bar at the top.
              </h3>
            )}
          </div>
          {this.state.sidebarOpen ? null : (
            <Button
              onClick={this.setSidebarStatus}
              style={{ backgroundColor: "#FFF", borderRadius: 5, position: "absolute", left: 10, top: 110, zIndex: 2 }}
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
