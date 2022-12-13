import Peep from "./peep";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Peep", () => {
  it("renders a peep", async () => {
    const peep = {
      _id: 1,
      username: "foo",
      body: "first peep",
      createdAt: new Date(2022, 10, 11).toISOString(),
      likes: [2],
    };
    const user = { _id: 1 };
    render(<Peep peep={peep} user={user} />);
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

  it("clicking the like button of an unliked peepchanges the heart icon to full", async () => {
    const peep = {
      _id: 1,
      username: "foo",
      body: "second peep",
      createdAt: new Date(2022, 10, 11).toISOString(),
      likes: [],
    };
    const user = { _id: 1 };
    fetch.mockResolvedValueOnce({ status: 201 });
    render(<Peep peep={peep} user={user} />);
    await userEvent.click(screen.getByTestId("peeps-likes-1"));
    await screen.findByText(/♥ 1/);
    expect(screen.getByText(/♥ 1/)).toBeInTheDocument();
  });

  it("clicking the like button of a liked peep changes the heart icon to empty", async () => {
    const peep = {
      _id: 1,
      username: "foo",
      body: "second peep",
      createdAt: new Date(2022, 10, 11).toISOString(),
      likes: [1],
    };
    const user = { _id: 1 };
    // fetch.mockResolvedValueOnce({ status: 201 });
    render(<Peep peep={peep} user={user} />);
    await userEvent.click(screen.getByTestId("peeps-likes-1"));
    await screen.findByText(/♡ 0/);
    expect(screen.getByText(/♡ 0/)).toBeInTheDocument();
  });
});
