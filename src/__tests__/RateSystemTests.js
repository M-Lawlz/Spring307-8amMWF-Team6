import React from "react";
import { render } from "enzyme";
import toJson from "enzyme-to-json";
import RateSystem from "../components/RateSystem";

test("CommentMod renders successfully", () => {
  const rateSystem = render(<RateSystem location={{ pathname: "Test" }} />);
  expect(toJson(rateSystem)).toMatchSnapshot();
});
