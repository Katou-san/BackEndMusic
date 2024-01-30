const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./Routes");
const bodyParser = require("body-parser");
const {
  JWT_Create_Token,
  JWT_Verify_Token,
} = require("./Middleware/JWT_ActionS");
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
routes(app);

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log("connect mongoDB success");
  })
  .catch((err) => {
    console.log("connect fail");
  });

// JWT_Create_Token({ name: "jwt", body: "hello" });
// JWT_Verify_Token(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiand0IiwiYm9keSI6ImhlbGxvIiwiaWF0IjoxNzA2NTk2OTcwfQ.7WPBwMceGv3omqTsACvCA_9s2y7c8AEoCHl3mnwru3I"
// );

app.listen(port, () => {
  console.log("Server is running in http://localhost:" + port);
});
