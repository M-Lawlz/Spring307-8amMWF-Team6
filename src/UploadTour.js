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
