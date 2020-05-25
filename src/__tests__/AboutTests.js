import About from "../About";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

test("About renders successfully", () => {
  const about = shallow(<About />);
  expect(toJson(about)).toMatchSnapshot();
});
