const formatTime=function (time) {
  let unixtime = time;
  let unixTimestamp = new Date(unixtime);
  let Y = unixTimestamp.getFullYear();
  let M =
    unixTimestamp.getMonth() + 1 > 10
      ? unixTimestamp.getMonth() + 1
      : "0" + (unixTimestamp.getMonth() + 1);
  let D =
    unixTimestamp.getDate() > 10
      ? unixTimestamp.getDate()
      : "0" + unixTimestamp.getDate();
  let toDay = Y + "-" + M + "-" + D;
  return {
    year: Y,
    month: M,
    day: D,
    today: toDay
  };
}
export default {
    formatTime
}