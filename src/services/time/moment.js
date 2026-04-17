import moment from "moment";

export const formatTime = (time) => {
  if (!time) return "";

  return moment.utc(time).local().fromNow();
};