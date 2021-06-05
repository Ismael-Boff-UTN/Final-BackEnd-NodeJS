const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El Nombre Es Requerido"],
  },
  apellido: {
    type: String,
    required: [true, "El Apellido Es Requerido"],
  },
  telefono: {
    type: Number,
    required: [false, "El Telefono Es Requerido"],
    default: 0,
  },
  email: {
    type: String,
    required: [true, "El Email Es Requerido"],
  },
  domicilio: {
    type: Schema.Types.Mixed,
    ref: "domicilio",
    required: [false, "El Domicilio Es Requerido"],
    default: { localidad: "", calle: "", numero: "" },
  },

  password: {
    type: String,
    required: [true, "La Contraseña Es Requerida"],
  },
  img: {
    type: String,
    default: "https://img.icons8.com/fluent/48/000000/user-male-circle.png"
  },
  rol: {
    type: String,
    required: [true, "El Rol Es Requerido"],
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE","COCINERO_ROLE","DELIVERY_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  pedidos: [{ type: Schema.Types.Mixed }],
});

//Todo Lo Agregado Aqui Se Excluye Del Response...
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;

  return usuario;
};

module.exports = model("usuarios", UsuarioSchema);
