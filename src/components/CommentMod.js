import React from "react";
import TextField from "@material-ui/core/TextField";
import App from "firebase/app";

export default class CommentMod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: "",
      user: null,
      userData: null,
      tourId: this.props.location.pathname.substring(
        this.props.location.pathname.lastIndexOf("/") + 1
      ),
      currentTourComments: null,
    };
  }

  async componentDidMount() {
    await App.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
        this.fetchUserInfo();
      }
    });
    const firebase = require("firebase");
    const db = firebase.firestore();
    const toursDb = db.collection("Tours");

    toursDb
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().tourId.toString() === this.state.tourId) {
            this.setState({
              currentTourComments: doc.data().comments,
            });
          }
        });
      })
      .catch(function (error) {
        console.log("Error getting document: ", error);
      });
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

  handleSubmit = (event) => {
    const firebase = require("firebase");
    const db = firebase.firestore();
    const currentTour = db
      .collection("Tours")
      .doc(this.state.tourId.toString());

    var date = new Date();
    var timeRn =
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      ("00" + date.getDate()).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    /* TODO: Figure out timestamp printing issue, keeps thinking its 1972 */
    const newItem = {
      comment: this.state.newComment,
      userName: this.state.userData.username,
      commentDate: timeRn,
    };
    currentTour.update({
      comments: firebase.firestore.FieldValue.arrayUnion(newItem),
    });
    var updatedComments = this.state.currentTourComments;
    updatedComments.push(newItem);
    this.setState({
      currentTourComments: updatedComments,
      newComment: "",
    });
    event.preventDefault();
  };

  updateComment = (event) => {
    this.setState({
      newComment: event.target.value,
    });
  };

  deleteComment = (commentToDelete) => {
    const firebase = require("firebase");
    const db = firebase.firestore();
    if (
      window.confirm(
        "Are  you sure you want to delete comment: " + commentToDelete
      )
    ) {
      const updatedComs = this.state.currentTourComments.filter(
        doc => doc.userName !== this.state.userData.username
              || doc.comment !== commentToDelete
      );
      var docRef = db.collection("Tours").doc(this.state.tourId.toString());
      docRef.update({
        comments: updatedComs,
      });
      console.log(updatedComs);
      this.updateLocalTourComments(updatedComs);
    }
  };

  updateLocalTourComments = (updatedComs) => {
    this.setState({
      currentTourComments: updatedComs
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Comments!</h1>
        <hr></hr>
        <br />
        <div className="commentBox">
          <h2>Join the Discussion!</h2>
          <form className="commentForm" onSubmit={this.handleSubmit}>
            <TextField
              className="commentText"
              type="text"
              rows="2"
              onChange={this.updateComment}
              value={this.state.newComment}
              placeholder="Drop a comment!"
              disabled={this.state.user === null}
              required
            ></TextField>
            {this.state.user === null ? (
              <button type="submit" disabled>
                Login to Comment!
              </button>
            ) : (
              <button type="submit">Post Comment!</button>
            )}
          </form>
          <div>
            {this.state.currentTourComments !== null &&
            this.state.currentTourComments !== undefined ? (
              <div>
                {this.state.currentTourComments.map((com) => {
                  return (
                    <div>
                      <hr></hr>
                      <span>
                        <div className="commentSection">
                          <b>{com.userName + ": "}</b>
                          {com.comment + " "}
                          {this.state.userData != null &&
                          com.userName === this.state.userData.username ? (
                            <button
                              style={{ float: "right", color: "red" }}
                              onClick={() => this.deleteComment(com.comment)}
                            >
                              X
                            </button>
                          ) : null}
                          <br />
                          <div className="commentDate">
                            {com.commentDate.toString()}
                          </div>
                        </div>
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
