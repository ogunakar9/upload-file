import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

//TODO:
// file upload progress render
// file preview render
// file upload success indicator render
// file upload error indicator render
// file upload cancel indicator render
// file upload reset/try again indicator render

test("renders upload input", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(screen.getByText("Upload files")).toBeInTheDocument();
});
