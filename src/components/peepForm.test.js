import { render, screen } from "@testing-library/react";
import PeepForm from "./peepForm";

describe("PeepForm", () => {
  it("renders the options", () => {
    render(<PeepForm />);
    expect(
      screen.getByPlaceholderText("Enter your peep here")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "peep!" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "log off" })).toBeInTheDocument();
    expect(
      screen.getByText("What would you like to Peep?")
    ).toBeInTheDocument();
  });
});
