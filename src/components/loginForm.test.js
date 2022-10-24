import { render, screen } from "@testing-library/react";
import LoginForm from "./loginForm";
import userEvent from "@testing-library/user-event";

describe("LoginForm", () => {
  beforeEach(() => {});

  it("renders the login options", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/username/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/)).toBeInTheDocument();
    expect(screen.getByText(/log in/)).toBeInTheDocument();
    expect(screen.getByText(/sign up/)).toBeInTheDocument();
  });

  it("sets setSignUpFormVisible to true", async () => {
    const mockSetSignUpFormVisible = jest.fn();
    render(<LoginForm setSignUpFormVisible={mockSetSignUpFormVisible} />);
    await userEvent.click(screen.getByRole("button", { name: "sign up" }));
    expect(mockSetSignUpFormVisible).toHaveBeenCalledWith(true);
  });
});
