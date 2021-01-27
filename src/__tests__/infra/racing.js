import racingRepository from "../../infra/racing";

import checkpoints from "../__mocks__/checkpointsMock.json";

describe("Racing Repository", () => {
  describe("formatRacingStartSimulation", () => {
    it("should format race start somulation", () => {
      expect(
        racingRepository({}).formatRacingStartSimulation({
          lapes: 10,
          cars: {
            "600f7c6f-369f-4fef-acc4-ea61a9416ea1": "Rubinho",
            "600f7c6f-369f-4fef-acc4-ea61a9416ea2": "Felipe Massa",
          },
        })
      ).toEqual([
        {
          carId: "600f7c6f-369f-4fef-acc4-ea61a9416ea1",
          racerName: "Rubinho",
          totalLapes: 10,
          currentLape: 0,
          currentSpeed: 0,
          averageSpeed: 0,
          travelledDistance: 0,
          time: 0,
          startingGrid: 1,
        },
        {
          carId: "600f7c6f-369f-4fef-acc4-ea61a9416ea2",
          racerName: "Felipe Massa",
          totalLapes: 10,
          currentLape: 0,
          currentSpeed: 0,
          averageSpeed: 0,
          travelledDistance: 0,
          time: 0,
          startingGrid: 2,
        },
      ]);
    });
  });
  describe("formatCheckpoints", () => {
    it("should format checkpoints correctly", () => {
      expect(racingRepository({}).formatCheckpoints(checkpoints)).toEqual({
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
