import { render, screen } from "@testing-library/react";
import SidePanel from "./sidePanel";

describe("SidePanel", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("renders the Chitter Header", () => {
    render(<SidePanel />);
    const text = screen.getByText(/Chitter/);
    expect(text).toBeInTheDocument();
  });

  it("renders the login options", () => {
    render(<SidePanel />);
    expect(screen.getByPlaceholderText(/username/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/)).toBeInTheDocument();
    expect(screen.getByText(/log in/)).toBeInTheDocument();
    expect(screen.getByText(/sign up/)).toBeInTheDocument();
  });
});
