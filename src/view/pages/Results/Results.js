import React from "react";
import Page from "../../layout/Page";
import Hooks from "../../../state/hooks";
import { millisToFormat } from "../../../utils/timeUtil";

import "./Results.scss";

const Results = () => {
  const useHooks = new Hooks();
  const simulation = useHooks.useSimulationReatriver();
  const result = useHooks.useRaceResultReatriver();

  const formatTime = (time) => {
    return millisToFormat(time);
  };

  const generateFile = () => {
    const blob = new Blob([result], {
      type: "text/plain",
    });
    return window.URL.createObjectURL(blob);
  };
  const file = generateFile();

  return (
    <Page>
      <div className="results">
        <div className="card">
          <h2 className="card-title">Results</h2>
          <div className="card__results">
            {simulation.map((simulationCar, index) => (
              <div className="card__results__racer" key={simulationCar.carId}>
                <span className="card__results__racer__name">{`${index + 1}. ${
                  simulationCar.racerName
                }`}</span>
                <span className="card__results__racer__time">
                  - {`${formatTime(simulationCar.time)}`}
                </span>
              </div>
            ))}
          </div>
        </div>
        <a href={file} download="file" className="button results__download">
          Download Results
        </a>
      </div>
    </Page>
  );
};

export default Results;
