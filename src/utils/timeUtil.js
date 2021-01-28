import { DateTime, Duration } from "luxon";

export const diffTime = (a, b, unit = "seconds") =>
  Math.round(DateTime.fromMillis(a).diff(DateTime.fromMillis(b)).as(unit));

export const millisToFormat = (milliseconds) =>
  Duration.fromMillis(milliseconds).toFormat("mm:ss:SSS");

export const sortByDateAsc = (date1, date2) => {
  if (date1 > date2) {
    return 1;
  }
  return -1;
};
