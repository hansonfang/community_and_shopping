function formatTime(t) {
  let unixtime = t;
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
  let hour = unixTimestamp.getHours();
  let min = unixTimestamp.getMinutes();
  let time = hour + ":" + min;
  let toDay = Y + "-" + M + "-" + D;
  return {
    year: Y,
    month: M,
    day: D,
    toDay: toDay,
    hour,
    min,
    time,
    dayTime: toDay + " " + time
  };
}
export { formatTime };
