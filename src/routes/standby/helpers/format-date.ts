import moment, { Moment } from "moment";

export function formatDate(date: Moment) {
  return moment
    .utc(date, "YYYY-MM-D hh:mm")
    .local()
    .format("D-MM-YYYY hh:mm");
}
