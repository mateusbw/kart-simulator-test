import React from "react";
import Page from "../../layout/Page";
import Hooks from "../../../state/hooks";
import { millisToFormat } from "../../../utils/timeUtil";

import "./Results.scss";

const Results = () => {
  const useHooks = new Hooks();
  // const simulation = useHooks.useSimulationReatriver();
  const simulation = [
    {
      carId: "8fc7ac79-8bf2-4816-af5b-fd84c42ae030",
      racerName: "A",
      totalLapes: 5,
      currentLape: 5,
      currentSpeed: "50.4",
      averageSpeed: "46.0",
      travelledDistance: 5650,
      time: 441971,
      startingGrid: 1,
      isFinished: true,
      bestLap: {
        time: 81628,
        lap: 5,
      },
    },
    {
      carId: "5e534a04-15a7-4064-94d5-48c5a1c8b825",
      racerName: "B",
      totalLapes: 5,
      currentLape: 5,
      currentSpeed: "50.1",
      averageSpeed: "45.9",
      travelledDistance: 5650,
      time: 443428,
      startingGrid: 2,
      isFinished: true,
      bestLap: {
        time: 80469,
        lap: 5,
      },
    },
    {
      carId: "3ab9bbc2-ed3e-4615-acc6-3aed35a99db5",
      racerName: "D",
      totalLapes: 5,
      currentLape: 5,
      currentSpeed: "52.6",
      averageSpeed: "45.9",
      travelledDistance: 5650,
      time: 443597,
      startingGrid: 4,
      isFinished: true,
      bestLap: {
        time: 81558,
        lap: 5,
      },
    },
    {
      carId: "c16e810e-c831-435f-a8f5-166ebb1b0141",
      racerName: "E",
      totalLapes: 5,
      currentLape: 5,
      currentSpeed: "50.3",
      averageSpeed: "45.8",
      travelledDistance: 5650,
      time: 444454,
      startingGrid: 5,
      isFinished: true,
      bestLap: {
        time: 81595,
        lap: 5,
      },
    },
    {
      carId: "c61f80f6-8f08-435f-947c-f53f5d2bcfa0",
      racerName: "C",
      totalLapes: 5,
      currentLape: 5,
      currentSpeed: "50.2",
      averageSpeed: "45.6",
      travelledDistance: 5650,
      time: 445570,
      startingGrid: 3,
      isFinished: true,
      bestLap: {
        time: 81785,
        lap: 5,
      },
    },
  ];
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
