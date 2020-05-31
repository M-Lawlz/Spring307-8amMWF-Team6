import App from "firebase/app";
import "firebase/auth";
import NavBar from "../components/NavBar";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

window.alert = jest.fn();
window.location.reload = jest.fn();

test("Attempts login correctly.", () => {
  jest.spyOn(App.auth(), "signOut");
  jest.spyOn(window.location, "reload");
  const navBar = shallow(<NavBar />);
  const instance = navBar.instance();
  instance.attemptLogout();
  expect(App.auth().signOut).toBeCalled();
  expect(window.location.reload).toBeCalled();
});

test("Handles errors correctly.", () => {
  jest.spyOn(window, "alert");
  const navBar = shallow(<NavBar />);
  const instance = navBar.instance();
  instance.handleError({ message: "test" });
  expect(window.alert).toBeCalled();
});

test("Handles login clicks correctly.", () => {
  const navBar = shallow(<NavBar />);
  const instance = navBar.instance();
  instance.loginClicked(false);
  expect(instance.state.isLoginShowing).toBe(false);
});

test("Logs out correctly.", () => {
  jest.spyOn(window, "alert");
  const navBar = shallow(<NavBar />);
  const instance = navBar.instance();
  instance.logout();
  expect(window.alert).toBeCalled();
  expect(instance.state.user).toBe(null);
});

test("Handles signUp clicks correctly.", () => {
  const navBar = shallow(<NavBar />);
  const instance = navBar.instance();
  instance.signUpClicked(false);
  expect(instance.state.isSignUpShowing).toBe(false);
});

test("NavBar renders successfully.", () => {
  const navBar = shallow(<NavBar />);
  expect(toJson(navBar)).toMatchSnapshot();
});
