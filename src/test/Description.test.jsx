import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { act, cleanup, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { ComicContextProvider } from "../contexts/ComicContext";
import { Router } from "react-router-dom";
import { Description } from "../pages/Description";

jest.mock("axios");

const FavoriteScreen = () => {
  const history = createMemoryHistory(["/", "/description"]);
  return (
    <Router history={history}>
      <ComicContextProvider>
        <Description />
      </ComicContextProvider>
    </Router>
  );
};

describe("Description", () => {
  afterEach(cleanup);

  it("should change page when dont selected a hero", async () => {
    const history = createMemoryHistory([
      "/",
      "/description",
      "/comics/favorites",
    ]);
    await act(async () => {
      render(<FavoriteScreen />);
    });
    expect(history.location.pathname).toBe("/");
  });
});
