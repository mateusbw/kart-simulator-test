/* @flow */
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as container from "../container"

import { racingReducer } from "./racing/racing";

const reducers = combineReducers({
  racing: racingReducer,
});

const initialState = {

}

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(container))
    )
)

export default store;
