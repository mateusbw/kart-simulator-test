const startRacingSimulation = ({ racingRepository }) => {
  return async ({ simulation }, { onSuccessStart, onError }) => {
    try {
      const racingSimulation = await racingRepository.startRacingSimulation(
        simulation
      );
      onSuccessStart(racingSimulation);
    } catch (error) {
      onError(error);
    }
  };
};

export default startRacingSimulation;
