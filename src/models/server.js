const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/configdb");

class Server {
  constructor() {
    //Inicializacion Del Server
    this.app = express();
    this.port = process.env.PORT;

    //Conectar DB
    this.conectarDB();
    //Middlewares
    this.middlewares();

    //Rutas Del Server
    this.routes();
  }

  async conectarDB(){
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //ParseJSON
    this.app.use(express.json());
  }
  routes() {
    this.app.use("/", require("../routes/default"));
    this.app.use("/api/usuarios", require("../routes/usuarios"));
    this.app.use("/api/auth", require("../routes/auth"));
    this.app.use("/api/categorias", require("../routes/categorias"));
    this.app.use("/api/articulos", require("../routes/articulos"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server On PORT ==> ", this.port);
    });
  }
}

module.exports = Server;
