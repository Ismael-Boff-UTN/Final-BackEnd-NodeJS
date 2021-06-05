const { Schema, model } = require("mongoose");

const RolSchema = Schema({
  rol: {
    type: String,
    required: [true, "El Rol Es Requerido"],
    
  },
});

module.exports = model("roles", RolSchema);
