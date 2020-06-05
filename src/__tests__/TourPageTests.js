import React from "react";
import { render } from "enzyme";
import toJson from "enzyme-to-json";
import TourPage from "../components/TourPage";
import { BrowserRouter as Router } from 'react-router-dom';

test("TourPage renders successfully", () => {
  const tourPage = render(<Router>
    <TourPage location={{ pathname: "Test" }} />
    </Router>);
  expect(toJson(tourPage)).toMatchSnapshot();
});
