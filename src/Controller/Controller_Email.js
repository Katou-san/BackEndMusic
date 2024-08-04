const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { Send_Email_Verify, Email_verify } = require("../Util/Send_Email");
dotenv.config();

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const trans = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_NAME,
    pass: process.env.MAIL_PASS,
  },
});

const CTL__Send_Email_Verify = async (req, res) => {
  try {
    const mail = req.params.mail;
    const check = emailRegexp.test(mail);
    if (check) {
      const result = await Send_Email_Verify(mail);
      console.log(result);
      switch (result) {
        case 0:
          return res
            .status(200)
            .json({ status: 404, message: "Account not exist" });
        case 1:
          return res
            .status(200)
            .json({ status: 200, message: "Verify Email has been sent!" });
        case 2:
          return res
            .status(200)
            .json({ status: 404, message: "Email has been verify" });
        default:
          return res
            .status(200)
            .json({ status: 404, message: "Send Email Fail" });
      }
    } else {
      return res.status(200).json({ status: 404, message: "Email not valid" });
    }
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Send Email Fail" });
  }
};

const CTL__Email_confirm = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Email_verify(id);

    switch (result) {
      case 0:
        return res
          .status(200)
          .json({ status: 404, message: "Verify token not valid" });
      case 1:
        return res
          .status(200)
          .json({ status: 200, message: "Verify email complete!" });
      case 2:
        return res
          .status(200)
          .json({ status: 404, message: "Email already vetify" });
      default:
        return res
          .status(200)
          .json({ status: 404, message: "Verify Email Fail" });
    }
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Verify Email Fail" });
  }
};

module.exports = {
  CTL__Send_Email_Verify,
  CTL__Email_confirm,
};
