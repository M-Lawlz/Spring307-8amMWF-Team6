import React, { useState } from 'react'
import App from "firebase/app";
import "firebase/auth";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import Form from "react-bootstrap/Form";
import newId from './newid';



class AddTourForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    tourId: "",
    userEmail: "",
    location: "",
    uploadDate: "",
    videoUrl: "",
    description: ""

  }
}
componentWillMount() {
        this.id = newId();
    }

updateInput = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
}

addUser = e => {
  e.preventDefault();
  const firebase = require("firebase");
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  const userRef = db.collection("Tours").add({
    location: this.state.location,
    description: this.state.description,
    videoUrl: this.state.videoUrl,
    uploadDate: this.state.uploadDate

  });  



  this.setState({
    tourId: "",
    userEmail: "",
    location: "",
    uploadDate: "",
    videoUrl: "",
    description: ""
  });
};

  render(){
return (
  <form onSubmit={this.addUser}>
  <label>Tour Name</label>
  <input type="text" 
  name="name" 
  placeholder="Name of Tour" 
  onChange={this.updateInput}
  />
  <label>Location</label>
  <input type="text" 
  name="location" 
  placeholder="Tour Location"
  onChange={this.updateInput}
  value={this.state.location}/>
  <label>Description</label>
  <input type="text" 
  name="description"
  placeholder="Tour Description" 
  onChange={this.updateInput} 
  value={this.state.description}/>
  <label>Embed Url</label>
  <input type="text" 
  name="videoUrl" 
  placeholder="Embed Link"
  onChange={this.updateInput} 
  value={this.state.videoUrl}/>
  <label>Upload Date</label>
  <input type="text" 
  name="uploadDate" 
  placeholder="Current Date"
  onChange={this.updateInput} 
  value={this.state.uploadDate}/>
  <button type="submit">Add Tour</button>  
  </form>
  )


}}

export default AddTourForm