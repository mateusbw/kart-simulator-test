import { calculateRacePartials, isRaceFinished } from "../../domain/Race/Race";

let poolingInterval;

const checkpointsPoolingHandler = ({ racingRepository }) => {
  return async (
    { racingSimulation, settings },
    { onSucessPolling, onFinishedPooling, onError }
  ) => {
    try {
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
          onFinishedPooling(partials);
        }
      }, 5000);
    } catch (error) {
      onError(error);
    }
  };
};

export default checkpointsPoolingHandler;
