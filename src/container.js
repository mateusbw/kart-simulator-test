import * as kartRacingApiService from "./services/kartRacing/kartRacingApiService";
import createRacingRepository from "./infra/racing";
import createGetRacingSettings from "./app/racing/getRacingSettings";
import createStartRacingSimulation from "./app/racing/startRacingSimulation";

const racingRepository = createRacingRepository({
  kartRacingApiService,
});

export const getRacingSettings = createGetRacingSettings({
  racingRepository,
});

export const startRacingSimulation = createStartRacingSimulation({
  racingRepository,
});
