const getRacingSetting = ({ racingRepository }) => {
    return async ({ onSuccess, onError }) => {
      try {
        console.log("Entrei app");
        const racingSettings = await racingRepository.getRacingSetting();
        onSuccess(racingSettings);
      } catch(error) {
        onError(error);
      }
    };
};

export default getRacingSetting;
  