import { render, screen } from "@testing-library/react";
import NotificationsList from "../generalComps/lists/NotificationsList";

describe("NotificationsList", () => {
  it("renders notifications list", () => {
    render(<NotificationsList />);
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
  });
});
