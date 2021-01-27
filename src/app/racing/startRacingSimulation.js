import {
  calculateRacePartials,
  isRaceFinished,
  formatResult,
} from "../../domain/Race/Race";

let poolingInterval;

const startRacingSimulation = ({ racingRepository }) => {
  return async (
    { simulation, settings },
    { onSuccessStart, onSucessPolling, onFinishing, onError }
  ) => {
    try {
      const racingSimulation = await racingRepository.startRacingSimulation(
        simulation
      );
      onSuccessStart(racingSimulation);
      poolingInterval = setInterval(async () => {
        const checkpoints = await racingRepository.getRacingCheckPoints();
        const partials = calculateRacePartials(
          checkpoints,
          settings,
          racingSimulation
        );
        onSucessPolling(partials);
        if (isRaceFinished(partials)) {
          clearInterval(poolingInterval);
          await racingRepository.stopRacingSimulation();
          onFinishing(formatResult(partials));
        }
      }, 5000);
    } catch (error) {
      onError(error);
    }
  };
};

export default startRacingSimulation;
