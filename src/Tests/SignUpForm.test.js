import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUpForm from "../Components/SignUpForm";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Test Cases for SignUpForm component", () => {
  let mockAxios;
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test("renders sign up form", () => {
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  test("validates empty form submission", () => {
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    fireEvent.click(screen.getByText("SignUp"));

    expect(screen.getByText("Username is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  test("validates incorrect email format", () => {
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByText(/SignUp/i));

    expect(screen.getByText("Email address is invalid")).toBeInTheDocument();
  });

  test("validates password match", () => {
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "ValidPass1!" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "DifferentPass1!" },
    });
    fireEvent.click(screen.getByText(/SignUp/i));

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });
});
