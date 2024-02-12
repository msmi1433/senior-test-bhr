import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

test("demo", () => {
  render(<App />);
  expect(true).toBeTruthy();
});
