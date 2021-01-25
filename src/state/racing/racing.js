import produce from "immer";
import { RACING } from "../actionTypes";

const initialState = {
  isLoading: false,
  isRuningSimulation: false,
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
        draft.isRuningSimulation = true;
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

export const getRaceSettings = (state) => state.racing.settings;
export const getRaceSimulation = (state) => state.racing.simulation;
export const getIsRunningSimulation = (state) =>
  state.racing.isRuningSimulation;

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
    container.startRacingSimulation(
      { simulation, settings: getRaceSettings(getState()) },
      {
        onSuccess: (formatedSimulation) => {
          dispatch(startRaceSimulation(formatedSimulation));
        },
        onError: (error) => {
          dispatch(requestRacingSettingError(error));
        },
      }
    );
  };
};
