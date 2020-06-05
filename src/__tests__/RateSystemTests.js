import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RateSystem from "../components/RateSystem";

test("RateSystem renders successfully.", () => {
  const rateSystem = shallow(<RateSystem location={{ pathname: "Test" }} />);
  expect(toJson(rateSystem)).toMatchSnapshot();
});
