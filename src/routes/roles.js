const { Router } = require("express");
const {
  getRoles,
  getRolByID,
  postRol,
  putRol,
  deleteRol,
} = require("../controllers/rolesController");
const { validarJWT } = require("../middlewares/validar-jwt");
const { tieneRole } = require("../middlewares/validar-roles");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

//================================================
//Public Access
//GET ALL ARTICLES
router.get("/", [validarJWT, tieneRole("ADMIN_ROLE"), validarCampos], getRoles);

//GET ONE ARTICLE BY ID
router.get(
  "/:id",
  [validarJWT, tieneRole("ADMIN_ROLE"), validarCampos],
  getRolByID
);
//================================================
//Private Access
//INSERT A NEW ARTICLE
router.post("/", [validarJWT, tieneRole("ADMIN_ROLE"), validarCampos], postRol);

//UPDATE AN ARTICLE BY ID
router.put(
  "/:id",
  [validarJWT, tieneRole("ADMIN_ROLE"), validarCampos],
  putRol
);

//DELETE ONE ARTICLE BY ID
router.delete(
  "/:id",
  [validarJWT, tieneRole("ADMIN_ROLE"), validarCampos],
  deleteRol
);
//=================================================

module.exports = router;
