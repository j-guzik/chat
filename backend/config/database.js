const mongoose = require("mongoose");
require("dotenv").config();

const databaseConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL || "mongodb://0.0.0.0:27017/chat", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongodb Database Connected");
    })
    .catch((error) => {
      console.log("Err: ", error);
    });
};
module.exports = databaseConnect;
