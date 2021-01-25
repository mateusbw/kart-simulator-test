import * as kartRacingApiService from "./services/kartRacing/kartRacingApiService";
import createRacingRepository from "./infra/racing";
import createGetRacingSettings from "./app/racing/getRacingSettings";
import createFormatRacingStartSimulation from "./app/racing/formatRacingStartSimulation";

const racingRepository = createRacingRepository({
  kartRacingApiService,
});

export const getRacingSettings = createGetRacingSettings({
  racingRepository,
});

export const formatRacingStartSimulation = createFormatRacingStartSimulation({
  racingRepository,
});
