const Get_Current_Time = () => {
  const Time = new Date();
  const get_Year = Time.getFullYear();
  const get_Month = Time.getMonth();
  const get_Day = Time.getDay();
  const get_Hour = Time.getHours();
  const get_Minute = Time.getMinutes();
  const get_Second = Time.getSeconds();
  const get_Millisecond = Time.getMilliseconds();
  const Random = Math.floor(Math.random() * (100 - 10)) + 10;
  return `${get_Year}${get_Month}${get_Day}${get_Hour}${get_Minute}${get_Second}${get_Millisecond}${Random}`;
};

const plus_Date = (days) => {
  var date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const minus_Date = (days) => {
  var date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

module.exports = { Get_Current_Time, plus_Date, minus_Date };
