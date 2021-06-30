const { Router } = require("express");
const {
  getArtiuclosMasVendidos,
  getPedidosUsuarios,
  getRecaudaciones,
  getGanancias,
} = require("../controllers/auditController");

const router = Router();

router.get("/artiuclosMasVendidos", [], getArtiuclosMasVendidos);

router.get("/pedidosUsuarios", [], getPedidosUsuarios);

router.get("/recaudaciones", [], getRecaudaciones);

router.get("/ganancias", [], getGanancias);

module.exports = router;
