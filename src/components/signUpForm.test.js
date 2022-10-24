import { render, screen, waitFor } from "@testing-library/react";
import SignUpForm from "./signUpForm";
import userEvent from "@testing-library/user-event";

describe("SignUpForm", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("renders the options", () => {
    render(<SignUpForm />);
    expect(screen.getByText(/Sign up!/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "submit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "back" })).toBeInTheDocument();
  });
  it("sets the user as the signed up user", async () => {
    const mockSetUser = jest.fn();
    const user = { _id: 1, username: "foo" };
    fetch.mockResponseOnce(JSON.stringify(user));
    render(<SignUpForm setUser={mockSetUser} />);
    await userEvent.type(screen.getByPlaceholderText(/username/), "foo");
    await userEvent.type(screen.getByPlaceholderText(/password/), "password");
    await userEvent.type(
      screen.getByPlaceholderText(/email/),
      "email@email.com"
    );
    await userEvent.click(screen.getByRole("button", { name: "submit" }));
    expect(fetch).toHaveBeenCalled();
    expect(mockSetUser).toHaveBeenCalledWith(user);
  });
});
