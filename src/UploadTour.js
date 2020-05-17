import React from "react";
import AddTourForm from './AddTourForm'
import "firebase/firestore";

export default class UploadTour extends React.Component {
  
constructor(props) {
    super(props);
    this.state = {tourId: "",
                    userEmail: "",
                    location: "",
                    uploadDate: "",
                    videoUrl: "",
                    description: ""

  }
}

addTour = () => {
  const firebase = require("firebase");
    const db = firebase.firestore();
    const toursDb = db.collection("Tours");   
    toursDb
      .doc(this.state.email)
      .set({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
      })
      .then(this.closeSignUp)
      .catch(this.handleError);
  };





  render() {
   return( 
    <div className="container">
      <h1>Upload Tours Here</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Add Tour</h2>
          <AddTourForm  />
        </div>
        <div className="flex-large">
         
        </div>
      </div>
    </div>
  )

  
  }
}
