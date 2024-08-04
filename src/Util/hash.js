const { encode, decode } = require("js-base64");

function hash64(pass) {
  return encode(pass);
}

function dehash64(pass) {
  return decode(pass);
}

module.exports = { hash64, dehash64 };
