import * as kartRacingApiService from "./services/kartRacing/kartRacingApiService";
import createRacingRepository from "./infra/racing";
import createGetRacingSettings from "./app/racing/getRacingSettings";

const racingRepository = createRacingRepository({
  kartRacingApiService,
});

export const getRacingSettings = createGetRacingSettings({
  racingRepository,
});
