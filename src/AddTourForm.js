import React from 'react'

class AddTourForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tourId: "",
      userEmail: "",
      location: "",
      uploadDate: "",
      videoUrl: "",
      description: "",
      username:"",
      comments:[],
      currentTourValue: 0
    }
  }


  componentDidMount() {
    const firebase = require("firebase");
    const db = firebase.firestore();
    const toursDb = db.collection("Tours");
    
    toursDb.get().then(snapshot => {
        snapshot.forEach(doc => {
            if(doc.data().tourId > this.state.currentTourValue) {
                this.setState({
                    currentTourValue : doc.data().tourId
                });
            }
        });
    });
  }


  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addTour = e => {
    e.preventDefault();
    const firebase = require("firebase");
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    }); 
    db.collection("Tours").doc((this.state.currentTourValue + 1).toString()).set({
      location: this.state.location,
      description: this.state.description,
      videoUrl: this.state.videoUrl,
      uploadDate: this.state.uploadDate,
      userEmail: this.state.userEmail,
      comments:[],
      tourId: this.state.currentTourValue + 1
    });

    this.setState({
      tourId: "",
      userEmail: "",
      location: "",
      uploadDate: "",
      videoUrl: "",
      description: "",
      comments:[],
      currentTourValue : this.state.currentTourValue + 1
    });
  };

  render(){
    return (
      
      <section>
      <form onSubmit={this.addTour}>
      

     
      <label>Tour Name</label>
      <input type="text" 
      name="name" 
      placeholder="Name of Tour" 
      required
      onChange={this.updateInput}
      />
      <label>Location</label>
      <input type="text" 
      name="location" 
      placeholder="Tour Location"
      required
      onChange={this.updateInput}
      value={this.state.location}/>
      
      <label>Description</label>
      <input type="text" 
      name="description"
      placeholder="Tour Description" 
      required
      onChange={this.updateInput} 
      value={this.state.description}/>
      
      <label>Embed Url</label>
      <input type="text" 
      name="videoUrl" 
      placeholder="Embed Link"
      required
      onChange={this.updateInput} 
      value={this.state.videoUrl}/>
      
      <label>Upload Date</label>
      <input type="date" 
      name="uploadDate" 
      placeholder="Current Date"
      required
      onChange={this.updateInput} 
      value={this.state.uploadDate}/>

      <label>Email</label>
      <input type="text" 
      name="userEmail" 
      placeholder="email"
      required
      onChange={this.updateInput} 
      value={this.state.userEmail}/>

      
   
      <button type="submit">Add Tour</button>  
      </form>
      
      </section>

      )


  }}

export default AddTourForm
