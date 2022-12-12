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
      likes: ["id1, id2"],
    };
    render(<Peep peep={peep} />);
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

  it("clicking the like button changes the heart icon", async () => {
    const peep = {
      _id: 1,
      username: "foo",
      body: "second peep",
      createdAt: new Date(2022, 10, 11).toISOString(),
      likes: [],
    };
    fetch.mockResolvedValueOnce({ status: 201 });
    render(<Peep peep={peep} />);
    await userEvent.click(screen.getByTestId("peeps-likes-1"));
    await screen.findByText(/♥ 1/);
    expect(screen.getByText(/♥/)).toBeInTheDocument();
  });
});
