const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);

    console.log("DB online");
  } catch (error) {
    throw new Error("Error while initializing db " + error);
  }
};

module.exports = {
  dbConnection,
};
