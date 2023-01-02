const { Router, response, json } = require("express");
const { getDefault } = require("../controllers/defaultController");


const router = Router();

router.get("/", [], getDefault);


module.exports = router;