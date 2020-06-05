import App from "firebase/app";
import "firebase/auth";
import SignUp from "../components/SignUp";
import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

test("SignUp renders successfully", () => {
  const signUp = shallow(<SignUp />);
  expect(toJson(signUp)).toMatchSnapshot();
});

test("Attempts to sign up correctly.", () => {
  jest.spyOn(App.auth(), "createUserWithEmailAndPassword");
  const signUp = shallow(<SignUp />);
  const instance = signUp.instance();
  instance.attemptSignUp();
  expect(App.auth().createUserWithEmailAndPassword).toBeCalled();
});

test("Cancels sign up correctly.", () => {
  const signUpShowingSpy = jest.fn();
  const signUp = shallow(<SignUp signUpShowing={signUpShowingSpy} />);
  signUp.setState({ open: true });
  const instance = signUp.instance();
  instance.cancelSignUp();
  expect(instance.state.open).toBe(false);
  expect(signUpShowingSpy).toBeCalledWith(false);
});

test("Closes sign up correctly.", () => {
  jest.spyOn(window, "alert");
  const signUpShowingSpy = jest.fn();
  const signUp = shallow(<SignUp signUpShowing={signUpShowingSpy} />);
  signUp.setState({ open: true });
  const instance = signUp.instance();
  instance.closeSignUp();
  expect(instance.state.open).toBe(false);
  expect(signUpShowingSpy).toBeCalledWith(false);
  expect(window.alert).toBeCalled();
});

test("Handles first name input correctly.", () => {
  const signUp = shallow(<SignUp />);
  const instance = signUp.instance();
  instance.handleFirstNameInput({ target: { value: "test" } });
  expect(instance.state.firstName).toBe("test");
});

test("Handles last name input correctly.", () => {
  const signUp = shallow(<SignUp />);
  const instance = signUp.instance();
  instance.handleLastNameInput({ target: { value: "test" } });
  expect(instance.state.lastName).toBe("test");
});

test("Handles password input correctly.", () => {
  const signUp = shallow(<SignUp />);
  const instance = signUp.instance();
  instance.handlePasswordInput({ target: { value: "test" } });
  expect(instance.state.password).toBe("test");
});

test("Handles username input correctly.", () => {
  const signUp = shallow(<SignUp />);
  const instance = signUp.instance();
  instance.handleUsernameInput({ target: { value: "test" } });
  expect(instance.state.username).toBe("test");
});

test("Submits form correctly.", () => {
  const event = new Event("test");
  jest.spyOn(event, "preventDefault");
  const signUp = shallow(<SignUp />);
  const instance = signUp.instance();
  jest.spyOn(instance, "attemptSignUp");
  instance.submitSignUpForm(event);
  expect(event.preventDefault).toBeCalled();
  expect(instance.attemptSignUp).toBeCalled();
});
