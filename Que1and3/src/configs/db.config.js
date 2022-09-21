const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => {
    console.log(`Err in connecting to DB: ${err}`);
  });
