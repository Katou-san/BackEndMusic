const express = require("express");
const Router = express.Router();
const {
  CTL__Send_Email_Verify,
  CTL__Email_confirm,
} = require("../../Controller/Controller_Email");

Router.get("/mail/confirm/:id", CTL__Email_confirm);
Router.get("/mail/send-verify/:mail", CTL__Send_Email_Verify);

module.exports = Router;
