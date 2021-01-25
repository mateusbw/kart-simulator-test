import React from "react";
import "./Setup.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import HookWraper from "../../../state/hooks";
import Page from "../../layout/Page";
import Input from "../../components/Input/Input";
import ROUTER_PATHS from "../../routes/RouterPaths";

const Setup = () => {
  const hooks = new HookWraper();
  const raceSettings = hooks.useRacingSettingsReatriver();
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const startRace = (value) => {
    const { sucess } = hooks.useStartRaceDispatch(value);
    if (sucess) history.push(ROUTER_PATHS.RESULTS);
  };

  return (
    <Page>
      <form className="setup" onSubmit={handleSubmit(startRace)}>
        <div className="setup__left-container">
          <div className="card">
            <h2 className="card-title">Racer Names</h2>
            {raceSettings.cars &&
              raceSettings.cars.map((car) => (
                <Input
                  key={car}
                  inputRef={register({
                    required: "Please, inform a racer name!",
                  })}
                  placeholder="Eg: Rubinho Barichello"
                  name={`cars.${car}`}
                  id={`racerNameInput${car}`}
                  label={`Racer Name (Cart: ${car})`}
                  errorMessage={errors[car]?.message}
                  hasError={!!errors[car]}
                />
              ))}
          </div>
        </div>
        <div className="setup__right-container">
          <div className="card">
            <h2 className="card-title">Lapes</h2>
            <Input
              inputRef={register({
                required: "Please, inform the number of lapes!",
              })}
              placeholder="Eg: 10"
              name="lapes"
              id="lapesCount"
              label="Number of Lapes"
              errorMessage={errors.lapes?.message}
              hasError={!!errors.lapes}
            />
          </div>
          <button className="button" type="submit">
            Start Race
          </button>
        </div>
      </form>
    </Page>
  );
};

export default Setup;
