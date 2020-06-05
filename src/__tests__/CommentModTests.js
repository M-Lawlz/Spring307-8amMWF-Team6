import React from "react";
import { render } from "enzyme";
import toJson from "enzyme-to-json";
import CommentMod from "../components/CommentMod";

test("CommentMod renders successfully", () => {
  const commentMod = render(<CommentMod location={{ pathname: "Test" }} />);
  expect(toJson(commentMod)).toMatchSnapshot();
});
