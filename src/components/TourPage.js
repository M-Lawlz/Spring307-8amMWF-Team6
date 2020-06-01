import React from 'react';
import ReactPlayer from "react-player";
import CommentMod from './CommentMod';
import App from "firebase/app";




export default class TourPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tours : [],
            user: null,
            userData: null,
            userEmail: "",
            currentTour : [],
            tourId : this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1)
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
                tours: dbTourArray
            });
        }

        updateInput = e => {
            this.setState({
              [e.target.name]: e.target.value
          });
        }

        editTour = e => {
            e.preventDefault();
            const firebase = require("firebase");
            const db = firebase.firestore();
            db.settings({
              timestampsInSnapshots: true
          }); 
            const current = this.state.tours.find(x => {
                return x.tourId.toString() === this.state.tourId;
            });
            
            db.collection("Tours").doc((this.state.tourId).toString()).update({
              location: this.state.location,
              description: this.state.description,
              tourId: current.tourId,
              uploadDate: current.uploadDate,
              videoUrl: current.videoUrl,
              userEmail: current.userEmail,
              

        });

            this.setState({
                tourId: "",
                userEmail: "",
                location: "",
                uploadDate: "",
                videoUrl: "",
                description: "",
                comments:[]

            });
        };


    deleteTour = e => {
            e.preventDefault();
            const firebase = require("firebase");
            const db = firebase.firestore();
            db.settings({
              timestampsInSnapshots: true
          }); 
            db.collection("Tours").doc((this.state.tourId).toString()).delete();
        };


        componentWillReceiveProps() {
        /* reloads the page for new search queries, despite
        it being the same TourPage path */
        window.location.reload(true);
        this.setState({
            tourId : this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1)
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
              this.setState({ userData: doc.data() });
            }
          })
          .catch((error) => {
            console.error("Error: ", error.message);
          });
      };

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
                this.handleNewData(doc);
            });
        }).catch(function(error) {
            console.log("Error getting document: ", error);
        });
    }
    



    render() {
         const current = this.state.tours.find(x => {
            return x.tourId.toString() === this.state.tourId;
        });



        return (

            <div className="tourPage">
            <div>
            {
                (this.state.tourId !== undefined && current !== undefined) ?
                <div>
                <h1>{current.location}</h1>
                <hr></hr>
                <br/>
                <div className="centered">
                <ReactPlayer url={current.videoUrl}
                controls/>
                </div>

                <h2>{current.description}</h2>
                <p>Please log in to edit your tour</p>

               
                <form onSubmit={this.editTour}>
                <label>Edit Description</label>
                <input type="textarea" 
                name="description"
                placeholder="Tour Description" 
                required
                onChange={this.updateInput} 
                value={this.state.description}/>

                <label>Edit Location</label>
                <input type="text" 
                name="location" 
                placeholder="Tour Location"
                required
                onChange={this.updateInput}
                value={this.state.location}/>
                <button type="submit"disabled={this.state.user===null || current.userEmail !==this.state.user.email}>Edit Tour</button>  
                
                </form>       
               
                <form onSubmit={this.deleteTour}>         
                <button type="submit" disabled={this.state.user===null || current.userEmail !==this.state.user.email}>Delete Tour</button>
                </form>

                </div> 
                : null
            }
            </div>
            <div className="centered">
            <CommentMod tourId={this.state.tourId}/>
            </div>

            </div>
            )
    }
}