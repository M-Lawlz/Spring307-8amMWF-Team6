import React from "react";
import TourSample from './TourSample'
import AddTourForm from './AddTourForm'
export default class UploadTour extends React.Component {
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
