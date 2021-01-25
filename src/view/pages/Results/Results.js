import React from "react";
import Page from "../../layout/Page";
import Hooks from "../../../state/hooks";

import "./Results.scss";

const Results = () => {
  const useHooks = new Hooks();
  const simulation = useHooks.useSimulationReatriver();
  return (
    <Page>
      <div className="card">
        <h2 className="card-title">Partial Results</h2>
        <div className="results">
          {Object.keys(simulation).map((carId) => (
            <>
              <span className="results__name">{`${
                simulation[carId].position + 1
              }. ${simulation[carId].racerName}`}</span>
              <span className="results__partials">
                <span className="results__partials__label">Lapes:</span>
                {`${simulation[carId].currentLape}/${simulation[carId].totalLapes}`}
                <span className="results__partials__label ">
                  Current Speed:
                </span>
                {`${simulation[carId].currentSpeed}`}
                <span className="results__partials__label">Average Speed:</span>
                {`${simulation[carId].averageSpeed}`}
                <span className="results__partials__label">
                  Travelled Distance:
                </span>
                {`${simulation[carId].travelledDistance}`}
                <span className="results__partials__label">Partial Time:</span>
                {`${simulation[carId].time}`}
              </span>
            </>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default Results;
