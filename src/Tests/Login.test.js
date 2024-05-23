import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../Components/Login";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Test cases for Login Component", () => {
  let mockAxios;
  const navigate = jest.fn();

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    mockedNavigate.mockReset();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test("renders login form", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("validates empty form submission", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByText("Sign In"));

    expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });
});
