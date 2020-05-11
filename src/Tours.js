import React from "react";
import "./App.css"
import TourSample from './TourSample'
import "firebase/firestore";


export default class Tours extends React.Component {
 constructor(props) {
       super(props);
       this.state = {
           tours : [],
           isSearching : false,
           selectDropdowns : [],
           searchVal : "",
           retrieveTourPage : false,
           currentTour : []
       }
   }
  
 
   componentDidMount() {
       const firebase = require("firebase");
       const db = firebase.firestore();
       const toursDb = db.collection("Tours").get();
 		var dbTourArray = this.state.tours;
       
   }


render() {
   return (<div className="container">
      <h1>View Tours</h1>
      <div className="flex-row">
        <div className="flex-large">
          <dbTourArray />
        </div>
      </div>
    </div>) 
  }

  	}
  

  

