import React,{useState}  from "react";
import "./App.css"
import TourSample from './TourSample'
import "firebase/firestore";


export default class Tours extends React.Component {
 	constructor(props) {
       super(props);


   this.state = {
           tours : [{}],
           isSearching : false,
           selectDropdowns : [],
           searchVal : "",
           retrieveTourPage : false,
           currentTour : []
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
      console.log(this.state.tours)
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
	const t = this.state.tours[0]
	const a = t.TourId
	console.log(t)
	console.log(a)
	const tours = this.state.tours
   return (<div className="container">
      <h1>View Tours</h1>
      	
    </div>) 
  }

  	}
  

  

