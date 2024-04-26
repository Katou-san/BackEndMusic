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

module.exports = { Convert_vUpdate };
