const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    throw new Error("Error while initializing db");
  }
};

module.exports = {
  dbConnection,
};
