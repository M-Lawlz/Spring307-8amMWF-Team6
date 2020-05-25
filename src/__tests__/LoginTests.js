import Login from "../components/Login";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

test("Login renders successfully", () => {
  const login = shallow(<Login />);
  expect(toJson(login)).toMatchSnapshot();
});
