import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import CommentMod from "../components/CommentMod";

test("CommentMod renders successfully", () => {
  const commentMod = shallow(<CommentMod location={{ pathname: "Test" }} />);
  expect(toJson(commentMod)).toMatchSnapshot();
});
