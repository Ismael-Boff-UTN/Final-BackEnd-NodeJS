const { response } = require("express");

const getDefault = async (req, res = response) => {
  res.json({
    msg: "Welcome Stranger!",
  });
};

module.exports = {
  getDefault,
};
