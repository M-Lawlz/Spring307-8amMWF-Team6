import AccountForm from "../components/AccountForm";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

window.alert = jest.fn();

test("Mounts firstName formType correctly.", () => {
  const accountForm = shallow(<AccountForm formType={"firstName"} />);
  setTimeout(() => {
    accountForm.update();
    expect(accountForm.state("formType")).toBe("firstName");
    expect(accountForm.state("inputType")).toBe("text");
    expect(accountForm.state("printType")).toBe("First Name");
  }, 0);
});

test("Mounts lastName formType correctly.", () => {
  const accountForm = shallow(<AccountForm formType={"lastName"} />);
  setTimeout(() => {
    accountForm.update();
    expect(accountForm.state("formType")).toBe("lastName");
    expect(accountForm.state("inputType")).toBe("text");
    expect(accountForm.state("printType")).toBe("Last Name");
  }, 0);
});

test("Mounts email formType correctly.", () => {
  const accountForm = shallow(<AccountForm formType={"email"} />);
  setTimeout(() => {
    accountForm.update();
    expect(accountForm.state("formType")).toBe("email");
    expect(accountForm.state("inputType")).toBe("email");
    expect(accountForm.state("printType")).toBe("Email");
  }, 0);
});

test("Mounts password formType correctly.", () => {
  const accountForm = shallow(<AccountForm formType={"password"} />);
  setTimeout(() => {
    accountForm.update();
    expect(accountForm.state("formType")).toBe("password");
    expect(accountForm.state("inputType")).toBe("password");
    expect(accountForm.state("printType")).toBe("Password");
  }, 0);
});

test("Mounts profilePicture formType correctly.", () => {
  const accountForm = shallow(<AccountForm formType={"profilePicture"} />);
  setTimeout(() => {
    accountForm.update();
    expect(accountForm.state("formType")).toBe("profilePicture");
    expect(accountForm.state("inputType")).toBe("file");
    expect(accountForm.state("printType")).toBe("Profile Picture");
  })
});

test("Mounts coverPhoto formType correctly.", () => {
  const accountForm = shallow(<AccountForm formType={"coverPhoto"}/>);
  setTimeout(() => {
    accountForm.update();
    expect(accountForm.state("formType")).toBe("coverPhoto");
    expect(accountForm.state("inputType")).toBe("file");
    expect(accountForm.state("printType")).toBe("Cover Photo");
  })
});

test("Attempts to update an email form correctly.", () => {
  const accountForm = shallow(<AccountForm formType={"email"} />);
  const updateEmailSpy = jest.fn(() => Promise.resolve());
  accountForm.setState({
    input: "test",
    user: { email: "test@test.com", updateEmail: updateEmailSpy },
  });
  const instance = accountForm.instance();
  instance.attemptUpdate();
  expect(updateEmailSpy).toBeCalledWith("test");
});

test("Attempts to update a password form correctly.", () => {
  const accountForm = shallow(<AccountForm formType={"password"} />);
  const updatePasswordSpy = jest.fn(() => Promise.resolve());
  accountForm.setState({
    input: "test",
    user: { email: "test@test.com", updatePassword: updatePasswordSpy },
  });
  const instance = accountForm.instance();
  instance.attemptUpdate();
  expect(updatePasswordSpy).toBeCalledWith("test");
});

test("Cancels the form correctly.", () => {
  const isFormShowingSpy = jest.fn();
  const accountForm = shallow(<AccountForm isFormShowing={isFormShowingSpy} />);
  const instance = accountForm.instance();
  instance.cancelForm();
  setTimeout(() => {
    expect(accountForm.state("open")).toBe(false);
    expect(isFormShowingSpy).toBeCalledWith(false);
  }, 0);
});

test("Closes the form correctly.", () => {
  jest.spyOn(window, "alert");
  const isFormShowingSpy = jest.fn();
  const accountForm = shallow(<AccountForm isFormShowing={isFormShowingSpy} />);
  const instance = accountForm.instance();
  instance.closeForm();
  setTimeout(() => {
    expect(accountForm.state("open")).toBe(false);
    expect(isFormShowingSpy).toBeCalledWith(false);
    expect(window.alert).toBeCalled();
  }, 0);
});

test("Handles errors correctly.", () => {
  jest.spyOn(window, "alert");
  const accountForm = shallow(<AccountForm />);
  const instance = accountForm.instance();
  instance.handleError({ message: "Test error." });
  expect(window.alert).toBeCalled();
});

test("Handles input correctly.", () => {
  const accountForm = shallow(<AccountForm />);
  const instance = accountForm.instance();
  instance.handleInput({ target: { value: "test" } });
  setTimeout(() => {
    expect(accountForm.state("input")).toBe("test");
  }, 0);
});

test("Submits form correctly.", () => {
  const event = new Event("test");
  jest.spyOn(event, "preventDefault");
  const accountForm = shallow(<AccountForm />);
  accountForm.setState({ user: { email: "test@test.com" } });
  const instance = accountForm.instance();
  jest.spyOn(instance, "attemptUpdate");
  instance.submitForm(event);
  expect(event.preventDefault).toBeCalled();
  expect(instance.attemptUpdate).toBeCalled();
});

test("Renders successfully.", () => {
  const accountForm = shallow(<AccountForm />);
  expect(toJson(accountForm)).toMatchSnapshot();
});
