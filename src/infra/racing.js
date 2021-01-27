import { sortByDateAsc } from "../utils/timeUtil";

const racingRepository = ({ kartRacingApiService }) => ({
  async getRacingSetting() {
    const { payload } = await kartRacingApiService.get("settings");
    return payload;
  },

  async startRacingSimulation(simulation) {
    await kartRacingApiService.post("start");
    return this.formatRacingStartSimulation(simulation);
  },

  async getRacingCheckPoints() {
    const { payload } = await kartRacingApiService.get("checkpoints");
    return this.formatCheckpoints(payload);
  },

  async stopRacingSimulation() {
    const { status } = await kartRacingApiService.post("stop");
    return status;
  },

  formatRacingStartSimulation(simulation) {
    return Object.keys(simulation.cars).reduce((prev, current, index) => {
      prev.push({
        carId: current,
        racerName: simulation.cars[current],
        totalLapes: parseInt(simulation.lapes, 10),
        currentLape: 0,
        currentSpeed: 0,
        averageSpeed: 0,
        travelledDistance: 0,
        time: 0,
        startingGrid: index + 1,
      });
      return prev;
    }, []);
  },

  formatCheckpoints(checkpoints) {
    return checkpoints
      .map((cp) => cp.log.map((l) => ({ ...l, position: cp.position })))
      .flat()
      .reduce((prev, current) => {
        if (!prev[current.car]) prev[current.car] = [];
        prev[current.car].push({
          position: current.position,
          timestamp: current.timestamp,
        });
        prev[current.car].sort((a, b) =>
          sortByDateAsc(a.timestamp, b.timestamp)
        );
        return prev;
      }, {});
  },
});

export default racingRepository;
