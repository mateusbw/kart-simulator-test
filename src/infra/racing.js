const racingRepository = ({ kartRacingApiService }) => ({
  async getRacingSetting() {
    const { payload } = await kartRacingApiService.get("settings");
    return payload;
  },
});

export default racingRepository;
