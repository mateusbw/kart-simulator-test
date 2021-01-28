import racingRepository from "../../infra/racing";
import settings from "../__mocks__/settingsMock.json";
import simulation from "../__mocks__/simulationMock.json";
import checkpoints from "../__mocks__/checkpointsMock.json";
import {
  calculateRacePartials,
  formatResult,
  isRaceFinished,
  calculateTime,
  calculateCurrentLape,
  calculateTravelledDistance,
  calculateCurrentSpeed,
} from "../../domain/Race/Race";

describe("Domain > Race", () => {
  describe("calculateTime", () => {
    describe("Null Checkpoints", () => {
      it("should return 0", () => {
        expect(calculateTime()).toEqual(0);
      });
    });

    describe("1 Checkpoints", () => {
      it("should return 0", () => {
        expect(
          calculateTime([{ racerName: "A", timestamp: 1611608234354 }])
        ).toEqual(0);
      });
    });

    describe("More than 1 Checkpoints", () => {
      it("should time between first and last checkpoint", () => {
        expect(
          calculateTime([
            { racerName: "A", timestamp: 1611608232550 },
            { racerName: "A", timestamp: 1611608234355 },
            { racerName: "A", timestamp: 1611608234354 },
          ])
        ).toEqual(1804);
      });
    });
  });

  describe("calculateCurrentLape", () => {
    describe("Undefined Checkpoints", () => {
      it("should return 0", () => {
        expect(
          calculateCurrentLape(undefined, {
            checkpoints: [0, 10, 20, 30],
          })
        ).toEqual(0);
      });
    });
    it("should return the current/total of lapes done by racer", () => {
      expect(
        calculateCurrentLape([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], {
          checkpoints: [0, 10, 20, 30],
        })
      ).toEqual(2);
    });
  });

  describe("calculateTravelledDistance", () => {
    describe("Undefined Checkpoints", () => {
      it("should return 0", () => {
        expect(
          calculateTravelledDistance(undefined, {
            checkpoints: [0, 10, 20, 30],
          })
        ).toEqual(0);
      });
    });

    it("should distance between first and last checkpoint", () => {
      expect(
        calculateTravelledDistance(
          [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
          {
            checkpoints: [0, 10, 20, 30],
            track_length: 50,
          }
        )
      ).toEqual(120);
    });
  });

  describe("calculateCurrentSeed", () => {
    describe("Null Checkpoints", () => {
      it("should return 0", () => {
        expect(calculateCurrentSpeed(undefined, 0)).toEqual(0);
      });
    });

    describe("1 Checkpoint", () => {
      it("should return 0", () => {
        expect(calculateCurrentSpeed([{}], 0)).toEqual(0);
      });
    });

    it("should return speed of last checkpoints", () => {
      expect(
        calculateCurrentSpeed(
          [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            { position: 10, timestamp: 1611608232550 },
            { position: 20, timestamp: 1611608234354 },
          ],
          {
            checkpoints: [0, 10, 20, 30],
            track_length: 50,
          }
        )
      ).toEqual("20.0");
    });
  });

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
          averageSpeed: "50.4",
          currentLape: 1,
          currentSpeed: "50.9",
          isFinished: false,
          racerName: "A",
          time: 80781,
          totalLapes: "10",
          travelledDistance: 1130,
          bestLap: { time: 80781, lap: 1 },
          startingGrid: 1,
        },
        {
          carId: "11fa369a-d5a6-4979-942d-9f139670ce6c",
          averageSpeed: "50.7",
          currentLape: 0,
          currentSpeed: "49.8",
          isFinished: false,
          racerName: "C",
          time: 63854,
          totalLapes: "10",
          travelledDistance: 900,
          bestLap: { time: 0, lap: 0 },
          startingGrid: 3,
        },
        {
          carId: "fcf3b1bd-5110-4c2e-9ec8-5e62308c2675",
          averageSpeed: "49.4",
          currentLape: 0,
          currentSpeed: "50.2",
          isFinished: false,
          racerName: "B",
          time: 65595,
          totalLapes: "10",
          travelledDistance: 900,
          bestLap: { time: 0, lap: 0 },
          startingGrid: 2,
        },
      ]);
    });
  });

  describe("Is Race Finished", () => {
    describe("Finished race", () => {
      const finishedRace = [
        { racerName: "A", isFinished: true },
        { racerName: "B", isFinished: true },
        { racerName: "C", isFinished: true },
      ];

      it("should return true", () => {
        expect(isRaceFinished(finishedRace)).toBeTruthy();
      });
    });

    describe("Unfinished race", () => {
      const unfinishedRace = [
        { racerName: "A", isFinished: true },
        { racerName: "B", isFinished: false },
        { racerName: "C", isFinished: true },
      ];

      it("should return false", () => {
        expect(isRaceFinished(unfinishedRace)).toBeFalsy();
      });
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
