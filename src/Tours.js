import React from "react";
import "./App.css";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

export default class Tours extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tours: [],
      tourId: "",
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
    };
    dbTourArray.push(newDbTour);
    this.setState({
      tours: dbTourArray,
    });
  };

  componentDidMount() {
    const firebase = require("firebase");
    const db = firebase.firestore();
    const toursDb = db.collection("Tours");

    toursDb.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.handleNewData(doc);
      });
    });
  }

  render() {
    return (
      <div>
        <h1> View Tours </h1>

        <p>
         
          {this.state.tours.map((tour) => (
             <div id="theDiv">
            <article class="media content-section">
              <div class="media-body">
                <h3 class="media-heading">
                  <Link to={"TourPage/" + tour.tourId}>{tour.location}</Link>
                </h3>

                <p>{tour.description}</p>
                <p>{tour.uploadDate.toString()}</p>
                <div class="centered">
                  <ReactPlayer url={tour.videoUrl} controls />
                </div>
              </div>
            </article>
              </div>

          ))}
        
        </p>


      </div>
    );
  }
}
