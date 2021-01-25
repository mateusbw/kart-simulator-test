import { sortByDateAsc, diffTime } from "../utils/timeUtil";

const racingRepository = ({ kartRacingApiService }) => ({
  async getRacingSetting() {
    const { payload } = await kartRacingApiService.get("settings");
    return payload;
  },

  async startRacingSimulation() {
    const { status } = await kartRacingApiService.post("start");
    return status;
  },

  async getRacingCheckPoints() {
    const { payload } = await kartRacingApiService.get("checkpoints");
    return payload;
  },

  async stopRacingSimulation() {
    const { status } = await kartRacingApiService.post("stop");
    return status;
  },

  formatRacingStartSimulation(simulation) {
    return Object.keys(simulation.cars).reduce((prev, current) => {
      prev.push({
        carId: current,
        racerName: simulation.cars[current],
        totalLapes: simulation.lapes,
        currentLape: 0,
        currentSpeed: 0,
        averageSpeed: 0,
        travelledDistance: 0,
        time: 0,
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

  calculateRacePartials(checkpoints, settings, simulation) {
    const carsCheckpoint = this.formatCheckpoints(checkpoints);
    return simulation
      .map((carSimulation) => ({
        ...carSimulation,
        currentLape: this.calculateCurrentLape(
          carsCheckpoint[carSimulation.carId],
          settings
        ),
        currentSpeed: this.calculateCurrentSeed(
          carsCheckpoint[carSimulation.carId],
          settings.track_length
        ),
        averageSpeed: this.calculateAverageSpeed(
          carsCheckpoint[carSimulation.carId],
          settings
        ),
        travelledDistance: this.calculateTravelledDistance(
          carsCheckpoint[carSimulation.carId],
          settings
        ),
        time: this.calculateTime(carsCheckpoint[carSimulation.carId]),
      }))
      .sort((carSimulationA, carSimulationB) =>
        this.sortPosition(carSimulationA, carSimulationB)
      );
  },

  sortPosition(carSimulationA, carSimulationB) {
    if (carSimulationA.travelledDistance === carSimulationB.travelledDistance) {
      return carSimulationA.time - carSimulationB.time;
    }
    return carSimulationB.travelledDistance - carSimulationA.travelledDistance;
  },

  calculateTime(carCheckpoits) {
    return carCheckpoits.length === 1
      ? 0
      : -1 *
          diffTime(
            carCheckpoits[0].timestamp,
            carCheckpoits[carCheckpoits.length - 1].timestamp
          );
  },

  calculateCurrentLape(carCheckpoits, settings) {
    const passedCheckpointsCount = carCheckpoits.length;
    const totalCheckpointsCount = settings.checkpoints.length;
    return Math.trunc(passedCheckpointsCount / (totalCheckpointsCount + 1));
  },

  calculateTravelledDistance(carCheckpoits, settings) {
    const passedCheckpointsCount = carCheckpoits.length;
    const totalCheckpointsCount = settings.checkpoints.length;
    const lapes = Math.trunc(
      passedCheckpointsCount / (totalCheckpointsCount + 1)
    );
    const rest = passedCheckpointsCount % (totalCheckpointsCount + 1);
    return (
      settings.track_length * lapes +
      (!rest ? rest : settings.checkpoints[rest - 1])
    );
  },

  calculateCurrentSeed(carCheckpoits, trackLength) {
    if (carCheckpoits.length < 2) return 0;
    const lastPosition = !carCheckpoits[carCheckpoits.length - 1].position
      ? trackLength
      : carCheckpoits[carCheckpoits.length - 1].position;
    const distance =
      lastPosition - carCheckpoits[carCheckpoits.length - 2].position;
    const time = diffTime(
      carCheckpoits[carCheckpoits.length - 1].timestamp,
      carCheckpoits[carCheckpoits.length - 2].timestamp
    );
    return Math.round((distance / time) * 3.6);
  },

  calculateAverageSpeed(carCheckpoits, settings) {
    return Math.round(
      (this.calculateTravelledDistance(carCheckpoits, settings) /
        this.calculateTime(carCheckpoits)) *
        3.6
    );
  },
});

export default racingRepository;
