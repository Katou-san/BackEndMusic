const { Get_Current_Time } = require("./Get_Time");

const Create_Id = (table, name, posttime) => {
  let time = posttime;
  if (!posttime) {
    time = Get_Current_Time();
  }
  let Nametemp = String(name).replaceAll(" ", "").toLowerCase();
  return `@${table}${time}${Nametemp}`;
};

module.exports = { Create_Id };
