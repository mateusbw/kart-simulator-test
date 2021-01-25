import produce from "immer";
import { RACING } from "../actionTypes";

const initialState = {
  isLoading: false,
  settings: {},
  simulation: {},
  error: undefined,
};

export const racingReducer = (state = initialState, action) => {
  switch (action.type) {
    case RACING.REQUEST_SETTINGS_FULFILLED:
      return produce(state, (draft) => {
        draft.isLoading = true;
        draft.settings = action.settings;
      });
    case RACING.START_RACE:
      return produce(state, (draft) => {
        draft.simulation = action.simulation;
      });
    default:
      return state;
  }
};

const requestRacingSettingPending = {
  type: RACING.REQUEST_SETTINGS_PEDING,
};

const requestRacingSettingFulfilled = (settings) => ({
  type: RACING.REQUEST_SETTINGS_FULFILLED,
  settings,
});

const requestRacingSettingError = (error) => ({
  type: RACING.REQUEST_SETTINGS_ERROR,
  error,
});

const startRaceSimulation = (simulation) => ({
  type: RACING.START_RACE,
  simulation,
});

export const loadRacingSettings = () => {
  return (dispatch, getState, container) => {
    dispatch(requestRacingSettingPending);

    container.getRacingSettings({
      onSuccess: (settings) =>
        dispatch(requestRacingSettingFulfilled(settings)),
      onError: (error) => dispatch(requestRacingSettingError(error)),
    });
  };
};

export const startRace = (simulation) => {
  return (dispatch, getState, container) => {
    return container.formatRacingStartSimulation(simulation, {
      onSuccess: (formatedSimulation) => {
        dispatch(startRaceSimulation(formatedSimulation));
        return { sucess: true };
      },
      onError: (error) => {
        dispatch(requestRacingSettingError(error));
        return { sucess: false };
      },
    });
  };
};

export const getRaceSettings = (state) => state.racing.settings;
export const getRaceSimulation = (state) => state.racing.simulation;
