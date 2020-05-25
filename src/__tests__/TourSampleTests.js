import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import TourSample from "../TourSample";

test("TourSample renders successfully", () => {
  const tourSample = shallow(<TourSample />);
  expect(toJson(tourSample)).toMatchSnapshot();
});
