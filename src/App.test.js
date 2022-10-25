import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { isElementOfType } from "react-dom/test-utils";

describe("App", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("logs in a user", async () => {
    fetch
      .mockResponseOnce(JSON.stringify([]))
      .mockResponseOnce(JSON.stringify({ _id: 1, username: "foo" }));
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText(/username/), "foo");
    await userEvent.type(screen.getByPlaceholderText(/password/), "password");
    await userEvent.click(screen.getByRole("button", { name: "log in" }));
    await screen.findByText(/@foo/);
    expect(screen.getByText(/@foo/)).toBeInTheDocument();
    expect(
      screen.getByText("What would you like to Peep?")
    ).toBeInTheDocument();
  });

  it("logs a user out", async () => {
    fetch
      .mockResponseOnce(JSON.stringify([]))
      .mockResponseOnce(JSON.stringify({ _id: 1, username: "foo" }))
      .mockResolvedValueOnce({ status: 204 });
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText(/username/), "foo");
    await userEvent.type(screen.getByPlaceholderText(/password/), "password");
    await userEvent.click(screen.getByRole("button", { name: "log in" }));
    await screen.findByRole("button", { name: "log off" });
    await userEvent.click(screen.getByRole("button", { name: "log off" }));
    await screen.findByRole("button", { name: "log in" });
    expect(screen.getByRole("button", { name: "log in" })).toBeInTheDocument();
  });

  it("signs up", async () => {
    fetch
      .mockResponseOnce(JSON.stringify([]))
      .mockResponseOnce(JSON.stringify({ _id: 1, username: "foo" }));
    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "sign up" }));
    await screen.findByPlaceholderText(/email/);
    await userEvent.type(screen.getByPlaceholderText(/username/), "foo");
    await userEvent.type(screen.getByPlaceholderText(/password/), "password");
    await userEvent.type(
      screen.getByPlaceholderText(/email/),
      "email@email.com"
    );
    await userEvent.click(screen.getByText(/submit/));
    await screen.findByText(/@foo/);
    expect(screen.getByText(/@foo/)).toBeInTheDocument();
    expect(
      screen.getByText("What would you like to Peep?")
    ).toBeInTheDocument();
  });

  it("posts a new peep", async () => {
    fetch
      .mockResponseOnce(JSON.stringify([]))
      .mockResponseOnce(JSON.stringify({ _id: 1, username: "foo" }))
      .mockResponseOnce(
        JSON.stringify({
          body: "hello world",
          _id: 1,
          username: "foo",
          createdAt: new Date(2022, 10, 24),
          likes: [],
        })
      );
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText(/username/), "foo");
    await userEvent.type(screen.getByPlaceholderText(/password/), "password");
    await userEvent.click(screen.getByRole("button", { name: "log in" }));
    await userEvent.type(
      screen.getByPlaceholderText(/Enter your peep here/),
      "hello world"
    );
    await userEvent.click(screen.getByRole("button", { name: "peep!" }));
    await screen.findByText(/hello world/);
    expect(screen.getByText(/hello world/)).toBeInTheDocument();
    expect(
      screen.getByText(
        "Posted at Thu Nov 24 2022 00:00:00 GMT+0000 (Greenwich Mean Time)"
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/♡ 0/)).toBeInTheDocument();
  });
});
