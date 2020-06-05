import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import UploadTour from "../UploadTour";
import AddTourForm from "../AddTourForm";


test("UploadTour renders successfully", () => {
  const uploadTour = shallow(<UploadTour />);
  expect(toJson(uploadTour)).toMatchSnapshot();
});


