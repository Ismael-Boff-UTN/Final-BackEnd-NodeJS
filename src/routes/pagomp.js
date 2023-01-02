const { Router } = require("express");
const {
    postPagoMP,
} = require("../controllers/pagompController");
const { validarJWT } = require("../middlewares/validar-jwt");
const { tieneRole } = require("../middlewares/validar-roles");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

//Private Access
//POST pagomp
router.post(
  "/",
  [
  ],
  postPagoMP
);


module.exports = router;
