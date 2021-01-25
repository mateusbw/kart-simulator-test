
const racingRepository = ({ kartRacingApiService }) => ({
  async getRacingSetting() {
    console.log("Entrei infra");
    const {payload}  = await kartRacingApiService.get('settings');
    return payload;
  }
});

export default racingRepository;
