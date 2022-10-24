import { render, screen } from "@testing-library/react";
import SignUpForm from "./signUpForm";

describe("SignUpForm", () => {
  it("renders the options", () => {
    render(<SignUpForm />);
    expect(screen.getByText(/Sign up!/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "submit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "back" })).toBeInTheDocument();
  });
  // it("sets the user as the signed up user", () => {
  //   const mockSetUser = jest.fn()
  //   render <si
  // })
});
