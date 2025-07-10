import React from "react";
import { vi } from "vitest";
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));
import { render, screen } from "@testing-library/react";
import OrderList from "../generalComps/lists/OrderList";

// Set up localStorage before rendering
beforeEach(() => {
  localStorage.clear();
  // Add a mock user with orders
  const user = {
    email: "test@example.com",
    orders: [
      {
        id: "1",
        carPlate: "B-123-ABC",
        carId: 1,
        carModel: "Toyota Camry",
        carYear: "2020",
        status: "Pending",
        date: new Date().toISOString(),
      },
    ],
  };
  localStorage.setItem("currentUser", JSON.stringify(user));
  localStorage.setItem(
    "registeredUsers",
    JSON.stringify([
      user,
      // Optionally add more users here
    ]),
  );
});

describe("OrderList", () => {
  it("renders order list table", () => {
    render(<OrderList />);
    expect(screen.getByText(/My Car Orders/i)).toBeInTheDocument();
    // Use getByRole to specifically check the table header
    expect(
      screen.getByRole("columnheader", { name: /Car/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Toyota Camry/i)).toBeInTheDocument();
  });
});
