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

  it("renders LoginForm again once signUpFormVisible = false again", () => {
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

  it("renders PeepForm if user signs up", () => {
    LoginForm.mockImplementationOnce(({ setSignUpFormVisible }) => {
      useEffect(() => {
        setSignUpFormVisible(true);
      }, [setSignUpFormVisible]);
      return <p>Login</p>;
    });
    SignUpForm.mockImplementationOnce(({ setSignUpFormVisible, setUser }) => {
      useEffect(() => {
        setUser({ username: "foo" });
        setSignUpFormVisible(false);
      }, [setSignUpFormVisible, setUser]);
      <p>submit</p>;
    });
    PeepForm.mockImplementationOnce(({ user }) => <p>{user.username}</p>);
    render(<SidePanel />);
    expect(screen.queryByText(/submit/)).toBeNull();
    expect(screen.getByText(/foo/)).toBeInTheDocument();
  });

  it("renders LoginForm if user logs off", () => {
    LoginForm.mockImplementationOnce(({ setUser }) => {
      useEffect(() => {
        setUser({ username: "foo" });
      }, [setUser]);
      return <p>Login</p>;
    }).mockImplementationOnce(() => <p>Login</p>);
    PeepForm.mockImplementationOnce(({ setUser }) => {
      useEffect(() => {
        setUser(null);
      }, [setUser]);
    });
    render(<SidePanel />);
    expect(screen.queryByText(/foo/)).toBeNull();
    expect(screen.getByText(/Login/)).toBeInTheDocument();
  });

  it("passes peeps props", () => {
    const peeps = [{ body: "peep1" }];
    const setPeeps = jest.fn();
    LoginForm.mockImplementation(({ setUser }) => {
      useEffect(() => {
        setUser({ username: "foo" });
      }, [setUser]);
    });
    const result = [{ body: "peep2" }, ...peeps];
    PeepForm.mockImplementation(({ peeps, setPeeps }) => {
      useEffect(() => {
        setPeeps(result);
      });
    });
    render(<SidePanel peeps={peeps} setPeeps={setPeeps} />);
    expect(setPeeps).toHaveBeenCalledWith(result);
  });
});
