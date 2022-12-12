import Peep from "./peep";
import { render, screen } from "@testing-library/react";

describe("Peep", () => {
  it("renders a peep", async () => {
    const peep = {
      _id: 1,
      username: "foo",
      body: "first peep",
      createdAt: new Date(2022, 10, 11).toISOString(),
      likes: ["id1, id2"],
    };
    const mockSetPeeps = jest.fn();
    fetch.mockResponseOnce(JSON.stringify(peep));
    render(<Peep peep={peep} setPeeps={mockSetPeeps} />);
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
});
