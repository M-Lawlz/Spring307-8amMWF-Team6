import React, { useState } from "react";
import "./App.css";
import TourSample from "./TourSample";
import "firebase/firestore";
import ReactPlayer from "react-player";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import TourPage from "./components/TourPage";


export default class Tours extends React.Component {
  constructor(props) {

   super(props);


   this.state = {
     tours : [],
     tourId: ""
   }
 }

 handleNewData = (tour) => {
   var dbTourArray = this.state.tours;
   console.log("the tour links: " + tour.data().videoUrl);
   var newDbTour = {tourId: tour.data().tourId,
     userEmail: tour.data().userEmail,
     location: tour.data().location,
     uploadDate: tour.data().uploadDate,
     videoUrl: tour.data().videoUrl,
     description: tour.data().description};
     dbTourArray.push(newDbTour);
     this.setState({

       tours : dbTourArray
       
     });
   }

   componentDidMount() {

     const firebase = require("firebase");
     const db = firebase.firestore();
     const toursDb = db.collection("Tours");

     toursDb.get().then(snapshot => {
       snapshot.forEach(doc => {
         this.handleNewData(doc);
       });
     });
   }
   



   render() {

     return (

      <div>
      <h1> View Tours </h1>

      <p>{this.state.tours.map(tour => 

         <article class="media content-section">
      
        <div class="media-body">

       <h3 class="media-heading">
       <Link to={'TourPage/'+tour.tourId}>{tour.location}</Link>    
       </h3>

       <p>{tour.description}</p>
       <p>{tour.uploadDate.toString()}</p>
       <div class="centered">
       <ReactPlayer url={tour.videoUrl} controls/>
       </div>
       
       </div>
</article>
       )
     }</p>

     </div>
     


     ) 
   }

 }





