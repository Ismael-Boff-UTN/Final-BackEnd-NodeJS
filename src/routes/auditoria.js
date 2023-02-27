const { Router } = require("express");
const {
  getArtiuclosMasVendidos,
  getPedidosUsuarios,
  getRecaudaciones,
  getGanancias,
  getUltimosPedidos,
  getRecaudacionesDelDia,
  getArtiuclosMasVendidosByDate
} = require("../controllers/auditController");

const router = Router();

router.get("/artiuclosMasVendidos", [], getArtiuclosMasVendidos);

router.get("/artiuclosMasVendidosByDate", [], getArtiuclosMasVendidosByDate);

router.get("/pedidosUsuarios", [], getPedidosUsuarios);

router.get("/recaudaciones", [], getRecaudaciones);

router.get("/recaudacionesDelDia", [], getRecaudacionesDelDia);

router.get("/ganancias", [], getGanancias);

router.get("/ultimosPedidos", [], getUltimosPedidos);

module.exports = router;
