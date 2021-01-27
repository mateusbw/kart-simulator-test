import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRacingSettings,
  startRace,
  getRaceSettings,
  getRaceSimulation,
  getIsRunningSimulation,
  getRaceResult,
  getRacingErrorMessage,
  retryActon,
} from "./racing/racing";

class HookWraper {
  constructor() {
    this.dispatch = useDispatch();
  }

  useRacingSettingsReatriver() {
    const raceSettings = useSelector(getRaceSettings);
    useEffect(() => {
      this.dispatch(loadRacingSettings());
    }, [this.dispatch]);

    return raceSettings;
  }

  useStartRaceDispatch(
    simulation,
    onStartComponentcallback,
    onFinishComponentCallback
  ) {
    return this.dispatch(
      startRace(simulation, onStartComponentcallback, onFinishComponentCallback)
    );
  }

  useSimulationReatriver() {
    return useSelector(getRaceSimulation);
  }

  useIsRunningSimulationReatriver() {
    return useSelector(getIsRunningSimulation);
  }

  useRaceResultReatriver() {
    return useSelector(getRaceResult);
  }

  useRacingErrorReatriver() {
    return useSelector(getRacingErrorMessage);
  }

  useRetryErrorDispatch() {
    this.dispatch(retryActon());
  }
}

export default HookWraper;
