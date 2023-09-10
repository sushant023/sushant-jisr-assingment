/**
 * @jest-environment jsdom
 */

import { render, fireEvent, screen } from "@testing-library/react";
import FileExplorer from "../components/FileExplorer";

const testData = {
  type: "folder",
  name: "parent",
  data: [
    {
      type: "folder",
      name: "root",
      data: [
        {
          type: "folder",
          name: "src",
          data: [
            {
              type: "file",
              meta: "js",
              name: "index.js",
            },
          ],
        },
        {
          type: "folder",
          name: "public",
          data: [
            {
              type: "file",
              meta: "ts",
              name: "index.ts",
            },
          ],
        },
        {
          type: "file",
          meta: "html",
          name: "index.html",
        },
      ],
    },
  ],
};

describe("FileExplorer Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<FileExplorer data={testData} />);
    expect(container).toBeInTheDocument();
  });

  it("displays a search bar", () => {
    render(<FileExplorer data={testData} />);
    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  });

  it("handles search input change", () => {
    render(<FileExplorer data={testData} />);
    const searchInput: HTMLInputElement =
      screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "index" } });
    expect(searchInput.value).toBe("index");
  });

  it("expands/collapses folders when Enter key is pressed", () => {
    render(<FileExplorer data={testData} />);
    const folder = screen.getByText("root");
    fireEvent.keyDown(folder, { key: "Enter" });
    // Implement assertion for folder expansion
    fireEvent.keyDown(folder, { key: "Enter" });
    // Implement assertion for folder collapse
  });

  //   it('displays context menu on "c" key press', () => {
  //     render(<FileExplorer data={testData} />);
  //     const file = screen.getByText("index.js");
  //     fireEvent.keyDown(file, { key: "c" });
  //     const contextMenu = screen.getByTestId("context-menu");
  //     expect(contextMenu).toBeInTheDocument();
  //   });
});
