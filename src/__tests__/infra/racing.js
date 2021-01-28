import makeRacingRepository from "../../infra/racing";

import checkpoints from "../__mocks__/checkpointsMock.json";
import settings from "../__mocks__/settingsMock.json";

let racingRepository;
let kartRacingApiService;

const raceStartSimulation = {
  lapes: 10,
  cars: {
    "600f7c6f-369f-4fef-acc4-ea61a9416ea1": "Rubinho",
    "600f7c6f-369f-4fef-acc4-ea61a9416ea2": "Felipe Massa",
  },
};

describe("Infra > Racing Repository", () => {
  describe("getRacingSetting", () => {
    it("should use kartRacingApiService to make the request", async () => {
      kartRacingApiService = {
        get: jest.fn().mockReturnValue(settings),
      };

      racingRepository = makeRacingRepository({ kartRacingApiService });

      await racingRepository.getRacingSetting();

      expect(kartRacingApiService.get).toBeCalledWith("settings");
    });
  });
  describe("startRacingSimulation", () => {
    it("should use kartRacingApiService to make the request", async () => {
      kartRacingApiService = {
        post: jest.fn().mockReturnValue({ status: "success" }),
      };

      racingRepository = makeRacingRepository({ kartRacingApiService });

      await racingRepository.startRacingSimulation(raceStartSimulation);

      expect(kartRacingApiService.post).toBeCalledWith("start");
    });
  });
  describe("getRacingCheckPoints", () => {
    it("should use kartRacingApiService to make the request", async () => {
      kartRacingApiService = {
        get: jest.fn().mockReturnValue({ payload: checkpoints }),
      };

      racingRepository = makeRacingRepository({ kartRacingApiService });

      await racingRepository.getRacingCheckPoints();

      expect(kartRacingApiService.get).toBeCalledWith("checkpoints");
    });
  });
  describe("stopRacingSimulation", () => {
    it("should use kartRacingApiService to make the request", async () => {
      kartRacingApiService = {
        post: jest.fn().mockReturnValue({ status: "success" }),
      };

      racingRepository = makeRacingRepository({ kartRacingApiService });

      await racingRepository.stopRacingSimulation();

      expect(kartRacingApiService.post).toBeCalledWith("stop");
    });
  });

  describe("formatRacingStartSimulation", () => {
    it("should format race start somulation", () => {
      expect(
        makeRacingRepository({}).formatRacingStartSimulation(
          raceStartSimulation
        )
      ).toEqual([
        {
          carId: "600f7c6f-369f-4fef-acc4-ea61a9416ea1",
          racerName: "Rubinho",
          totalLapes: 10,
          startingGrid: 1,
        },
        {
          carId: "600f7c6f-369f-4fef-acc4-ea61a9416ea2",
          racerName: "Felipe Massa",
          totalLapes: 10,
          startingGrid: 2,
        },
      ]);
    });
  });
  describe("formatCheckpoints", () => {
    it("should format checkpoints correctly", () => {
      expect(makeRacingRepository({}).formatCheckpoints(checkpoints)).toEqual({
        "600f7c6f-369f-4fef-acc4-ea61a9416ead": [
          { position: 0, timestamp: 1611608221275 },
          { position: 130, timestamp: 1611608230429 },
          { position: 200, timestamp: 1611608235467 },
          { position: 400, timestamp: 1611608249841 },
          { position: 500, timestamp: 1611608256996 },
          { position: 710, timestamp: 1611608272009 },
          { position: 900, timestamp: 1611608285778 },
          { position: 0, timestamp: 1611608302056 },
        ],
        "fcf3b1bd-5110-4c2e-9ec8-5e62308c2675": [
          { position: 0, timestamp: 1611608222862 },
          { position: 130, timestamp: 1611608232550 },
          { position: 200, timestamp: 1611608237592 },
          { position: 400, timestamp: 1611608252282 },
          { position: 500, timestamp: 1611608259300 },
          { position: 710, timestamp: 1611608274832 },
          { position: 900, timestamp: 1611608288457 },
        ],
        "11fa369a-d5a6-4979-942d-9f139670ce6c": [
          { position: 0, timestamp: 1611608224185 },
          { position: 130, timestamp: 1611608233526 },
          { position: 200, timestamp: 1611608238330 },
          { position: 400, timestamp: 1611608252493 },
          { position: 500, timestamp: 1611608259541 },
          { position: 710, timestamp: 1611608274303 },
          { position: 900, timestamp: 1611608288039 },
        ],
      });
    });
  });
});
