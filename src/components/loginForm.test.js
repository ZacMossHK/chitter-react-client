import { render, screen } from "@testing-library/react";
import LoginForm from "./loginForm";

describe("LoginForm", () => {
  beforeEach(() => {});

  it("renders the login options", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/username/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/)).toBeInTheDocument();
    expect(screen.getByText(/log in/)).toBeInTheDocument();
    expect(screen.getByText(/sign up/)).toBeInTheDocument();
  });
});
