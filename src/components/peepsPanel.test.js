import { render, screen } from "@testing-library/react";
import PeepsPanel from "./peepsPanel";
import userEvent from "@testing-library/user-event";

describe("PeepsPanel", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("renders a peep", async () => {
    const peeps = [
      {
        _id: 1,
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
        _id: 1,
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
        _id: 2,
        username: "foo",
        body: "first peep",
        createdAt: new Date(2022, 10, 23).toISOString(),
        likes: ["id1, id2"],
      },
      {
        _id: 1,
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

  it("refreshes the feed", async () => {
    const peeps = [
      {
        _id: 1,
        username: "bar",
        body: "second peep",
        createdAt: new Date(2022, 10, 11).toISOString(),
        likes: ["id1", "id2"],
      },
    ];
    const newPeeps = [
      {
        _id: 2,
        username: "foo",
        body: "first peep",
        createdAt: new Date(2022, 10, 23).toISOString(),
        likes: ["id1, id2"],
      },
      {
        _id: 1,
        username: "bar",
        body: "second peep",
        createdAt: new Date(2022, 10, 11).toISOString(),
        likes: ["id1", "id2"],
      },
    ];
    const mockSetPeeps = jest.fn();
    fetch
      .mockResponseOnce(JSON.stringify(peeps))
      .mockResponseOnce(JSON.stringify(newPeeps));
    render(<PeepsPanel peeps={peeps} setPeeps={mockSetPeeps} />);
    await userEvent.click(screen.getByRole("button", { name: "refresh feed" }));
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(mockSetPeeps).toHaveBeenCalledTimes(2);
  });

  it("clicking the like button changes the heart icon", async () => {
    const peeps = [
      {
        _id: 1,
        username: "foo",
        body: "second peep",
        createdAt: new Date(2022, 10, 11).toISOString(),
        likes: [],
      },
    ];
    const mockSetPeeps = jest.fn();
    fetch
      .mockResponseOnce(JSON.stringify(peeps))
      .mockResolvedValueOnce({ status: 201 });
    render(<PeepsPanel peeps={peeps} setPeeps={mockSetPeeps} />);
    await userEvent.click(screen.getByTestId("peeps-likes-1"));
    expect(mockSetPeeps).toHaveBeenCalled();
  });
});
