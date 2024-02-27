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

const JWT_Verify_Token = async (req, res, next) => {
  let Token = await req.headers["x-access-token"];
  if (Token) {
    jwt.verify(Token, process.env.PRIVATE_KEY_JWT, (err, decoded) => {
      if (err) {
        res.send({
          is_Login: false,
          Access_Token: "",
          Data_User: {
            User_Id: "",
            User_Name: "",
            Avatar: "",
          },
        });
      } else {
        req.User_Id = decoded.User_Id;
        req.User_Email = decoded.User_Email;
        next();
      }
    });
  } else {
    res.send({
      is_Login: false,
      Access_Token: "",
      Data_User: {
        User_Id: "",
        User_Name: "",
        Avatar: "",
      },
    });
  }
};

module.exports = { JWT_Create_Token, JWT_Verify_Token };
