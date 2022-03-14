const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      songs: "/api/songs",
    };

    // Conectar la base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // lectura y perso del bodu
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));
  }

  async conectarDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.songs, require("../routes/songs"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
