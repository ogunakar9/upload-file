import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import uploadSlice from "./uploadSlice";
import { store } from "../../app/store";

import {
  UploaderState,
  setPreview,
  setUploadProgress,
  resetUploadProgress,
  setServerLoading,
  setIsSuccess,
  setIsError,
  setIsCanceled,
  resetUploadStatuses,
} from "./uploadSlice";
import FileUploader from "./Upload";

const mockStore = configureStore();
const initialState: UploaderState = {
  isError: false,
  preview: [],
  files: [],
  uploadProgress: [],
  serverLoading: false,
  uploadXHR: null,
  isSuccess: false,
  isCanceled: false,
};

//TODO: setters update state
// setUploadProgress,
// resetUploadProgress,
// setServerLoading,
// setIsSuccess,
// setIsError,
// setIsCanceled,
// resetUploadStatuses,

//TODO:
// file input selection
// file upload
// file upload progress
// file upload success
// file upload error
// file upload cancel
// file upload reset

describe("initialize store with correct state", () => {
  it("initialize slice with initialValue", () => {
    const uploadSliceInit = uploadSlice(initialState, { type: "unknown" });
    expect(uploadSliceInit).toBe(initialState);
  });

  it("Updates preview state", () => {
    const link = "https://www.w3schools.com/w3css/img_lights.jpg";
    store.dispatch(setPreview([link]));
    const state = store.getState();
    expect(state.upload.preview).toEqual([link]);
  });
});
