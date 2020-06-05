import React from 'react';
import App from "firebase/app";

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
      currentTourValue: 0,
      user : null,
      userData : null
    }
  }

  async componentDidMount() {
    await App.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
        this.fetchUserInfo();
      }
    });
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
    }).catch((error) => {
      console.error("Error: " + error.message);
    });
  }

  fetchUserInfo = () => {
    const userDoc = App.firestore()
      .collection("users")
      .doc(this.state.user.email);
    userDoc
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({userData: doc.data()});
        }
      })
      .catch((error) => {
        console.error("Error: ", error.message);
      });
  };

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addTour = e => {
    e.preventDefault();
    const firebase = require("firebase");
    const db = firebase.firestore();
    var date = new Date();
    var timeRn =
            ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
            ("00" + date.getDate()).slice(-2) + "/" +
            date.getFullYear();
    db.collection("Tours").doc((this.state.currentTourValue + 1).toString()).set({
      location: this.state.location,
      description: this.state.description,
      videoUrl: this.state.videoUrl,
      uploadDate: timeRn,
      userEmail: this.state.userEmail,
      uploaderUsername: this.state.userData.username,
      comments: [],
      tourId: this.state.currentTourValue + 1,
      tourLikes: 0
    }).then((info) => {
      alert("Tour successfully uploaded!");
      /* allows for the tour to be shown immediately in the search bar */
      window.location.reload(true);
    }).catch(function(error) {
      console.log("Error with uploading to database! "  + error);
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
        
        <h3>Tour Name</h3>
        <label></label>
        <input type="text" 
        name="name" 
        placeholder="Name of Tour" 
        required
        onChange={this.updateInput}
        />
         <h3>Location</h3>
        <label></label>
        <input type="text" 
        name="location" 
        placeholder="Tour Location"
        required
        onChange={this.updateInput}
        value={this.state.location}/>
        <h3>Description</h3>
        <label></label>
        <input type="text" 
        name="description"
        placeholder="Tour Description" 
        required
        onChange={this.updateInput} 
        value={this.state.description}/>
         <h3>Embed Url</h3>
        <label></label>
        <input type="text" 
        name="videoUrl" 
        placeholder="Embed Link"
        required
        onChange={this.updateInput} 
        value={this.state.videoUrl}/>
        <h3>Email</h3> 
        <label></label>
        <input type="email" 
        name="userEmail" 
        placeholder="email"
        required
        onChange={this.updateInput} 
        value={this.state.userEmail}/>
        
        <button type="submit" disabled={!this.state.userData}>Add Tour</button>  
        </form>
      </section>

      )
  }}

export default AddTourForm
