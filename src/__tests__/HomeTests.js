import Home from "../Home";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

test("Home renders successfully", () => {
  const home = shallow(<Home />);
  expect(toJson(home)).toMatchSnapshot();
});
