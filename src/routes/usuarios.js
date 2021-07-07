const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsuarios,
  postUsuarios,
  putUsuarios,
  deleteUsuarios,
  addPedidoUsuario,
} = require("../controllers/usuariosController");
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
//   Obtener Todos Los Usuarios
// Tipo Publico
//================================
router.get("/", [validarJWT], getUsuarios);

//================================
//   Crear Nuevo Usuario
//Tipo Publico, Se Usa Para Crear Un Usuario Desde El Login
//================================
router.post(
  "/",
  [
    check("email").custom(esEmailvalido),
    check("nombre", "Nombre Requerido").not().isEmpty(),
    check("password", "Password No Valido").isLength({ min: 6 }),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  postUsuarios
);

//================================
//   Agrega Un Pedido Al Usuario Por ID
//
//================================
router.put(
  "/addPedidoUsuario/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No Es Un ID Valido De Mongo").isMongoId(),
    check("id").custom(existeIDUsuario),
    
    validarCampos,
  ],
  addPedidoUsuario
);

//================================
//   Editar Un Usuario
// Tipo Privado, Solo Admins
//================================
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No Es Un ID Valido De Mongo").isMongoId(),
    check("id").custom(existeIDUsuario),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  putUsuarios
);

//================================
//Eliminar Un Usuario (SoftDelete)
// Tipo Privado Solo Admins
//================================
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No Es Un ID Valido De Mongo").isMongoId(),
    check("id").custom(existeIDUsuario),
    validarCampos,
  ],
  deleteUsuarios
);

module.exports = router;
