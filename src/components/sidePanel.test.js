import { render, screen } from "@testing-library/react";
import SidePanel from "./sidePanel";
import LoginForm from "./loginForm";
import PeepForm from "./peepForm";
jest.mock("./loginForm");
jest.mock("./peepForm");

describe("SidePanel", () => {
  beforeEach(() => {
    // LoginForm.resetMocks();
    // PeepForm.resetMocks();
  });
  it("renders the default panel", () => {
    LoginForm.mockImplementation(() => <p>Login</p>);
    render(<SidePanel />);
    const text = screen.getByText(/Chitter/);
    expect(text).toBeInTheDocument();
    expect(screen.getByText(/Login/)).toBeInTheDocument();
  });
});
