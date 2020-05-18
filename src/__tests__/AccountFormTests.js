import AccountForm from "../components/AccountForm";
import React from "react";
import Renderer from "react-test-renderer";

test("AccountForm renders successfully", () => {
  const accountForm = Renderer.create(<AccountForm />);
  const accountFormJSON = accountForm.toJSON();
  expect(accountFormJSON).toMatchSnapshot();
});
