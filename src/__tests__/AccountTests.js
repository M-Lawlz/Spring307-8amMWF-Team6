import Account from "../Account";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

test("Account renders successfully", () => {
  const account = shallow(<Account />);
  expect(toJson(account)).toMatchSnapshot();
});
