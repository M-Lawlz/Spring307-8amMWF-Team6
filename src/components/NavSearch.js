import React from "react";
import "firebase/firestore";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import { HashRouter, Link } from "react-router-dom";

export default class NavSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: [],
      isSearching: false,
      selectDropdowns: [],
      searchVal: "",
      retrieveTourPage: false,
      currentTour: [],
    };
  }

  handleNewData = (tour) => {
    /* this deals with all tour information */
    var dbTourArray = this.state.tours;
    var newDbTour = {
      tourId: tour.data().tourId,
      userEmail: tour.data().userEmail,
      location: tour.data().location,
      uploadDate: tour.data().uploadDate,
      videoUrl: tour.data().videoUrl,
      description: tour.data().description,
    };
    dbTourArray.push(newDbTour);

    /* this array is made specifically so it is compatible
       with the select attribute & dropdowns */
    var selectTourArray = this.state.selectDropdowns;
    var newDropdownTour = {
      label: tour.data().location,
      value: "" + tour.data().tourId,
    };
    selectTourArray.push(newDropdownTour);

    this.setState({
      tours: dbTourArray,
      isSearching: false,
      selectDropdowns: selectTourArray,
    });
  };

  componentDidMount() {
    const firebase = require("firebase");
    const db = firebase.firestore();
    const toursDb = db.collection("Tours");

    toursDb
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.handleNewData(doc);
        });
      })
      .catch(function (error) {
        console.log("Error getting document: ", error);
      });
  }

  handleNavSearch = (toSearch) => {
    if (!this.state.isSearching) {
      this.setState({
        isSearching: toSearch,
      });
    }
  };

  handleSearchChange = (value, { action }) => {
    if (action === "select-option") {
      // do something
      this.setState({
        searchVal: value.label,
      });
      var selected = this.state.tours.find((tur) => {
        return value.label === tur.location;
      });
      this.setState({
        currentTour: selected,
      });
    }
  };

  render() {
    const options = this.state.selectDropdowns;
    return (
      <div className="rowC">
        <div id="container" style={{ width: "200px" }}>
          {/* TODO: Implement at most 5 dropdowns & figure out text color */}
          <Select
            placeholder="Search..."
            options={options}
            maxMenuHeight={190}
            onClick={this.handleNavSearch}
            onChange={this.handleSearchChange}
            theme={(theme) => ({
              ...theme,
              borderRadius: 10,
              colors: {
                primary25: "lightgreen",
                primary: "teal",
                text: "black",
              },
            })}
          />
        </div>
        <HashRouter>
          <Link
            style={{ color: "inherit" }}
            to={{
              pathname: `/TourPage/${this.state.currentTour.tourId}`,
              state: this.state.currentTour,
            }}
          >
            <Button style={{ flex: 1 }}>GO</Button>
          </Link>
        </HashRouter>
      </div>
    );
  }
}
