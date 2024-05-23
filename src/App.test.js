import { render, screen } from "@testing-library/react";
import App from "./App";
import SignUpForm from "./Components/SignUpForm";
import Success from "./Components/Success";
import Login from "./Components/Login";
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
