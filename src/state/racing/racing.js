import { RACING } from "../actionTypes";

const initialState = {
    isLoading: false,
    data:[],
    error: undefined,
}

export const racingReducer = (state = initialState, action) => {
    switch (action.type){
        case RACING.REQUEST_SETTINGS_FULFILLED:
            return {
                ...state,
                isLoading: true,
                data: action.settings,
            }
        default:
            return state;
    }
}

export const loadRacingSettings = () => {
    return (dispatch, getState, container) => {
        dispatch(requestRacingSettingPending);
    
        container.getRacingSettings({
          onSuccess: (settings) => dispatch(requestRacingSettingFulfilled(settings)),
          onError: (error) => dispatch(requestRacingSettingError(error))
        });
      };
}

const requestRacingSettingPending = {
    type: RACING.REQUEST_SETTINGS_PEDING
};

const requestRacingSettingFulfilled = (settings) => ({
    type: RACING.REQUEST_SETTINGS_FULFILLED,
    settings
});

const requestRacingSettingError = (error) => ({
    type: RACING.REQUEST_SETTINGS_ERROR
});


export const getRaceSettings = (state) => state.racing.data;