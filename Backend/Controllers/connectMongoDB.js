const mongoose = require("mongoose");
function connectMongoDB(url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB connected successfully!!");
    })
    .catch((error) => {
      console.log("Error while connecting MongoDB", error);
    });
}

module.exports = connectMongoDB;
