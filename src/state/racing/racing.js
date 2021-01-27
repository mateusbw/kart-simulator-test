import produce from "immer";
import { RACING } from "../actionTypes";

const initialState = {
  isLoading: false,
  isRuningSimulation: false,
  settings: {},
  simulation: [],
  result: "",
  error: undefined,
};

export const racingReducer = (state = initialState, action) => {
  switch (action.type) {
    case RACING.REQUEST_SETTINGS_FULFILLED:
      return produce(state, (draft) => {
        draft.isLoading = true;
        draft.settings = action.settings;
      });
    case RACING.REQUEST_REQUEST_ERROR:
      return produce(state, (draft) => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    case RACING.START_RACE:
      return produce(state, (draft) => {
        draft.isRuningSimulation = true;
        draft.simulation = action.simulation;
      });
    case RACING.UPDATE_SIMULATION:
      return produce(state, (draft) => {
        draft.simulation = action.simulation;
      });
    case RACING.STOP_SIMULATION:
      return produce(state, (draft) => {
        draft.isRuningSimulation = false;
        draft.result = action.result;
      });
    case RACING.RETRY_ACTION:
      return produce(state, (draft) => {
        delete draft.error;
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

const requestRacingError = (error) => ({
  type: RACING.REQUEST_REQUEST_ERROR,
  error,
});

const startRaceSimulation = (simulation) => ({
  type: RACING.START_RACE,
  simulation,
});

const updateSimulation = (simulation) => ({
  type: RACING.UPDATE_SIMULATION,
  simulation,
});

const stopSimulation = (result) => ({
  type: RACING.STOP_SIMULATION,
  result,
});

const retryAction = {
  type: RACING.RETRY_ACTION,
};

export const getRaceSettings = (state) => state.racing.settings;
export const getRaceSimulation = (state) => state.racing.simulation;
export const getIsRunningSimulation = (state) =>
  state.racing.isRuningSimulation;
export const getRaceResult = (state) => state.racing.result;
export const getRacingErrorMessage = (state) =>
  state.racing.error && state.racing.error.message;

// eslint-disable-next-line import/no-mutable-exports
export let retryActon;

export const loadRacingSettings = () => {
  return (dispatch, getState, container) => {
    dispatch(requestRacingSettingPending);

    container.getRacingSettings({
      onSuccess: (settings) =>
        dispatch(requestRacingSettingFulfilled(settings)),
      onError: (error) => {
        dispatch(requestRacingError(error, loadRacingSettings));
        retryActon = () => {
          return (dispatchRetry) => {
            dispatchRetry(retryAction);
            dispatchRetry(loadRacingSettings());
          };
        };
      },
    });
  };
};

export const finishRaceSimulation = (partials, onFinishComponentCallback) => {
  return (dispatch, getState, container) => {
    container.stopRacingSimulation(
      { partials },
      {
        onFinishing: (result) => {
          onFinishComponentCallback();
          dispatch(stopSimulation(result));
        },
        onError: (error) => {
          dispatch(requestRacingError(error));
          retryActon = () => {
            return (dispatchRetry) => {
              dispatchRetry(retryAction);
              dispatchRetry(
                finishRaceSimulation(partials, onFinishComponentCallback)
              );
            };
          };
        },
      }
    );
  };
};

export const startCheckpointPooling = (
  racingSimulation,
  onFinishComponentCallback
) => {
  return (dispatch, getState, container) => {
    const settings = getRaceSettings(getState());
    container.checkpointsPoolingHandler(
      { racingSimulation, settings },
      {
        onSucessPolling: (partials) => {
          dispatch(updateSimulation(partials));
        },
        onFinishedPooling: (partials) => {
          dispatch(finishRaceSimulation(partials, onFinishComponentCallback));
        },
        onError: (error) => {
          dispatch(requestRacingError(error));
          retryActon = () => {
            return (dispatchRetry) => {
              dispatchRetry(retryAction);
              dispatchRetry(
                startCheckpointPooling(
                  racingSimulation,
                  onFinishComponentCallback
                )
              );
            };
          };
        },
      }
    );
  };
};

export const startRace = (
  simulation,
  onStartComponentcallback,
  onFinishComponentCallback
) => {
  return (dispatch, getState, container) => {
    const settings = getRaceSettings(getState());
    container.startRacingSimulation(
      { simulation, settings },
      {
        onSuccessStart: (formatedSimulation) => {
          dispatch(startRaceSimulation(formatedSimulation));
          onStartComponentcallback();
          dispatch(
            startCheckpointPooling(
              formatedSimulation,
              onFinishComponentCallback
            )
          );
        },
        onError: (error) => {
          dispatch(requestRacingError(error));
          retryActon = () => {
            return (dispatchRetry) => {
              dispatchRetry(retryAction);
              dispatchRetry(
                startRace(
                  simulation,
                  onStartComponentcallback,
                  onFinishComponentCallback
                )
              );
            };
          };
        },
      }
    );
  };
};
