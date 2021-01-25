const startRacingSimulation = ({ racingRepository }) => {
  return ({ simulation, settings }, { onSuccess, onError }) => {
    racingRepository
      .startRacingSimulation()
      .then(() => {
        const racingSimulation = racingRepository.formatRacingStartSimulation(
          simulation
        );
        onSuccess(racingSimulation);
        setInterval(() => {
          racingRepository.getRacingCheckPoints().then((checkpoints) => {
            const partials = racingRepository.calculateRacePartials(
              checkpoints,
              settings,
              racingSimulation
            );
            onSuccess(partials);
          });
        }, 5000);
      })
      .catch((error) => {
        onError(error);
      });
  };
};

export default startRacingSimulation;
