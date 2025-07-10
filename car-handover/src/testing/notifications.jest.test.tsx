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
import NotificationsList from "../generalComps/lists/NotificationsList";

describe("NotificationsList", () => {
  it("renders notifications list", () => {
    render(<NotificationsList />);
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
  });
});
