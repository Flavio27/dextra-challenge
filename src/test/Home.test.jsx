import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import {
  act,
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { ComicContextProvider } from "../contexts/ComicContext";
import { Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { Home } from "../pages/Home";
import userEvent from "@testing-library/user-event";
import axios, { AxiosResponse } from "axios";


jest.mock("axios");



const HomeScreen = () => {
  const history = createMemoryHistory(["/", "/description"]);
  return (
    <Router history={history}>
      <ComicContextProvider>
        <Home />
      </ComicContextProvider>
    </Router>
  );
};

describe("Home", () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.mock("./__mocks__/axios");
  });

  it("should call a api when start", async () => {
    await act(async () => {
      render(<HomeScreen />);
    });
    expect(axios.get).toBeCalled();
  });

  it("should have a button next to get more comics from api", async () => {
    await act(async () => {
      render(<HomeScreen />);
    });
    const nextButton = await screen.findByTitle(/next\-arrow/i);
    expect(nextButton).toBeInTheDocument();
  });

  it("should call api for more comics when click next button", async () => {
    await act(async () => {
      render(<HomeScreen />);
    });

    const nextButton = await screen.findByTitle(/next\-arrow/i);
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(axios.get).toBeCalled();
  });

  it("should have a button previous to get more comics from api", async () => {
    await act(async () => {
      render(<HomeScreen />);
    });

    const previousButton = screen.getByTitle(/previous\-arrow/i);
    expect(previousButton).toBeInTheDocument();
    userEvent.click(previousButton);
    expect(axios.get).toBeCalled();
  });

  it("should call api for more comics when click back button", async () => {
    await act(async () => {
      render(<HomeScreen />);
    });
    const previousButton = screen.getByTitle(/previous\-arrow/i);
    expect(previousButton).toBeInTheDocument();
    userEvent.click(previousButton);
    expect(axios.get).toBeCalled();
  });

  it("should have a search bar in the screen", async () => {
    await act(async () => {
      render(<HomeScreen />);
    });
    const searchBox = screen.getByRole("textbox");
    expect(searchBox).toBeInTheDocument();
  });

});
