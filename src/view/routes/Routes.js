import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import ROUTER_PATHS from "./RouterPaths";

import Setup from "../pages/Setup/Setup";
import Simulation from "../pages/Simulation/Simulation";
import Results from "../pages/Results/Results";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTER_PATHS.HOME}>
          <Redirect to={ROUTER_PATHS.SETUP} />
        </Route>
        <Route exact path={ROUTER_PATHS.SETUP} component={Setup} />
        <Route exact path={ROUTER_PATHS.SIMULATION} component={Simulation} />
        <Route exact path={ROUTER_PATHS.RESULTS} component={Results} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
