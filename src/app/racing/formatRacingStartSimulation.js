const formatRacingStartSimulation = ({ racingRepository }) => {
  return (simulation, { onSuccess, onError }) => {
    try {
      const racingSimulation = racingRepository.formatRacingStartSimulation(
        simulation
      );

      return onSuccess(racingSimulation);
    } catch (error) {
      return onError(error);
    }
  };
};

export default formatRacingStartSimulation;
