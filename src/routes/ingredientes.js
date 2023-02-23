const { Router } = require("express");
const {
  getIngredientes,
  getIngredienteByID,
  postIngrediente,
  putIngrediente,
  deleteIngrediente
} = require("../controllers/ingredientesController");
const { validarJWT } = require("../middlewares/validar-jwt");
const { tieneRole } = require("../middlewares/validar-roles");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

//================================================
//Pending Type Access

router.get("/", [validarCampos], getIngredientes);

//GET ONE ARTICLE BY ID
router.get("/:id", [validarCampos], getIngredienteByID);
//================================================
//Private Access

router.post(
  "/",
  [validarJWT, tieneRole("ADMIN_ROLE","COCINERO_ROLE"), validarCampos],
  postIngrediente
);

//UPDATE AN ARTICLE BY ID
router.put(
  "/:id",
  [validarJWT, tieneRole("ADMIN_ROLE","COCINERO_ROLE"), validarCampos],
  putIngrediente
);

//DELETE ONE ARTICLE BY ID
router.delete(
  "/:id",
  [validarJWT, tieneRole("ADMIN_ROLE","COCINERO_ROLE"), validarCampos],
  deleteIngrediente
);
//=================================================

module.exports = router;
