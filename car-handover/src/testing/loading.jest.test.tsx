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
import Loading from "../generalComps/Loading";

describe("Loading", () => {
  it("renders loading spinner and text", () => {
    render(<Loading />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
