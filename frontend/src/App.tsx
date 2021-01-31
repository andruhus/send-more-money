import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import {
  homeRouting,
  interactiveRouting,
  listRouting,
} from "./constant/routes";
import { MainPage } from "./page/MainPage";
import { ListPage } from "./page/ListPage";
import { InteractivePage } from "./page/InteractivePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={homeRouting} exact component={MainPage} />
        <Route path={listRouting} exact component={ListPage} />
        <Route path={interactiveRouting} exact component={InteractivePage} />
        <Route path={"*"}>
          <Redirect to={homeRouting} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
