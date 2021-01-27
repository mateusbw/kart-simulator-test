import React, { Fragment } from "react";
import Page from "../../layout/Page";
import Hooks from "../../../state/hooks";
import { millisToFormat } from "../../../utils/timeUtil";

import loadingGif from "../../../assets/imgs/racing-loading.gif";

import "./Simulation.scss";

const Simulation = () => {
  const useHooks = new Hooks();
  const simulation = useHooks.useSimulationReatriver();

  const formatTime = (time) => {
    return millisToFormat(time);
  };

  return (
    <Page>
      <div className="card card__simulation">
        <h2 className="card-title">Partial results</h2>
        <div className="simulation">
          {simulation.map((simulationCar, index) => (
            <Fragment key={simulationCar.carId}>
              <span className="simulation__name">{`${index + 1}. ${
                simulationCar.racerName
              }`}</span>
              <span className="simulation__partials">
                <span className="simulation__partials__label">Lapes:</span>
                {`${simulationCar.currentLape}/${simulationCar.totalLapes}`}
                <span className="simulation__partials__label ">
                  Current Speed:
                </span>
                {`${simulationCar.currentSpeed} Km/h`}
                <span className="simulation__partials__label">
                  Average Speed:
                </span>
                {`${simulationCar.averageSpeed} Km/h`}
                <span className="simulation__partials__label">
                  Travelled Distance:
                </span>
                {`${simulationCar.travelledDistance} meters`}
                <span className="simulation__partials__label">
                  Partial Time (mm:ss:ms):
                </span>
                {`${formatTime(simulationCar.time)}`}
              </span>
            </Fragment>
          ))}
        </div>
        <div className="card__simulation__gif_container">
          <img src={loadingGif} alt="Loading Race" width="200px" />
        </div>
      </div>
    </Page>
  );
};

export default Simulation;
