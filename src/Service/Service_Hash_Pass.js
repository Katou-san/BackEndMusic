const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const Hash_Password = (Pass) => {
  const Hash_Pass = bcrypt.hashSync(Pass, salt);
  return Hash_Pass;
};

const Confirm_Hash_Password = (Pass, Hash) => {
  const result = bcrypt.compareSync(Pass, Hash);
  return result;
};

module.exports = { Hash_Password, Confirm_Hash_Password };
