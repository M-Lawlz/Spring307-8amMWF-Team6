import React from "react";
import ReactPlayer from "react-player";
import CommentMod from "./CommentMod";
import App from "firebase/app";

export default class TourPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: [],
      user: null,
      userData: null,
      userEmail: "",
      tourId: this.props.location.pathname.substring(
        this.props.location.pathname.lastIndexOf("/") + 1
      ),
      editedDesc: ""
    };
  }

  handleNewData = (tour) => {
    var dbTourArray = this.state.tours;
    var newDbTour = {
      tourId: tour.data().tourId,
      userEmail: tour.data().userEmail,
      location: tour.data().location,
      uploadDate: tour.data().uploadDate,
      videoUrl: tour.data().videoUrl,
      description: tour.data().description,
      uploaderUsername: tour.data().uploaderUsername,
    };
    dbTourArray.push(newDbTour);
    this.setState({
      tours: dbTourArray,
    });
  };

  updateInput = (e) => {
    this.setState({
      editedDesc: e.target.value,
    });
  };

  editTour = (e) => {
    e.preventDefault();
    const firebase = require("firebase");
    const db = firebase.firestore();
    db.settings({
        timestampsInSnapshots: true,
    });
    const current = this.state.tours.find((x) => {
      return x.tourId.toString() === this.state.tourId;
    });
    db.collection("Tours").doc(this.state.tourId.toString()).update({
      location: current.location,
      description: this.state.editedDesc,
      tourId: current.tourId,
      uploadDate: current.uploadDate,
      videoUrl: current.videoUrl,
      userEmail: current.userEmail,
    }).then((info) => {
        alert("Description successfully updated!");
    }).catch(function(error) {
        console.log("Error with updating database! "  + error);
    });
    this.setState({
        editedDesc: ""
    });
  };

  componentWillReceiveProps() {
    /* reloads the page for new search queries, despite
        it being the same TourPage path */
    window.location.reload(true);
    this.setState({
      tourId: this.props.location.pathname.substring(
        this.props.location.pathname.lastIndexOf("/") + 1
      ),
    });
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
          this.handleNewData(doc);
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

  deleteTour = (e) => {
    // e.preventDefault();
    const firebase = require("firebase");
    const db = firebase.firestore();
    if(window.confirm("Are you sure you want to delete this tour?")) {
        db.collection("Tours").doc(this.state.tourId.toString())
        .delete().then((info) => {
            alert("Tour was successfully deleted!");
            window.location.reload(true);
        }).catch(function(error) {
            console.log("Error with deleting tour! "  + error);
        });
    }
  };

  render() {
    const current = this.state.tours.find((x) => {
      return x.tourId.toString() === this.state.tourId;
    });
    return (
      <div className="tourPage">
        <div>
          {this.state.tourId !== undefined && current !== undefined ? (
            <div>
              <h1>{current.location}</h1>
              <hr></hr>
              <br />
              <div className="centered">
                <div class="column"></div>
                <div class="column">
                  <ReactPlayer url={current.videoUrl} controls />
                </div>
                <div class="column" id="descBox">
                  <span>
                    <b>Uploaded By:</b> {current.uploaderUsername}
                  </span>
                  <hr></hr>
                  <br />
                  <span>
                    <b>Location:</b> {current.location}
                  </span>
                  <hr></hr>
                  <br />
                  <span>
                    <b>Description:</b> {current.description}
                  </span>
                  <hr></hr>
                  <br />
                  <span>
                    <b>Upload Date:</b> {current.uploadDate}
                  </span>
                </div>
                <div class="column"></div>
              </div>
              <br/>
              {
              (this.state.userData !== null &&
                  current.uploaderUsername === this.state.userData.username) ?
                <div className="centered" id="editBox">
                    <div class="row">
                        <h2>Edit your tour information!</h2>
                    </div>
                    <form onSubmit={this.editTour}>
                        <label>Edit Description</label>
                        <input
                        type="textarea"
                        name="description"
                        placeholder="Tour Description"
                        onChange={this.updateInput}
                        value={this.state.editedDesc}
                        />
                        <br/>
                        <button
                        type="submit"
                        disabled={
                            this.state.editedDesc.length === 0 ||
                            this.state.user === null ||
                            current.userEmail !== this.state.user.email
                        }
                        >
                        Edit Tour
                        </button>
                    </form>
                    <form onSubmit={this.deleteTour}>
                        <button
                        type="submit"
                        disabled={
                            this.state.user === null
                        }
                        >
                        Delete Tour
                        </button>
                    </form>
                </div> : null
              }
            </div>
          ) : null}
        </div>
        <div className="centered">
          <CommentMod tourId={this.state.tourId} />
        </div>
      </div>
    );
  }
}
