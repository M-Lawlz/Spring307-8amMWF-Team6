import React from "react";

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h1>SimTrek: Travel Anywhere, Easily</h1>
        <h2> What is SimTrek? </h2>
        <div id="theDiv">
        <p>
          SimTrek is a platform that will allow users to access virtual tours
          from the comfort of one’s home. Users will have the ability to create
          a “vtravelr” account and connect with other users, potentially being
          able to take virtual tours together. Furthermore, users will be able
          to rate tours in order to enable user feedback. Virtual tours will
          contain a description of the city, pictures of the city, and a virtual
          tour that is AR accessible.
        </p>
         </div>

        <h2> New Features Coming Soon </h2>
        <div id="theDiv">
        <p>
          Profile page for each user Login (allows user virtual tour uploading,
          commenting, saving fav places, etc.) Message other users Forum - where
          tours are uploaded
        </p>
        </div>


        <h2> Our Team! </h2>
        <div id="theDiv">
        <p>
         Our founding team consists of Nitish Padavala, Matthew Lawler, and Wilson Huang!
        </p>
        </div>
      </div>
    );
  }
}
