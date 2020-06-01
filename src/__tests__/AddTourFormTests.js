import AddTourForm from "../AddTourForm";
import React from "react";
import { render } from "enzyme";
import toJson from "enzyme-to-json";

test("AddTourForm renders successfully.", () => {
  const addTourForm = render(<AddTourForm />);
  expect(toJson(addTourForm)).toMatchSnapshot();
});
