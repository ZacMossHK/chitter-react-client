import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the Chitter Header", () => {
    render(<App />);
    expect(screen.getByText(/Chitter/)).toBeInTheDocument();
  });

  it("renders the login options", () => {
    render(<App />);
    expect(screen.getByText(/username/)).toBeInTheDocument();
    expect(screen.getByText(/password/)).toBeInTheDocument();
    expect(screen.getByText(/Log in/)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/)).toBeInTheDocument();
  });
});
