const { Router, response, json } = require("express");
const { getArtiuclosMasVendidos } = require("../controllers/auditController");

const router = Router();

router.get("/artiuclosMasVendidos", [], getArtiuclosMasVendidos);

module.exports = router;
