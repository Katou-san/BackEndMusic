const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../Model/User");
const { JWT_Create_Token } = require("../Middleware/JWT_ActionS");
dotenv.config();

const trans = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_NAME,
    pass: process.env.MAIL_PASS,
  },
});

const Send_Email_Verify = async (email) => {
  try {
    const user = await User.findOne({ User_Email: email });
    if (!user) {
      return 0;
    }

    if (user.Status == 2) {
      const Email_Token = JWT_Create_Token({
        User_Email: user.User_Email,
        User_Id: user.User_Id,
      });

      const mailOpt = {
        from: process.env.MAIL_NAME,
        to: email,
        subject: "Hotaru Verify Mail",
        text: "Mail Verify",
        html: `<p>Đây là mail để xác nhận tài khoảng trên trang Hotaru.</p><p>Ấn vào đường link bên dưới để xác nhận:</p><p><a href="${process.env.EMAIL_CALLBACK}/${Email_Token}">Verify mail</a></p>`,
      };

      trans.sendMail(mailOpt, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email verify send: " + info.response);
        }
      });
      return 1;
    } else {
      return 2;
    }
  } catch (e) {
    console.log(e);
    return -1;
  }
};

const Email_verify = async (id) => {
  try {
    const verify = jwt.verify(
      id,
      process.env.PRIVATE_KEY_JWT,
      async (err, decoded) => {
        if (err) {
          return 0;
        } else {
          const check = await User.findOne({
            User_Id: decoded.User_Id,
            User_Email: decoded.User_Email,
          });

          if (check.Status == 2) {
            const user = await User.findOneAndUpdate(
              {
                User_Id: decoded.User_Id,
              },
              {
                Status: 1,
              },
              {
                new: true,
              }
            );

            return 1;
          } else {
            return 2;
          }
        }
      }
    );
    return verify;
  } catch (e) {
    console.log(e);
    return -1;
  }
};

module.exports = {
  Send_Email_Verify,
  Email_verify,
};
