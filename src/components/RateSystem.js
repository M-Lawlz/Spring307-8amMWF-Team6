import React from "react";
import App from "firebase/app";

export default class RateSystem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userData : null,
            tourLikes : 0,
            currentTour : null,
            tourId: props.passedTourId,
            tours: [],
            currentUserLiked : false
        }
    }

    async componentDidMount() {
        await App.auth().onAuthStateChanged((user) => {
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
          if (user) {
            this.setState({ user: user });
            this.fetchUserInfo();
          }
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
          tourLikes: tour.data().tourLikes
        };
        dbTourArray.push(newDbTour);

        /* identify the current tour */
        if(newDbTour.tourId.toString() === this.state.tourId.toString()) {
          this.setCurrentTourInfo(newDbTour.tourLikes, newDbTour);
        }
        this.loadupTours(dbTourArray);
    };

    /* set info for current tour */
    setCurrentTourInfo = (likes, tour) => {
      this.setState({
        tourLikes : likes,
        currentTour : tour
      });
    }

    loadupTours = (dbtourarray) => {
      this.setState({
        tours: dbtourarray
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
              // this will either have the location name or return as an undefined
              const searchIfLiked = this.state.userData.toursLiked.find(tur => {
                return (this.state.currentTour.location === tur) ? true : false;
              });
              this.setState({
                currentUserLiked : (searchIfLiked === undefined) ? false : true
              });
            }
          })
          .catch((error) => {
            console.error("Error: ", error.message);
          });
      };

    updateLikes = (event) => {
      const firebase = require("firebase");
      const db = firebase.firestore();
      const usersDb = db.collection("users").doc(this.state.user.email);
      const currentTourDb = db.collection("Tours").doc(this.state.tourId.toString());
      /* if the user does not have the tour liked */
      if(this.state.currentUserLiked === false) {
        /* add this location to their array of liked locations */
        usersDb.update({
          toursLiked: firebase.firestore.FieldValue
            .arrayUnion(this.state.currentTour.location)
        });
        /* increment the number of tour likes in the DB */
        currentTourDb.update({
          tourLikes: this.state.tourLikes + 1
        });
        /* update the component to reference the updated num of tour likes */
        this.setState({
          tourLikes: this.state.tourLikes + 1,
          currentUserLiked : true
        });
        alert("You LIKED the tour!");
      }
      /* user has the tour liked and wants to unlike */
      else {
        /* create a new array w/ the currently liked tour filtered out */
        const updatedUserLikedTours = this.state.userData.toursLiked.filter(
          (tur) => tur !== this.state.currentTour.location
        );
        /* remove this location from their array of liked locations */
        usersDb.update({
          toursLiked : updatedUserLikedTours
        });
        /* decrement the number of tours liked in the DB */
        currentTourDb.update({
          tourLikes: this.state.tourLikes - 1
        });
        /* update the component to reference the updated num of tour likes */
        this.setState({
          tourLikes: this.state.tourLikes - 1,
          currentUserLiked : false
        });
        alert("You UNLIKED the tour!");
      }
    }

    render() {
        return (
            <div>
                <button id="likeButton"
                onClick={this.updateLikes}
                disabled={!this.state.user}
                >
                    {(this.state.currentUserLiked) ?
                      <div>
                        <b>Unlike! </b> : {this.state.tourLikes}
                      </div> :
                      <div>
                        <b>Like!</b> : {this.state.tourLikes} 
                      </div>
                    }
                </button>
            </div>
        )
    }
}