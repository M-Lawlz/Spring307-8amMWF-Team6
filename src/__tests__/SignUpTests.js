import SignUp from "../components/SignUp";
import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

test("SignUp renders successfully", () => {
  const signUp = shallow(<SignUp />);
  expect(toJson(signUp)).toMatchSnapshot();
});
