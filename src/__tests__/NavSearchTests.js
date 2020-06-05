import NavSearch from "../components/NavSearch";
import React from "react";
import { render, shallow } from "enzyme";
import toJson from "enzyme-to-json";

test("NavSearch renders successfully.", () => {
  const navSearch = render(<NavSearch />);
  expect(toJson(navSearch)).toMatchSnapshot();
});

// test("Get new selected tour.", () => {
//   const navsearch = shallow(<NavSearch />);
//   const instance = navsearch.instance();
//   instance.updateTour(null);
//   expect(instance.state.currentTour).toBe(null);
// });