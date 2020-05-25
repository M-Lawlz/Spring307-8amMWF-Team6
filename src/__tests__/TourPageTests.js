import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import TourPage from "../components/TourPage";

test("TourPage renders successfully", () => {
  const tourPage = shallow(<TourPage location={{pathname: "Test"}}/>);
  expect(toJson(tourPage)).toMatchSnapshot();
});
