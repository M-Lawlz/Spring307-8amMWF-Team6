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
       <div class="media">


       <h3 class="media-heading">
       {tour.location}
       </h3>

      
   
    <Link to="/TourPage">Tour Page</Link>
       

       <p>{tour.description}</p>
       <p>{tour.uploadDate.toString()}</p>
       <div class="centered">
       <ReactPlayer url={tour.videoUrl} controls/>
       </div>
       
       </div>)
     }</p>

     </div>
     


     ) 
   }

 }





