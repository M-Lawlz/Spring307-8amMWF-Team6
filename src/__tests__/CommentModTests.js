import React from "react";
import { render, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import CommentMod from "../components/CommentMod";

test("CommentMod renders successfully", () => {
  const commentMod = render(<CommentMod location={{ pathname: "Test" }} />);
  expect(toJson(commentMod)).toMatchSnapshot();
});

test("Updating a comment", () => {
  const comment = shallow(<CommentMod location={{ pathname: "Test" }} />);
  const instance = comment.instance();
  instance.updateComment({ target: { value : "newcomment"}});
  expect(instance.state.newComment).toBe("newcomment");
});

test("Updating the tour page's comment", () => {
  const comment = shallow(<CommentMod location={{ pathname: "Test" }} />);
  const instance = comment.instance();
  instance.updateLocalTourComments([{comment: "comment1", userName: "johncena", commentDate: "01/01/2000"}]);
  expect(instance.state.currentTourComments).toStrictEqual([{comment: "comment1", userName: "johncena", commentDate: "01/01/2000"}]);
});