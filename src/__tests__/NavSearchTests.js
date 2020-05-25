import NavSearch from "../components/NavSearch";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

test("NavSearch renders successfully", () => {
  const navSearch = shallow(<NavSearch />);
  expect(toJson(navSearch)).toMatchSnapshot();
});
