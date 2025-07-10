import { render, screen } from "@testing-library/react";
import Loading from "../generalComps/Loading";

describe("Loading", () => {
  it("renders loading spinner and text", () => {
    render(<Loading />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
