const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.URLDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Data Base Status : Connection SUCCESS :D");
  } catch (error) {
    console.log(error);
    throw new Error("Data Base Status : Connection FAILED :c : ", error);
  }
};

module.exports = {
  dbConnection,
};
