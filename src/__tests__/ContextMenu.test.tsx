/**
 * @jest-environment jsdom
 */

import { render, fireEvent, screen } from "@testing-library/react";
import ContextMenu from "../components/ContextMenu";

describe("ContextMenu Component", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ContextMenu x={0} y={0} onAction={() => {}} />
    );
    expect(container).toBeInTheDocument();
  });

  it("displays copy, delete, and rename options", () => {
    render(<ContextMenu x={0} y={0} onAction={() => {}} />);
    const copyOption = screen.getByText("Copy");
    const deleteOption = screen.getByText("Delete");
    const renameOption = screen.getByText("Rename");

    expect(copyOption).toBeInTheDocument();
    expect(deleteOption).toBeInTheDocument();
    expect(renameOption).toBeInTheDocument();
  });

  it("calls the onAction callback when an option is clicked", () => {
    const mockOnAction = jest.fn();
    render(<ContextMenu x={0} y={0} onAction={mockOnAction} />);

    fireEvent.click(screen.getByText("Copy"));
    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Rename"));

    expect(mockOnAction).toHaveBeenCalledTimes(3);
    expect(mockOnAction).toHaveBeenCalledWith("copy");
    expect(mockOnAction).toHaveBeenCalledWith("delete");
    expect(mockOnAction).toHaveBeenCalledWith("rename");
  });

  it("positions the context menu correctly", () => {
    const x = 100;
    const y = 200;
    const { container } = render(
      <ContextMenu x={x} y={y} onAction={() => {}} />
    );

    // eslint-disable-next-line testing-library/no-node-access
    const contextMenu = container.firstChild as HTMLElement;

    expect(contextMenu.style.left).toBe(`${x}px`);
    expect(contextMenu.style.top).toBe(`${y}px`);
  });
});
