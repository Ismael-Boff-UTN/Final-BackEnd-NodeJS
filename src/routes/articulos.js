const { Router } = require("express");
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
  [validarJWT, tieneRole("ADMIN_ROLE"), validarCampos],
  postArticulo
);

//UPDATE AN ARTICLE BY ID
router.put(
  "/:id",
  [validarJWT, tieneRole("ADMIN_ROLE"), validarCampos],
  putArticulo
);

//DELETE ONE ARTICLE BY ID
router.delete(
  "/:id",
  [validarJWT, tieneRole("ADMIN_ROLE"), validarCampos],
  deleteArticulo
);
//=================================================

module.exports = router;
