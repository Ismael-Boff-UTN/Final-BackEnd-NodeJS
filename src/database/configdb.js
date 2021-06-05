require("../config/config");
const mongoose = require("mongoose");



const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.URLDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("DB ONLINE : SUCCESS");
  } catch (error) {
    console.log(error);
    throw new Error("DB ONLINE : FAILED : ",error);
  }
};

module.exports = {
  dbConnection,
};
