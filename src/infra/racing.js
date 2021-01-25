const racingRepository = ({ kartRacingApiService }) => ({
  async getRacingSetting() {
    const { payload } = await kartRacingApiService.get("settings");
    return payload;
  },

  formatRacingStartSimulation(simulation) {
    return Object.keys(simulation.cars).reduce(
      (prev, current, index) => ({
        ...prev,
        [current]: {
          racerName: simulation.cars[current],
          totalLapes: simulation.lapes,
          currentLape: 0,
          position: index,
          currentSpeed: 0,
          averageSpeed: 0,
          travelledDistance: 0,
          time: 0,
        },
      }),
      {}
    );
  },
});

export default racingRepository;
