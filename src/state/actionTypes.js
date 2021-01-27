import keyMirror from "keymirror-nested";

const glue = "/";

export const RACING = keyMirror(
  {
    REQUEST_SETTINGS_PEDING: null,
    REQUEST_SETTINGS_FULFILLED: null,
    REQUEST_REQUEST_ERROR: null,
    START_RACE: null,
    UPDATE_SIMULATION: null,
    STOP_SIMULATION: null,
    RETRY_ACTION: null,
  },
  glue,
  "RACING"
);
