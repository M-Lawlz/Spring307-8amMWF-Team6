import App from "firebase/app";
import "firebase/auth";
import Login from "../components/Login";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

window.alert = jest.fn();

test("Closes Login correctly.", () => {
  const loginShowingSpy = jest.fn();
  const login = shallow(<Login loginShowing={loginShowingSpy} />);
  login.setState({ open: true });
  const instance = login.instance();
  instance.closeLogin();
  expect(instance.state.open).toBe(false);
  expect(loginShowingSpy).toBeCalledWith(false);
});

test("Finishes resetting password correctly.", () => {
  jest.spyOn(window, "alert");
  const login = shallow(<Login />);
  const instance = login.instance();
  jest.spyOn(instance, "toggleForgotPassword");
  instance.finishResetPassword();
  expect(window.alert).toBeCalled();
  expect(instance.toggleForgotPassword).toBeCalled();
});

test("Handles email input correctly.", () => {
  const login = shallow(<Login />);
  const instance = login.instance();
  instance.handleEmailInput({ target: { value: "test@test.com" } });
  expect(instance.state.email).toBe("test@test.com");
});

test("Handles errors correctly.", () => {
  jest.spyOn(window, "alert");
  const login = shallow(<Login />);
  const instance = login.instance();
  instance.handleError({ message: "test" });
  expect(window.alert).toBeCalled();
});

test("Handles password input correctly.", () => {
  const login = shallow(<Login />);
  const instance = login.instance();
  instance.handlePasswordInput({ target: { value: "test" } });
  expect(instance.state.password).toBe("test");
});

test("Logs in correctly.", () => {
  jest.spyOn(window, "alert");
  const loginShowingSpy = jest.fn();
  const login = shallow(<Login loginShowing={loginShowingSpy} />);
  const instance = login.instance();
  jest.spyOn(instance, "closeLogin");
  instance.login();
  expect(window.alert).toBeCalled();
  expect(instance.closeLogin).toBeCalled();
  expect(instance.state.open).toBe(false);
  expect(loginShowingSpy).toBeCalledWith(false);
});

test("Sends password reset email correctly.", () => {
  jest.spyOn(App.auth(), "sendPasswordResetEmail");
  const login = shallow(<Login />);
  const instance = login.instance();
  instance.sendPasswordResetEmail("test@test.com");
  expect(App.auth().sendPasswordResetEmail).toBeCalled();
});

test("Toggles forgot password screen correctly.", () => {
  const login = shallow(<Login />);
  login.setState({ isForgotPassword: false });
  const instance = login.instance();
  instance.toggleForgotPassword();
  expect(instance.state.isForgotPassword).toBe(true);
});

test("Login renders successfully.", () => {
  const login = shallow(<Login />);
  expect(toJson(login)).toMatchSnapshot();
});
