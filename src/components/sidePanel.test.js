import { render, screen } from "@testing-library/react";
import SidePanel from "./sidePanel";

describe("SidePanel", () => {
  it("renders the Chitter Header", () => {
    render(<SidePanel />);
    const text = screen.getByText(/Chitter/);
    expect(text).toBeInTheDocument();
  });
});
