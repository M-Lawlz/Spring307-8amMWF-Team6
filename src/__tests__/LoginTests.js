import Login from "../components/Login";
import React from "react";
import Renderer from "react-test-renderer";

test("Login renders successfully", () => {
  const login = Renderer.create(<Login />);
  const loginJSON = login.toJSON();
  expect(loginJSON).toMatchSnapshot();
});
