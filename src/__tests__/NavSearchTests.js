import NavSearch from "../components/NavSearch";
import React from "react";
import { render } from "enzyme";
import toJson from "enzyme-to-json";

test("NavSearch renders successfully", () => {
  const navSearch = render(<NavSearch />);
  expect(toJson(navSearch)).toMatchSnapshot();
});
