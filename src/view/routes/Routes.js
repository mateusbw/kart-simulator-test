import React from 'react';
import {Switch,BrowserRouter,Route, Redirect} from 'react-router-dom'
import RaceScore from '../pages/RaceScore/RaceScore';

import Setup from '../pages/Setup/Setup';
import ROUTER_PATHS from './RouterPaths';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={ROUTER_PATHS.HOME}>
                    <Redirect to={ROUTER_PATHS.SETUP}></Redirect>
                </Route>
                <Route exact path={ROUTER_PATHS.SETUP} component={Setup}></Route>
                <Route exact path={ROUTER_PATHS.SCORE} component={RaceScore}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
