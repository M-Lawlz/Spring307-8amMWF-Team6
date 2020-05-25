import React from 'react';
import ReactPlayer from "react-player";

export default class TourPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tours : [],
            currentTour : [],
            tourId : this.props.location.pathname.slice(-1)
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

    componentWillReceiveProps() {
        /* reloads the page for new search queries, despite
        it being the same TourPage path */
        window.location.reload(true);
        this.setState({
            tourId : this.props.location.pathname.slice(-1)
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
        const current = this.state.tours.find(x => {
            /* NOTE: warning about double equals, but DO NOT change it
            since this is the only way it works */
            return x.tourId == this.state.tourId
        });
        return (
            <div className="tourPage">
                {
                (this.state.tourId !== undefined && current !== undefined) ?
                    <div>
                        <h1>{current.location}</h1>
                        
                        <div className="centered">
                            <ReactPlayer url={current.videoUrl} controls/>
                        </div>
                        
                        




                    </div> 
                    : null
                }
            </div>
        )
    }
}