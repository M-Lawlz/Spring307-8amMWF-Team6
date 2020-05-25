import NavBar from "../components/NavBar";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

test("NavBar renders successfully", () => {
  const navBar = shallow(<NavBar />);
  expect(toJson(navBar)).toMatchSnapshot();
});
