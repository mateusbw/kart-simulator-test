import React, { Fragment } from "react";
import Page from "../../layout/Page";
import Hooks from "../../../state/hooks";
import { millisToFormat } from "../../../utils/timeUtil";

import "./Results.scss";

const Results = () => {
  const useHooks = new Hooks();
  const simulation = useHooks.useSimulationReatriver();

  const formatTime = (time) => {
    return millisToFormat(time);
  };
  return (
    <Page>
      <div className="card">
        <h2 className="card-title">Partial Results</h2>
        <div className="results">
          {simulation.map((simulationCar, index) => (
            <Fragment key={simulationCar.carId}>
              <span className="results__name">{`${index + 1}. ${
                simulationCar.racerName
              }`}</span>
              <span className="results__partials">
                <span className="results__partials__label">Lapes:</span>
                {`${simulationCar.currentLape}/${simulationCar.totalLapes}`}
                <span className="results__partials__label ">
                  Current Speed:
                </span>
                {`${simulationCar.currentSpeed} Km/h`}
                <span className="results__partials__label">Average Speed:</span>
                {`${simulationCar.averageSpeed} Km/h`}
                <span className="results__partials__label">
                  Travelled Distance:
                </span>
                {`${simulationCar.travelledDistance} meters`}
                <span className="results__partials__label">
                  Partial Time (mm:ss:ms):
                </span>
                {`${formatTime(simulationCar.time)}`}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default Results;
