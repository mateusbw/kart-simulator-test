import * as kartRacingApiService from "./services/kartRacing/kartRacingApiService";
import createRacingRepository from "./infra/racing";
import createGetRacingSettings from "./app/racing/getRacingSettings";
import createStartRacingSimulation from "./app/racing/startRacingSimulation";
import createCheckpointsPoolingHandler from "./app/racing/checkpointsPoolingHandler";
import createStopRacingSimulation from "./app/racing/stopRacingSimulation";

const racingRepository = createRacingRepository({
  kartRacingApiService,
});

export const getRacingSettings = createGetRacingSettings({
  racingRepository,
});

export const startRacingSimulation = createStartRacingSimulation({
  racingRepository,
});

export const checkpointsPoolingHandler = createCheckpointsPoolingHandler({
  racingRepository,
});

export const stopRacingSimulation = createStopRacingSimulation({
  racingRepository,
});
