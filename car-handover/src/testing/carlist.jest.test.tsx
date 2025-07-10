import { render, screen } from "@testing-library/react";
import CarList from "../generalComps/lists/CarList";

describe("CarList", () => {
  it("renders car list table", () => {
    render(<CarList />);
    expect(screen.getByText(/Car/i)).toBeInTheDocument();
    expect(screen.getByText(/Model/i)).toBeInTheDocument();
  });
});
