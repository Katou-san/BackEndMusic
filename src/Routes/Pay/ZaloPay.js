const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios"); // npm install axios
const CryptoJS = require("crypto-js"); // npm install crypto-js
const moment = require("moment"); // npm install moment
const express = require("express");
const qs = require("qs");
const { Create_Id } = require("../../Util/Create_Id");
const { User } = require("../../Model/User");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const { Subscription } = require("../../Model/Subscription");
const { Bill } = require("../../Model/Bill");
const { plus_Date } = require("../../Util/Get_Time");
const { Storage } = require("../../Model/Storage");
const Router = express.Router();

const config = {
  app_id: "2554",
  key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
  key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};
//? DONE
Router.post("/payment/:id", JWT_Verify_Token, async (req, res) => {
  const embed_data = {
    redirecturl: "",
  };

  if (!req.Id) {
    return res.status(200).json({ status: 404, message: "Error when payment" });
  }

  const getUser = await User.findOne({ User_Id: req.Id });
  if (!getUser) {
    return res.status(200).json({ status: 404, message: "Not found user" });
  }

  const Sub_Id = req.params.id;
  const Check_Sub = await Subscription.findOne({ Sub_Id });
  if (!Check_Sub) {
    return res
      .status(200)
      .json({ status: 404, message: "Not found subscription" });
  }

  const items = [Check_Sub];
  const transID = Create_Id("payment");
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: getUser.User_Name,
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: Check_Sub.Price,
    description: `Hotaru - Payment for subscription #${transID}`,
    bank_code: "",
    callback_url: `${process.env.CALLBACK_URL}/zalopay/callback/${getUser.User_Id}`,
  };

  // appid|apptransid|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;

  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const result = await axios.post(config.endpoint, null, { params: order });
    return res.status(200).json({ status: 200, data: result.data });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      data: {},
      error: error.message,
      message: error.message,
    });
  }
});

//! NEED CHECK
Router.post("/callback/:id", async (req, res) => {
  let result = {};
  console.log("callback");
  try {
    const User_Id = req.params.id;
    const getUser = await User.findOne({ User_Id });
    if (!getUser) {
      return res
        .status(200)
        .json({ status: 404, message: "Error when payment" });
    }
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, config.key2);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      result.return_code = 1;
      result.return_message = "success";
      if (result.return_code === 1) {
        const data = JSON.parse(req.body.data);
        const subscription = JSON.parse(data.item)[0];
        const GetSub = await Subscription.findOne({
          Sub_Id: subscription.Sub_Id,
        });

        const createBill = await Bill.create({
          Bill_Id: Create_Id("Bill"),
          User_Id,
          Sub_Id: GetSub.Sub_Id,
          Expiration_Date: plus_Date(GetSub.Duration),
        });
        const update = await User.findOneAndUpdate(
          { User_Id },
          { is_Premium: true },
          { new: true }
        );
        const getStorage = await Storage.findOne({ User_Id });
        const storageUpdate = await Storage.findOneAndUpdate(
          { User_Id },
          { Limit: getStorage.Limit + GetSub.Storage },
          { new: true }
        );
      }
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
});

//! NEED CHECK
Router.post("/order-status/:id", async function (req, res) {
  const id = req.params.id;
  let postData = {
    app_id: config.app_id,
    app_trans_id: id, // Input your app_trans_id
  };

  let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  let postConfig = {
    method: "post",
    url: "https://sb-openapi.zalopay.vn/v2/query",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };
  try {
    const result = await axios(postConfig);
    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

module.exports = Router;
