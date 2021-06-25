const { Router } = require("express");
const { check } = require("express-validator");
const {
  getArticulos,
  getArticulosAdmin,
  getArticuloByID,
  postArticulo,
  putArticulo,
  deleteArticulo,
} = require("../controllers/articulosController");
const { validarJWT } = require("../middlewares/validar-jwt");
const { tieneRole } = require("../middlewares/validar-roles");
const { validarCampos } = require("../middlewares/validarCampos");
const { existeIDArticulo } = require("../helpers/db-validadores");

const router = Router();

//================================================
//Public Access
//GET ALL ARTICLES
router.get("/", [validarCampos], getArticulos);
router.get(
  "/admin",
  [validarJWT, tieneRole("ADMIN_ROLE"), validarCampos],
  getArticulosAdmin
);

//GET ONE ARTICLE BY ID
router.get("/:id", [validarCampos], getArticuloByID);
//================================================
//Private Access
//INSERT A NEW ARTICLE
router.post(
  "/",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("denominacion", "La Denominacion Es Obligtoria").not().isEmpty(),
    check("precioVenta", "El Precio Venta Es Obligtorio").not().isEmpty(),
    check("imagen", "La Imagen Es Obligtoria").not().isEmpty(),
    check("tiempoEstimadoCocina", "El Tiempo De Coccion Es Obligtorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  postArticulo
);

//UPDATE AN ARTICLE BY ID
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No Es Un ID Valido De Mongo").isMongoId(),
    check("id").custom(existeIDArticulo),
    check("denominacion", "La Denominacion Es Obligtoria").not().isEmpty(),
    check("precioVenta", "El Precio Venta Es Obligtorio").not().isEmpty(),
    check("imagen", "La Imagen Es Obligtoria").not().isEmpty(),
    check("tiempoEstimadoCocina", "El Tiempo De Coccion Es Obligtorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  putArticulo
);

//DELETE ONE ARTICLE BY ID
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No Es Un ID Valido De Mongo").isMongoId(),
    check("id").custom(existeIDArticulo),
    validarCampos,
  ],
  deleteArticulo
);
//=================================================

module.exports = router;
