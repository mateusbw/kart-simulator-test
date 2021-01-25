import keyMirror from "keymirror-nested";

const glue = "/";

export const RACING = keyMirror(
  {
    REQUEST_SETTINGS_PEDING: null,
    REQUEST_SETTINGS_FULFILLED: null,
    REQUEST_SETTINGS_ERROR: null,
  },
  glue,
  "RACING"
);
