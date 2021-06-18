const { Router, response, json } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { tieneRole } = require("../middlewares/validar-roles");
const { validarCampos } = require("../middlewares/validarCampos");
const {
  postCategorias,
  getCategoriasAdmin,
  getCategorias,
  getCategoriasByID,
  putCategorias,
  deleteCategorias,
} = require("../controllers/categoriasController");
const { existeIDCategoria } = require("../helpers/db-validadores");

const router = Router();

//Obtener Todas Las Categorias - Tipo Publico
router.get("/", [], getCategorias);

router.get(
  "/admin",
  [validarJWT, tieneRole("ADMIN_ROLE"), validarCampos],
  getCategoriasAdmin
);

//Obtener Una Categoria Por ID - Tipo Publico
router.get(
  "/:id",
  [
    check("id", "No Es Un ID Valido De Mongo").isMongoId(),
    check("id").custom(existeIDCategoria),
    validarCampos,
  ],
  getCategoriasByID
);

//Agregar Una Nueva Categoria - Tipo Privado, Solo ADMIN
router.post(
  "/",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("nombre", "El Nombre Es Obligtorio").not().isEmpty(),
    validarCampos,
  ],
  postCategorias
);
//Editar Una Categoria - Tipo Privado, Solo ADMIN
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No Es Un ID Valido De Mongo").isMongoId(),
    check("id").custom(existeIDCategoria),
    check("nombre", "El Nombre Es Obligtorio").not().isEmpty(),
    validarCampos,
  ],
  putCategorias
);
//Eliminar Una Categoria - Tipo Privado, Solo ADMIN
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No Es Un ID Valido De Mongo").isMongoId(),
    check("id").custom(existeIDCategoria),
    validarCampos,
  ],
  deleteCategorias
);

module.exports = router;
