import { calculateRacePartials, isRaceFinished } from "../../domain/Race/Race";

let poolingInterval;
const POOLING_INTERVAL = 2500;

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
        racingSimulation = partials;
        onSucessPolling(partials);
        if (isRaceFinished(partials)) {
          clearInterval(poolingInterval);
          onFinishedPooling(partials);
        }
      }, POOLING_INTERVAL);
    } catch (error) {
      onError(error);
    }
  };
};

export default checkpointsPoolingHandler;
