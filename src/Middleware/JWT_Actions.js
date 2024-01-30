const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Key_JWT = process.env.PRIVATE_KEY_JWT;

//CREATE JWT TOKEN
const JWT_Create_Token = (Payload) => {
  let token = null;
  try {
    token = jwt.sign(
      { ...Payload, expiresIn: process.env.EXPIRES_IN },
      Key_JWT
    );
    return token;
  } catch (err) {
    return token;
  }
};

//Xac Minh JWT TOKEN
const JWT_Verify_Token = (Token) => {
  let Result = null;
  try {
    Result = jwt.verify(Token, Key_JWT);
  } catch (err) {
    console.log(err);
  }
  return Result;
};

module.exports = { JWT_Create_Token, JWT_Verify_Token };
