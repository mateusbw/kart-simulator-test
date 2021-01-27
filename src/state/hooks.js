import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRacingSettings,
  startRace,
  getRaceSettings,
  getRaceSimulation,
  getIsRunningSimulation,
  getRaceResult,
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
}

export default HookWraper;
