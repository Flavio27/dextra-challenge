import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import {
  act,
  cleanup,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { ComicContextProvider } from "../contexts/ComicContext";
import { Router } from "react-router-dom";
import { Favorite } from "../pages/Favorite";
import userEvent from "@testing-library/user-event";

jest.mock("axios");

const FavoriteScreen = () => {
  const history = createMemoryHistory(["/", "/description"]);
  return (
    <Router history={history}>
      <ComicContextProvider>
        <Favorite />
      </ComicContextProvider>
    </Router>
  );
};

describe("Favorite", () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.mock("./__mocks__/axios");
  });

  it("should have a search bar in the screen", async () => {
    await act(async () => {
      render(<FavoriteScreen />);
    });
    const searchBox = screen.getByRole("textbox");
    expect(searchBox).toBeInTheDocument();
  });

  it("should have a img if dont have favorites yet", async () => {
    await act(async () => {
      render(<FavoriteScreen />);
    });
    const imgDeadpool = screen.getByRole("img", { name: /deadpool/i });
    expect(imgDeadpool).toBeInTheDocument();
  });

  it("should change page when click on back page link", async () => {
    const history = createMemoryHistory([
      "/",
      "/description",
      "/comics/favorites",
    ]);
    await act(async () => {
      render(<FavoriteScreen />);
    });
    const backLink = screen.getByRole("link", { name: /back to the comics/i });
    expect(backLink).toBeInTheDocument();
    userEvent.click(backLink);
    expect(history.location.pathname).toBe("/");
  });

  it("should search a hero name when write in search bar", async () => {
    await act(async () => {
      render(<FavoriteScreen />);
    });
    const searchBox = screen.getByRole("textbox");
    expect(searchBox).toBeInTheDocument();
    fireEvent.change(searchBox, { target: { value: "thor" } });
    expect(searchBox.value).toBe("thor");
  });
});
