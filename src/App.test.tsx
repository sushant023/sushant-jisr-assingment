/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Sushant Bhaskar Assignment/i);
  expect(linkElement).toBeInTheDocument();
});
