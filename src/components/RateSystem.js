import React from "react";
import App from "firebase/app";

export default class RateSystem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userData : null,
            tourLikes : 0,
            currentTour : null
        }
    }

    updateLikes = (event) => {
        // console.log("Like button clicked");
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

    render() {
        return (
            <div>
                <button id="likeButton"
                onClick={this.updateLikes}
                disabled={this.state.user === null}
                >
                    <b>Likes</b> : {this.state.tourLikes} 
                </button>
            </div>
        )
    }
}