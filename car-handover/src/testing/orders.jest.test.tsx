import { render, screen } from "@testing-library/react";
import OrderList from "../generalComps/lists/OrderList";

describe("OrderList", () => {
  it("renders order list table", () => {
    render(<OrderList />);
    expect(screen.getByText(/My Car Orders/i)).toBeInTheDocument();
    expect(screen.getByText(/Car/i)).toBeInTheDocument();
  });
});
