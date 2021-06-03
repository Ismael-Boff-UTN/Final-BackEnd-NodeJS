const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn, renewToken, adminLogin } = require("../controllers/authController");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validarCampos");
const { tieneRole } = require("../middlewares/validar-roles");

const router = Router();

//EndPoint http://localhost:4000/api/auth/login
router.post(
  "/login",
  [
    check("email", "El Email Es Requerido").isEmail(),
    check("password", "La Contraseña Es Requerida").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/admin-login",
  [
    check("email", "El Email Es Requerido").isEmail(),
    check("password", "La Contraseña Es Requerida").not().isEmpty(),
    validarCampos,
  ],
  adminLogin
);

router.post(
  "/google",
  [
    check("id_token", "El id_token Es Requerido").not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);

router.get('/renewtoken',[validarJWT],renewToken);

module.exports = router;
