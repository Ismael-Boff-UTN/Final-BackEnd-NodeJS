const { Router } = require("express");
const { postPagoMP } = require("../controllers/mercadoPagoController");


const router = Router();

//Private Access
//POST pagomp
router.post("/" , [], postPagoMP
);


module.exports = router;
