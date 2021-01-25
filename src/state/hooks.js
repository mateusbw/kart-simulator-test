import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRacingSettings,
  startRace,
  getRaceSettings,
  getRaceSimulation,
  getIsRunningSimulation,
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

  useStartRaceDispatch(simulation) {
    return this.dispatch(startRace(simulation));
  }

  useSimulationReatriver() {
    return useSelector(getRaceSimulation);
  }

  useIsRunningSimulationReatriver() {
    return useSelector(getIsRunningSimulation);
  }
}

export default HookWraper;
