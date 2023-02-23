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

//Public Access
//GET ALL Articulos
router.get("/", [validarCampos], getArticulos);
router.get(
  "/admin",
  [validarJWT, tieneRole("ADMIN_ROLE","COCINERO_ROLE"), validarCampos],
  getArticulosAdmin
);


//Public Access
//GET Articulo By ID

router.get(
  "/:id",
  [
    check("id", "No Es Un ID Valido De Mongo").isMongoId(),
    check("id").custom(existeIDArticulo),
    validarCampos,
  ],
  getArticuloByID
);

//Private Access
//POST Nuevo Articulo
router.post(
  "/",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE","COCINERO_ROLE"),
    check("denominacion", "La Denominacion Es Obligtoria").not().isEmpty(),
    check("imagen", "La Imagen Es Obligtoria").not().isEmpty(),
    check("tiempoEstimadoCocina", "El Tiempo De Coccion Es Obligtorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  postArticulo
);

//Private Access
//UPDATE Aticulo By ID
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE","COCINERO_ROLE"),
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

//Private Access
//DELETE Articulo By ID
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE","COCINERO_ROLE"),
    check("id", "No Es Un ID Valido De Mongo").isMongoId(),
    check("id").custom(existeIDArticulo),
    validarCampos,
  ],
  deleteArticulo
);

module.exports = router;
