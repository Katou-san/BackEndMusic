const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const trans = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_NAME,
    pass: process.env.MAIL_PASS,
  },
});

const mailOpt = {
  from: process.env.MAIL_NAME,
  to: "duonglethanhdanh@gmail.com",
  subject: "Test gmail",
  text: "Gui dc roi yeeeeeeeeeeeeeeeeee",
  html: "<p>Text da dc gui thanh cong</p>",
};

trans.sendMail(mailOpt, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email send: " + info.response);
  }
});
