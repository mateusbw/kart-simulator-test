import racingRepository from "../../infra/racing";
import settings from "../__mocks__/settingsMock.json";
import simulation from "../__mocks__/simulationMock.json";
import checkpoints from "../__mocks__/checkpointsMock.json";
import { calculateRacePartials, formatResult } from "../../domain/Race/Race";

describe("Domain > Race", () => {
  describe("Calculate Race Partials", () => {
    it("should calculate race partials correctly", () => {
      const formatedCheckpoints = racingRepository({}).formatCheckpoints(
        checkpoints
      );
      expect(
        calculateRacePartials(formatedCheckpoints, settings, simulation)
      ).toEqual([
        {
          carId: "600f7c6f-369f-4fef-acc4-ea61a9416ead",
          averageSpeed: 50,
          currentLape: 1,
          currentSpeed: 52,
          isFinished: false,
          racerName: "A",
          time: 80781,
          totalLapes: "10",
          travelledDistance: 1130,
          bestLap: { time: 80781, lap: 1 },
        },
        {
          carId: "11fa369a-d5a6-4979-942d-9f139670ce6c",
          averageSpeed: 51,
          currentLape: 0,
          currentSpeed: 49,
          isFinished: false,
          racerName: "C",
          time: 63854,
          totalLapes: "10",
          travelledDistance: 900,
          bestLap: { time: 0, lap: 0 },
        },
        {
          carId: "fcf3b1bd-5110-4c2e-9ec8-5e62308c2675",
          averageSpeed: 49,
          currentLape: 0,
          currentSpeed: 49,
          isFinished: false,
          racerName: "B",
          time: 65595,
          totalLapes: "10",
          travelledDistance: 900,
          bestLap: { time: 0, lap: 0 },
        },
      ]);
    });
  });

  describe("Format Result", () => {
    it("should format the result", () => {
      expect(
        formatResult([
          {
            carId: "11fa369a-d5a6-4979-942d-9f139670ce6c",
            averageSpeed: 51,
            currentLape: 10,
            totalLapes: 10,
            isFinished: true,
            currentSpeed: 49,
            racerName: "Leanne Hills",
            time: 63854,
            travelledDistance: 1130,
            startingGrid: 1,
            bestLap: { time: 63854, lap: 5 },
          },
          {
            carId: "fcf3b1bd-5110-4c2e-9ec8-5e62308c2675",
            averageSpeed: 49,
            currentLape: 10,
            totalLapes: 10,
            isFinished: true,
            currentSpeed: 49,
            racerName: "Brandi Hauck",
            time: 65595,
            travelledDistance: 1130,
            startingGrid: 3,
            bestLap: { time: 65595, lap: 8 },
          },
          {
            carId: "600f7c6f-369f-4fef-acc4-ea61a9416ead",
            averageSpeed: 50,
            currentLape: 10,
            totalLapes: 10,
            isFinished: true,
            currentSpeed: 52,
            racerName: "Major Beier",
            time: 80781,
            travelledDistance: 1130,
            startingGrid: 2,
            bestLap: { time: 80781, lap: 3 },
          },
        ])
      ).toMatch(
        `Automobile,Name,TotalLaps,TotalTime,BestLap,TimeBestLap,Diff,Gap,StartingGrid,AverageVelocity
11fa369a-d5a6-4979-942d-9f139670ce6c,Leanne Hills,10,01:03:854,5,01:03:854,null,null,1,51
fcf3b1bd-5110-4c2e-9ec8-5e62308c2675,Brandi Hauck,10,01:05:595,8,01:05:595,00:01:741,00:01:741,3,49
600f7c6f-369f-4fef-acc4-ea61a9416ead,Major Beier,10,01:20:781,3,01:20:781,00:16:927,00:15:186,2,50`
      );
    });
  });
});
