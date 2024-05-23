import { render, screen } from "@testing-library/react";
import SignUpForm from "./Components/SignUpForm";
import { MemoryRouter } from "react-router-dom";

describe("Text cases for app component", () => {
  test("renders SignUpForm component at root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SignUpForm />
      </MemoryRouter>
    );
    expect(screen.getByText(/SignUp/i)).toBeInTheDocument();
  });
});
