const { response } = require("express");

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se Requiere Verificar El Token Primero!",
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `Este EndPoint Requiere Uno De Los Siguientes Roles [${roles}]`,
      });
    }

    next();
  };
};


module.exports ={
    tieneRole
}