const express = require("express");
const Router = express.Router();

const vnpay = require("./vnpay");
Router.use("/vnpay", vnpay);
module.exports = Router;
