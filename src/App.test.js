import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the Chitter Header", () => {
    expect.assertions(1);
    render(<App />);
    const linkElement = screen.getByText(/Chitter/);
    expect(linkElement).toBeInTheDocument();
  });
});
