const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Key_JWT = process.env.PRIVATE_KEY_JWT;

//CREATE JWT TOKEN
const JWT_Create_Token = (Payload) => {
  let token = null;
  try {
    token = jwt.sign({ ...Payload }, Key_JWT);
    console.log(token);
    return token;
  } catch (err) {
    return token;
  }
};

//Xac Minh JWT TOKEN
const JWT_Verify_Token = (Token) => {
  let Result = null;
  jwt.verify(Token, Key_JWT, (err, decoded) => {
    if (err) {
      return Result;
    }
    console.log(decoded);
    return decoded;
  });
};

module.exports = { JWT_Create_Token, JWT_Verify_Token };
