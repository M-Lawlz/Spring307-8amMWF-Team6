import AddTourForm from "../AddTourForm";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

test("AddTourForm renders successfully.", () => {
  const addTourForm = shallow(<AddTourForm />);
  expect(toJson(addTourForm)).toMatchSnapshot();
});
