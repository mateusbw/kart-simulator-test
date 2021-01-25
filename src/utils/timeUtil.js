import { DateTime } from "luxon";

export const normalizeUnixEpochDate = (date) =>
  DateTime.fromMillis(date).toISO();

export const diffTime = (a, b) =>
  Math.round(DateTime.fromMillis(a).diff(DateTime.fromMillis(b)).as("seconds"));

export const sortByDateAsc = (date1, date2) => {
  if (date1 > date2) {
    return 1;
  }
  return -1;
};
