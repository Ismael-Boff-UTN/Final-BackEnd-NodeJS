const { Router } = require("express");
const { check } = require("express-validator");
const {
    getPedidos,
    getPedidosCocinero,
    putPedidos,
    getPedidosDelivery,
    getPedidosCajaFacturacion,
    getPedidosCajaAdmision,
} = require("../controllers/pedidoController");
const { validarCampos } = require("../middlewares/validarCampos");
const {
  esRolValido,
  esEmailvalido,
  existeIDUsuario,
} = require("../helpers/db-validadores");
const { validarJWT } = require("../middlewares/validar-jwt");
const { tieneRole } = require("../middlewares/validar-roles");

const router = Router();


//================================
//   Obtener pedidos para cocinero
//================================
router.get("/cocinero", [validarJWT], tieneRole("ADMIN_ROLE", "COCINERO_ROLE"), getPedidosCocinero);

//================================
//   Obtener pedidos para delivery
//================================
router.get("/delivery", [validarJWT], tieneRole("ADMIN_ROLE", "DELIVERY_ROLE") , getPedidosDelivery);

//================================
//   Obtener pedidos para caja
//================================
router.get("/caja", [validarJWT], tieneRole("ADMIN_ROLE") , getPedidosCajaFacturacion);

//================================
//   Obtener pedidos para caja
//================================
router.get("/cajaAdmision", [validarJWT], tieneRole("ADMIN_ROLE") , getPedidosCajaAdmision);

//================================
//   Editar Un Usuario
// Tipo Privado, Solo Admins
//================================
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE", "COCINERO_ROLE"),
    check("id", "No Es Un ID Valido De Mongo").isMongoId(),
    //check("rol").custom(esRolValido),
    validarCampos,
  ],
  putPedidos
);


module.exports = router;