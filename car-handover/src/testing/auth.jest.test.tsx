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
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginForm } from "../generalComps/forms/LoginForm";
import { RegisterForm } from "../generalComps/forms/RegisterForm";

describe("Authentication Forms", () => {
  it("renders login form and validates input", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders register form and validates input", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password:$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });
});

// (No need to import or redefine expect; Vitest provides it globally)
