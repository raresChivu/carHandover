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
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });
});
