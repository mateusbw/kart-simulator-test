import { formatResult } from "../../domain/Race/Race";

const stopRacingSimulation = ({ racingRepository }) => {
  return async ({ partials }, { onFinishing, onError }) => {
    try {
      await racingRepository.stopRacingSimulation();
      onFinishing(formatResult(partials));
    } catch (error) {
      onError(error);
    }
  };
};

export default stopRacingSimulation;
