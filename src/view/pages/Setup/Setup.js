import React from 'react'
import "./Setup.scss";
import Page from "../../layout/Page";
import Input from '../../components/Input/Input';

import {useRacingSettingsDispatch} from "../../../state/hooks";

const Setup = () => {
    const raceSettings = useRacingSettingsDispatch();
    return (
        <Page>
            <div className="setup">
                <div className="setup__left-container">
                 <div className="card">
                     <h2 className="card-title">Racer Names</h2>
                        {raceSettings.cars && raceSettings.cars.map(car => (
                        <Input
                            key={car}
                            placeholder="Eg: Rubinho Barichello" 
                            name="racerName" id={`racerNameInput${car}`} 
                            label={`Racer Name (Cart: ${car})`}
                        ></Input>
                        ))}
                 </div>
                </div>
                 <div className="setup__right-container">
                    <div className="card">
                        <h2 className="card-title">Lapes</h2>
                        <Input placeholder="Eg: 10" name="racerName" id="lapesCount" label="Number of Lapes"></Input>
                    </div>
                    <button className="button">Confirm</button>
                 </div>
            </div>
        </Page>
    )
}

export default Setup
