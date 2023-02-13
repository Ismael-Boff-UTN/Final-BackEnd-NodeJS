const { Router } = require("express");
const {
  getArtiuclosMasVendidos,
  getPedidosUsuarios,
  getRecaudaciones,
  getGanancias,
  getUltimosPedidos,
  getRecaudacionesDelDia
} = require("../controllers/auditController");

const router = Router();

router.get("/artiuclosMasVendidos", [], getArtiuclosMasVendidos);

router.get("/pedidosUsuarios", [], getPedidosUsuarios);

router.get("/recaudaciones", [], getRecaudaciones);

router.get("/recaudacionesDelDia", [], getRecaudacionesDelDia);

router.get("/ganancias", [], getGanancias);

router.get("/ultimosPedidos", [], getUltimosPedidos);

module.exports = router;
