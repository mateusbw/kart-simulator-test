import { diffTime } from "../../utils/timeUtil";

export const sortPosition = (carSimulationA, carSimulationB) => {
  if (carSimulationA.travelledDistance === carSimulationB.travelledDistance) {
    return carSimulationA.time - carSimulationB.time;
  }
  return carSimulationB.travelledDistance - carSimulationA.travelledDistance;
};

export const calculateTime = (carCheckpoits = []) =>
  carCheckpoits.length < 2
    ? 0
    : -1 *
      diffTime(
        carCheckpoits[0].timestamp,
        carCheckpoits[carCheckpoits.length - 1].timestamp,
        "milliseconds"
      );

export const calculateCurrentLape = (carCheckpoits = [], settings) => {
  const passedCheckpointsCount = carCheckpoits.length;
  const totalCheckpointsCount = settings.checkpoints.length;
  return Math.trunc(passedCheckpointsCount / (totalCheckpointsCount + 1));
};

export const calculateTravelledDistance = (carCheckpoits = [], settings) => {
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
};

export const calculateCurrentSeed = (carCheckpoits = [], trackLength) => {
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
};

export const calculateAverageSpeed = (carCheckpoits = [], settings) => {
  if (!calculateTime(carCheckpoits)) return 0;
  return Math.round(
    (calculateTravelledDistance(carCheckpoits, settings) /
      calculateTime(carCheckpoits)) *
      3600
  );
};

export const isRaceFinished = (simulation) => {
  return simulation.every((carSimulation) => carSimulation.isFinished);
};

export const calculateRacePartials = (checkpoints, settings, simulation) =>
  simulation
    .map((carSimulation) =>
      carSimulation.isFinished
        ? carSimulation
        : {
            ...carSimulation,
            currentLape: calculateCurrentLape(
              checkpoints[carSimulation.carId],
              settings
            ),
            currentSpeed: calculateCurrentSeed(
              checkpoints[carSimulation.carId],
              settings.track_length
            ),
            averageSpeed: calculateAverageSpeed(
              checkpoints[carSimulation.carId],
              settings
            ),
            travelledDistance: calculateTravelledDistance(
              checkpoints[carSimulation.carId],
              settings
            ),
            time: calculateTime(checkpoints[carSimulation.carId]),
            isFinished:
              carSimulation.totalLapes ===
              calculateCurrentLape(checkpoints[carSimulation.carId], settings),
          }
    )
    .sort((carSimulationA, carSimulationB) =>
      sortPosition(carSimulationA, carSimulationB)
    );
