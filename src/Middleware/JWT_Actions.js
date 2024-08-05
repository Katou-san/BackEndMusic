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

const JWT_Verify_Email = (Payload) => {
  let token = null;
  try {
    token = jwt.sign(
      { ...Payload, expiresIn: process.env.EMAIL_VERIFY_EXPIRES_IN },
      Key_JWT
    );
    return token;
  } catch (err) {
    return token;
  }
};

const JWT_Verify_Token = async (req, res, next) => {
  let Token = await req.headers["x-access-token"];
  if (Token) {
    jwt.verify(Token, process.env.PRIVATE_KEY_JWT, (err, decoded) => {
      if (err) {
        return res.status(200).json({ status: 404, message: "Oauth Failed" });
      } else {
        req.Role = decoded.Role;
        req.Id = decoded.User_Id;
        req.Email = decoded.User_Email;
        next();
      }
    });
  } else {
    return res.status(200).json({ status: 404, message: "Oauth Failed" });
  }
};

module.exports = { JWT_Create_Token, JWT_Verify_Token, JWT_Verify_Email };
