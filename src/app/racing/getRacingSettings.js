const getRacingSetting = ({ racingRepository }) => {
  return ({ onSuccess, onError }) => {
    racingRepository
      .getRacingSetting()
      .then((racingSettings) => {
        onSuccess(racingSettings);
      })
      .catch((error) => {
        onError(error);
      });
  };
};

export default getRacingSetting;
