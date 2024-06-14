module.exports = (timestamp) => {
  let hours = String(timestamp.getHours());
  let minutes = String(timestamp.getMinutes());

  let date = String(timestamp.getUTCDate());
  let month = String(timestamp.getMonth() + 1);
  if(month == '0') {
    month = '1'
  }
  const year = String(timestamp.getFullYear());
  if(month <= "9") {
    month = "0" + month;
  }
  if(date <= "9") {
    data = "0" + date;
  }
  const newCreateAt = date + "/" + month + "/" + year;
  if(parseInt(hours) <= 9) {
    hours = "0" + hours;
  }
  if(parseInt(minutes) <= 9) {
    minutes = "0" + minutes;
  }
  const newTime = hours + ":" + minutes;

  return {
    date: newCreateAt,
    time: newTime
  }
}