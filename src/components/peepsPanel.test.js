import { render, screen } from "@testing-library/react";
import PeepsPanel from "./peepsPanel";

describe("PeepsPanel", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("renders a peep", async () => {
    const peeps = [
      {
        username: "foo",
        body: "first peep",
        createdAt: new Date(2022, 10, 11).toISOString(),
        likes: ["id1, id2"],
      },
    ];
    const mockSetPeeps = jest.fn();
    fetch.mockResponseOnce(JSON.stringify(peeps));
    render(<PeepsPanel peeps={peeps} setPeeps={mockSetPeeps} />);
    const username = await screen.findByText(/@foo/);
    const body = await screen.findByText(/first peep/);
    const createdAt = await screen.findByText(
      "Posted at Fri Nov 11 2022 00:00:00 GMT+0000 (Greenwich Mean Time)"
    );
    const likes = await screen.findByText(/♡ 1/);
    [(username, body, createdAt, likes)].forEach((key) =>
      expect(key).toBeInTheDocument()
    );
    expect(mockSetPeeps).toHaveBeenLastCalledWith(peeps);
  });

  it("renders a different peep", async () => {
    const peeps = [
      {
        username: "bar",
        body: "second peep",
        createdAt: new Date(2022, 10, 23).toISOString(),
        likes: ["id1", "id2"],
      },
    ];
    fetch.mockResponseOnce(JSON.stringify(peeps));
    const mockSetPeeps = jest.fn();
    render(<PeepsPanel peeps={peeps} setPeeps={mockSetPeeps} />);
    const username = await screen.findByText(/@bar/);
    const body = await screen.findByText(/second peep/);
    const createdAt = await screen.findByText(
      "Posted at Wed Nov 23 2022 00:00:00 GMT+0000 (Greenwich Mean Time)"
    );
    const likes = await screen.findByText(/♡ 2/);
    [(username, body, createdAt, likes)].forEach((key) =>
      expect(key).toBeInTheDocument()
    );
    expect(mockSetPeeps).toHaveBeenLastCalledWith(peeps);
  });

  it("renders several peeps", async () => {
    const peeps = [
      {
        username: "foo",
        body: "first peep",
        createdAt: new Date(2022, 10, 23).toISOString(),
        likes: ["id1, id2"],
      },
      {
        username: "bar",
        body: "second peep",
        createdAt: new Date(2022, 10, 11).toISOString(),
        likes: ["id1", "id2"],
      },
    ];
    const mockSetPeeps = jest.fn();
    fetch.mockResponseOnce(JSON.stringify(peeps));
    render(<PeepsPanel peeps={peeps} setPeeps={mockSetPeeps} />);
    await screen.findByText(/foo/);
    expect(screen.getByText(/foo/)).toBeInTheDocument();
    expect(screen.getByText(/first peep/)).toBeInTheDocument();
    expect(
      screen.getByText(
        "Posted at Wed Nov 23 2022 00:00:00 GMT+0000 (Greenwich Mean Time)"
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/♡ 1/)).toBeInTheDocument();
    expect(screen.getByText(/bar/)).toBeInTheDocument();
    expect(screen.getByText(/second peep/)).toBeInTheDocument();
    expect(
      screen.getByText(
        "Posted at Fri Nov 11 2022 00:00:00 GMT+0000 (Greenwich Mean Time)"
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/♡ 2/)).toBeInTheDocument();
  });
});
