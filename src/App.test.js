import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

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
});
