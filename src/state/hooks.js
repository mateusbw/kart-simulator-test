import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRacingSettings, getRaceSettings } from "./racing/racing";

export const useRacingSettingsDispatch = () => {
  const raceSettings = useSelector(getRaceSettings);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadRacingSettings());
  }, [dispatch]);

  return raceSettings;
};
