const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const {
  Send_Email_Verify,
  Email_verify,
  Send_reset_password,
} = require("../Util/Send_Email");
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
        return res.status(200).json("Verify token is not valid.");
      case 1:
        return res.status(200).json("Your email has been verified.");
      case 2:
        return res.status(200).json("Email has already been vetified.");
      default:
        return res.status(200).json("Email verification failed.");
    }
  } catch (e) {
    new Error(e.message);
    return res.status(404).json("Verify email fail!");
  }
};

const CTL__Send_Email_reset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(200).json({ status: 404, message: "Email invalid" });
    }
    const result = await Send_reset_password(email);

    switch (result) {
      case 0:
        return res
          .status(200)
          .json({ status: 404, message: "Account not exist" });
      case 1:
        return res
          .status(200)
          .json({ status: 200, message: "Reset Email has been sent!" });
      case 2:
        return res
          .status(200)
          .json({ status: 404, message: "Account not active" });
      default:
        return res
          .status(200)
          .json({ status: 404, message: "Send Email Fail" });
    }
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Send Email Fail" });
  }
};

module.exports = {
  CTL__Send_Email_Verify,
  CTL__Email_confirm,
  CTL__Send_Email_reset,
};
