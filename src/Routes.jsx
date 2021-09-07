import { Route, BrowserRouter, Switch } from "react-router-dom";
import { ComicContextProvider } from "./contexts/ComicContext";
import { Description } from "./pages/Description";
import { Favorite } from "./pages/Favorite";
import { Home } from "./pages/Home";

function Routes() {
  return (
    <BrowserRouter>
      <ComicContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/description" component={Description} />
          <Route path="/comics/favorites" component={Favorite} />
          <Route component={Home} />
        </Switch>
      </ComicContextProvider>
    </BrowserRouter>
  );
}

export { Routes };
