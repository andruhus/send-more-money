import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import {
  homeRouting,
  interactiveRouting,
  puzzleListRouting,
} from "./constant/routes";
import { MainPage } from "./page/MainPage";
import { PuzzleListPage } from "./page/PuzzleListPage";
import { InteractivePage } from "./page/InteractivePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={homeRouting} exact component={MainPage} />
        <Route path={puzzleListRouting} exact component={PuzzleListPage} />
        <Route
          path={`${interactiveRouting}/:questionId`}
          exact
          component={InteractivePage}
        />
        <Route path={"*"}>
          <Redirect to={homeRouting} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
