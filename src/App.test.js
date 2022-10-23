import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify([]));
  });

  it("renders the Chitter Header", () => {
    render(<App />);
    const text = screen.getByText(/Chitter/);
    expect(text).toBeInTheDocument();
  });

  it("renders the login options", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/username/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/)).toBeInTheDocument();
    expect(screen.getByText(/log in/)).toBeInTheDocument();
    expect(screen.getByText(/sign up/)).toBeInTheDocument();
  });

  it("renders a peep", async () => {
    const peep = [
      {
        username: "foo",
        body: "first peep",
        createdAt: new Date(2022, 10, 11),
        likes: ["id1, id2"],
      },
    ];
    fetch.mockResponseOnce(JSON.stringify(peep));
    render(<App />);
    const username = await screen.findByText(/@foo/);
    const body = await screen.findByText(/first peep/);
    const createdAt = await screen.findByText(
      "Posted at Fri Nov 11 2022 00:00:00 GMT+0000 (Greenwich Mean Time)"
    );
    const likes = await screen.findByText(/♡ 1/);
    [(username, body, createdAt, likes)].forEach((key) =>
      expect(key).toBeInTheDocument()
    );
  });

  it("renders a differnt peep", async () => {
    const peep = [
      {
        username: "bar",
        body: "second peep",
        createdAt: new Date(2022, 10, 23),
        likes: ["id1", "id2"],
      },
    ];
    fetch.mockResponseOnce(JSON.stringify(peep));
    render(<App />);
    const username = await screen.findByText(/@bar/);
    const body = await screen.findByText(/second peep/);
    const createdAt = await screen.findByText(
      "Posted at Wed Nov 23 2022 00:00:00 GMT+0000 (Greenwich Mean Time)"
    );
    const likes = await screen.findByText(/♡ 2/);
    [(username, body, createdAt, likes)].forEach((key) =>
      expect(key).toBeInTheDocument()
    );
  });
});
