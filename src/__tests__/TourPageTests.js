import React from "react";
import { render } from "enzyme";
import toJson from "enzyme-to-json";
import TourPage from "../components/TourPage";

test("TourPage renders successfully", () => {
  const tourPage = render(<TourPage location={{ pathname: "Test" }} />);
  expect(toJson(tourPage)).toMatchSnapshot();
});
