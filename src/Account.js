import App from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userData: null,
    };
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

  async componentDidMount() {
    await App.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
        this.fetchUserInfo();
      }
    });
  }

  render() {
    if (!this.state.userData) {
      return null;
    } else {
      return (
        <div>
          <h1>Welcome, {this.state.userData.username}!</h1>
        </div>
      );
    }
  }
}
