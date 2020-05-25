import React from 'react';
import TextField from '@material-ui/core/TextField';
import App from "firebase/app";

export default class CommentMod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newComment : "",
            user: null,
            userData: null,
            tourId : this.props.tourId,
            currentTourComments : null
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
                if(doc.data().tourId == this.state.tourId) {
                    this.setState({
                        currentTourComments : doc.data().comments
                    });
                }
            });
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

    handleSubmit = (event) => {
        const firebase = require("firebase");
        const db = firebase.firestore();
        const currentTour = db.collection("Tours").doc(this.state.tourId.toString());
        const timeRn = firebase.firestore.Timestamp.now().toDate();

        /* TODO: Figure out timestamp printing issue, keeps thinking its 1972 */
        const newItem = {comment : this.state.newComment,
            userName : this.state.userData.username,
            commentDate : timeRn}
        currentTour.update({
            comments : firebase.firestore.FieldValue.arrayUnion(newItem)
        });
        var updatedComments = this.state.currentTourComments;
        updatedComments.push(newItem);
        this.setState({
            currentTourComments : updatedComments,
            newComment: ""
        });
        event.preventDefault();
    }

    updateComment = (event) => {
        this.setState({
            newComment: event.target.value
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Comments!</h1>
                <hr></hr>
                <br/>
                <div className="commentBox">
                    <h2>Join the Discussion!</h2>
                    <form className="commentForm" onSubmit={this.handleSubmit}>
                        <TextField className="commentText" type="text"
                        rows="2" onChange={this.updateComment}
                        value={this.state.newComment}
                        placeholder="Drop a comment!" disabled={this.state.user === null}
                        required>
                        </TextField>
                        {this.state.user === null ? 
                        <button type="submit" disabled>Login to Comment!</button> :
                        <button type="submit">Post Comment!</button>}
                    </form>
                    <div>
                        {
                            (this.state.currentTourComments !== null && this.state.currentTourComments !== undefined) ?
                            <div>
                                {this.state.currentTourComments.map(com => {
                                    return (
                                        <div>
                                        <hr></hr>
                                            <span>
                                            <div className="commentSection">
                                                <b>
                                                    {com.userName + ": "}
                                                </b>
                                                {com.comment + " "}
                                            </div>
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}