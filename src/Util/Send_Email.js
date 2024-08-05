const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../Model/User");
const { JWT_Verify_Email } = require("../Middleware/JWT_ActionS");
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
      const Email_Token = JWT_Verify_Email({
        User_Email: user.User_Email,
        User_Id: user.User_Id,
      });

      const mailOpt = {
        from: process.env.MAIL_NAME,
        to: email,
        subject: "Hotaru Verify Mail",
        text: "Mail Verify",
        html: `<p>Hello ${user.User_Name}</p><p>This is an email to verify the account for Hotaru Music.</p><p>To confirm your email, click the link below: </p><p><a href="${process.env.EMAIL_CALLBACK}/${Email_Token}">Verify email</a></p><p>This link will expire within 1 hour.</p>`,
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

const Send_reset_password = async (email) => {
  try {
    const user = await User.findOne({ User_Email: email, is_Admin: false });
    if (!user) {
      return 0;
    }

    if (user.Status == 1) {
      const Email_Token = JWT_Verify_Email({
        User_Id: user.User_Id,
        Reset: user.User_Pass,
      });

      const mailOpt = {
        from: process.env.MAIL_NAME,
        to: email,
        subject: "Hotaru reset password",
        text: "Reset password",
        html: `<p>Hello ${user.User_Name}</p><p>This is an email to reset your password for Hotaru Music.</p><p>Click the link below to continue: </p><p><a href="${process.env.PASSWORLD_RESET_CALLBACK}/${Email_Token}">Reset password</a></p><p>This link will expire within 1 hour.</p>`,
      };

      trans.sendMail(mailOpt, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email reset send: " + info.response);
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

module.exports = {
  Send_Email_Verify,
  Email_verify,
  Send_reset_password,
};
