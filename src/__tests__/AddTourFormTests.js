import AddTourForm from "../AddTourForm";
import React from "react";
import { render } from "enzyme";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";


test("AddTourForm renders successfully.", () => {
  const addTourForm = render(<AddTourForm />);
  expect(toJson(addTourForm)).toMatchSnapshot();
});

const wrapper = shallow(<AddTourForm />);
describe("updateInput", () => {
  it("should call setState", () => {
    const expected = {
      description: "test",
      location: "test",
      uploadDate: "test"
    
    };
    
    setTimeout(() => {
    wrapper.instance().updateInput({target: { value: 'test', name: 'test'}});
    expect(wrapper.state.test).toEqual('test');
  }, 0);
  });
});
