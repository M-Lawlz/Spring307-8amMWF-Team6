import React from "react";
import { render, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RateSystem from "../components/RateSystem";

test("CommentMod renders successfully", () => {
  const rateSystem = render(<RateSystem location={{ pathname: "Test" }} />);
  expect(toJson(rateSystem)).toMatchSnapshot();
});

test("Retrieving tours", () => {
  const comment = shallow(<RateSystem location={{ pathname: "Test" }} />);
  const instance = comment.instance();
  instance.loadupTours(null);
  expect(instance.state.tours).toBe(null);
});

test("Retrieving current tour information", () => {
  const comment = shallow(<RateSystem location={{ pathname: "Test" }} />);
  const instance = comment.instance();
  instance.setCurrentTourInfo(5, null);
  expect(instance.state.tourLikes).toBe(5);
  expect(instance.state.currentTour).toBe(null);
});