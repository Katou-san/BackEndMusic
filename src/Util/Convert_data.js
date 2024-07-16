const fs = require("fs");
const Convert_vUpdate = (data = {}, deny = []) => {
  const Array_keys = Object.keys(data);
  let Result_data = {};
  Array_keys.map((key, i) => {
    if (deny.indexOf(key) === -1) {
      if (data[key] !== undefined && data[key] !== "") {
        Result_data[key] = data[key];
      }
    }
  });
  return Result_data;
};

const Get_Only__Object = (data = {}, key = "", get = []) => {
  if (data != undefined && data != null && data != {} && key != "") {
    const Array_keys = Object.keys(data[key]);
    let getValue = {};
    Array_keys.map((Childkey, i) => {
      if (get.indexOf(Childkey) !== -1) {
        getValue[Childkey] = data[key][Childkey];
      }
    });
    delete data[key];
    return { ...data, ...getValue };
  }
  return {};
};

const Get_Only__Array = (data = [], key = "", get = []) => {
  const result = [];
  data.map((item) => {
    result.push(Get_Only__Object(item, key, get));
  });

  return result;
};

const Get_Max_Array = (
  data = [],
  Name_Object = "",
  Id_Item = "",
  limit = 0
) => {
  if (typeof data != "array") {
    if (Name_Object != "" && Id_Item != "") {
      let arrayMax = [];
      let arrayTemp = [];
      for (let i = 0; i < data.length; i++) {
        let max = 0;
        let index = 0;
        for (let j = 0; j < data.length; j++) {
          if (
            data[j][Name_Object].length >= max &&
            !arrayTemp.includes(data[j][Id_Item])
          ) {
            max = data[j][Name_Object].length;
            index = j;
          }
        }
        if (arrayMax.length < limit) {
          if (!arrayTemp.includes(data[index][Id_Item])) {
            arrayTemp.push(data[index][Id_Item]);
            arrayMax.push(data[index]);
          }
        }
        max = 0;
      }
      return arrayMax;
    }
    return [];
  }
  return [];
};

module.exports = {
  Convert_vUpdate,
  Get_Only__Object,
  Get_Only__Array,
  Get_Max_Array,
};
