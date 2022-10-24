import { render, screen } from "@testing-library/react";
import SidePanel from "./sidePanel";
import LoginForm from "./loginForm";
import PeepForm from "./peepForm";
import { useEffect } from "react";
import SignUpForm from "./signUpForm";
jest.mock("./loginForm");
jest.mock("./peepForm");
jest.mock("./signUpForm");

describe("SidePanel", () => {
  it("renders the default panel", () => {
    LoginForm.mockImplementation(() => <p>Login</p>);
    render(<SidePanel />);
    const text = screen.getByText(/Chitter/);
    expect(text).toBeInTheDocument();
    expect(screen.getByText(/Login/)).toBeInTheDocument();
  });

  it("renders the PeepForm if user is truthy", () => {
    PeepForm.mockImplementation(({ user }) => <p>{user.username}</p>);
    LoginForm.mockImplementation(({ setUser }) => {
      useEffect(() => {
        setUser({ _id: 1, username: "foo" });
      }, [setUser]);

      return <p>Login</p>;
    });
    render(<SidePanel />);
    expect(screen.queryByText(/Login/)).toBeNull();
    expect(screen.getByText(/foo/)).toBeInTheDocument();
  });

  it("renders SignUpForm if signUpFormVisible = true", () => {
    LoginForm.mockImplementation(({ setSignUpFormVisible }) => {
      useEffect(() => {
        setSignUpFormVisible(true);
      }, [setSignUpFormVisible]);
      return <p>Login</p>;
    });
    SignUpForm.mockImplementation(() => <p>submit</p>);
    render(<SidePanel />);
    expect(screen.queryByText(/Login/)).toBeNull();
    expect(screen.getByText(/submit/)).toBeInTheDocument();
  });

  it("renders the login form again once signUpFormVisible = false again", () => {
    LoginForm.mockImplementationOnce(({ setSignUpFormVisible }) => {
      useEffect(() => {
        setSignUpFormVisible(true);
      }, [setSignUpFormVisible]);
      return <p>Login</p>;
    }).mockImplementationOnce(() => <p>Login</p>);
    SignUpForm.mockImplementationOnce(({ setSignUpFormVisible }) => {
      useEffect(() => {
        setSignUpFormVisible(false);
      }, [setSignUpFormVisible]);
      <p>submit</p>;
    });
    render(<SidePanel />);
    expect(screen.queryByText(/submit/)).toBeNull();
    expect(screen.getByText(/Login/)).toBeInTheDocument();
  });
});
