const { Get_Current_Time } = require("./Get_Time");

const Create_Id = (table, name = "", posttime = "", option = "") => {
  let time = posttime;
  let setName = name;
  if (!posttime) {
    time = Get_Current_Time();
  }
  if (!name) {
    setName = Math.floor(Math.random() * 1000);
  }
  let Nametemp = String(setName).replaceAll(" ", "").toLowerCase();
  return `@${table}${time}${Nametemp}${option}`.trim();
};

module.exports = { Create_Id };
