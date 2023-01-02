const { Router } = require("express");
const {
  getArtiuclosMasVendidos,
  getPedidosUsuarios,
  getRecaudaciones,
  getGanancias,
  getUltimosPedidos
} = require("../controllers/auditController");

const router = Router();

router.get("/artiuclosMasVendidos", [], getArtiuclosMasVendidos);

router.get("/pedidosUsuarios", [], getPedidosUsuarios);

router.get("/recaudaciones", [], getRecaudaciones);

router.get("/ganancias", [], getGanancias);

router.get("/ultimosPedidos", [], getUltimosPedidos);

module.exports = router;
