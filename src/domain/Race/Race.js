import { diffTime, millisToFormat } from "../../utils/timeUtil";

export const sortPosition = (carSimulationA, carSimulationB) => {
  if (carSimulationA.travelledDistance === carSimulationB.travelledDistance) {
    return carSimulationA.time - carSimulationB.time;
  }
  return carSimulationB.travelledDistance - carSimulationA.travelledDistance;
};

export const calculateTime = (carCheckpoits = []) =>
  carCheckpoits.length < 2
    ? 0
    : diffTime(
        carCheckpoits[carCheckpoits.length - 1].timestamp,
        carCheckpoits[0].timestamp,
        "milliseconds"
      );

export const calculateCurrentLape = (carCheckpoits = [], settings) => {
  const passedCheckpointsCount = carCheckpoits.length;
  const totalCheckpointsCount = settings.checkpoints.length;
  return Math.trunc(passedCheckpointsCount / (totalCheckpointsCount + 1));
};

export const calculateTravelledDistance = (carCheckpoits = [], settings) => {
  if (carCheckpoits.length === 0) return 0;
  const passedCheckpointsCount = carCheckpoits.length;
  const totalCheckpointsCount = settings.checkpoints.length;
  const lapes = Math.trunc(
    passedCheckpointsCount / (totalCheckpointsCount + 1)
  );
  const isCompleteLap = !(passedCheckpointsCount % (totalCheckpointsCount + 1));
  const rest = passedCheckpointsCount % totalCheckpointsCount;
  return (
    settings.track_length * lapes +
    (isCompleteLap
      ? 0
      : settings.checkpoints[(rest || carCheckpoits.length) - 1])
  );
};

export const calculateCurrentSpeed = (carCheckpoits = [], trackLength) => {
  if (carCheckpoits.length < 2) return 0;
  const lastPosition = !carCheckpoits[carCheckpoits.length - 1].position
    ? trackLength
    : carCheckpoits[carCheckpoits.length - 1].position;
  const distance =
    lastPosition - carCheckpoits[carCheckpoits.length - 2].position;
  const time = diffTime(
    carCheckpoits[carCheckpoits.length - 1].timestamp,
    carCheckpoits[carCheckpoits.length - 2].timestamp,
    "milliseconds"
  );
  return ((distance / time) * 3600).toFixed(1);
};

export const calculateAverageSpeed = (carCheckpoits = [], settings) => {
  if (!calculateTime(carCheckpoits)) return 0;
  return (
    (calculateTravelledDistance(carCheckpoits, settings) /
      calculateTime(carCheckpoits)) *
    3600
  ).toFixed(1);
};

export const calculateBestLap = (
  currentBestLap = { time: 0, lap: 0 },
  carCheckpoits = [],
  settings
) => {
  const lastDoneLape = calculateCurrentLape(carCheckpoits, settings);
  if (!lastDoneLape) return currentBestLap;

  const lastLapeTime = diffTime(
    carCheckpoits[lastDoneLape * 8 - 1].timestamp,
    carCheckpoits[(lastDoneLape - 1) * 8].timestamp,
    "milliseconds"
  );
  return lastLapeTime <= currentBestLap.time || !currentBestLap.lap
    ? { time: lastLapeTime, lap: lastDoneLape }
    : currentBestLap;
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
            currentSpeed: calculateCurrentSpeed(
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
            bestLap: calculateBestLap(
              carSimulation.bestLap,
              checkpoints[carSimulation.carId],
              settings
            ),
          }
    )
    .sort((carSimulationA, carSimulationB) =>
      sortPosition(carSimulationA, carSimulationB)
    );

export const calculateDiffToWinner = (currentRacer, bestRacer) => {
  if (currentRacer.carId === bestRacer.carId) return null;
  return millisToFormat(
    diffTime(currentRacer.time, bestRacer.time, "milliseconds")
  );
};

export const calculateGapp = (currentRacer, aheadRacer) => {
  if (!aheadRacer) return null;
  return millisToFormat(
    diffTime(currentRacer.time, aheadRacer.time, "milliseconds")
  );
};
export const formatResult = (simulation) => {
  const resultsHeader = `Automobile,Name,TotalLaps,TotalTime,BestLap,TimeBestLap,Diff,Gap,StartingGrid,AverageVelocity\n`;
  return simulation.reduce((result, sim, index) => {
    result += `${sim.carId},${sim.racerName},${sim.totalLapes},${millisToFormat(
      sim.time
    )},${sim.bestLap.lap},${millisToFormat(
      sim.bestLap.time
    )},${calculateDiffToWinner(sim, simulation[0])},${calculateGapp(
      sim,
      simulation[index - 1]
    )},${sim.startingGrid},${sim.averageSpeed}\n`;
    return result;
  }, resultsHeader);
};
