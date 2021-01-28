import { diffTime, millisToFormat, sortByDateAsc } from "../../utils/timeUtil";

describe("Util > timeUtil", () => {
  describe("diffTime", () => {
    describe("No unit parameter", () => {
      it("should return the difference time between timestamps in seconds", () => {
        expect(diffTime(1611608234354, 1611608232550)).toEqual(2);
      });
    });
    describe("Milliseconds unit parameter", () => {
      it("should return the difference time between timestamps in Milliseconds", () => {
        expect(diffTime(1611608234354, 1611608232550, "milliseconds")).toEqual(
          1804
        );
      });
    });
  });
  describe("millisToFormat", () => {
    it("should return the duration in milliseconds in the format mm:ss:ms", () => {
      expect(millisToFormat(8170)).toEqual("00:08:170");
    });
  });
  describe("sortByDateAsc", () => {
    it("should sort the array ascendently", () => {
      const simulation = [
        { racerName: "A", time: 9170 },
        { racerName: "B", time: 8170 },
        { racerName: "C", time: 7170 },
        { racerName: "D", time: 6170 },
      ];
      expect(simulation.sort((a, b) => sortByDateAsc(a.time, b.time))).toEqual([
        { racerName: "D", time: 6170 },
        { racerName: "C", time: 7170 },
        { racerName: "B", time: 8170 },
        { racerName: "A", time: 9170 },
      ]);
    });
  });
});
