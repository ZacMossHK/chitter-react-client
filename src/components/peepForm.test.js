import { render, screen } from "@testing-library/react";
import PeepForm from "./peepForm";
import userEvent from "@testing-library/user-event";

describe("PeepForm", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("renders the options", () => {
    render(<PeepForm user={{ _id: 1, username: "foo" }} />);
    expect(
      screen.getByPlaceholderText("Enter your peep here")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "peep!" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "log off" })).toBeInTheDocument();
    expect(
      screen.getByText("What would you like to Peep?")
    ).toBeInTheDocument();
  });

  it("creates a new Peep", async () => {
    const setPeeps = jest.fn();
    const peeps = [{ body: "foobar" }];
    fetch.mockResponseOnce(JSON.stringify({ body: "hello world" }));
    render(
      <PeepForm
        user={{ _id: 1, username: "foo" }}
        setPeeps={setPeeps}
        peeps={peeps}
      />
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Enter your peep here/),
      "hello world"
    );
    await userEvent.click(screen.getByRole("button", { name: "peep!" }));
    expect(setPeeps).toHaveBeenCalledWith([
      { body: "hello world" },
      { body: "foobar" },
    ]);
  });

  it("logs a user out", async () => {
    const setUser = jest.fn();
    fetch.mockResolvedValue({ status: 204 });
    render(<PeepForm setUser={setUser} user={{ _id: 1, username: "foo" }} />);
    await userEvent.click(screen.getByRole("button", { name: "log off" }));
    expect(setUser).toHaveBeenCalledWith(null);
  });
});
