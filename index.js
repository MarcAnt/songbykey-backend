const express = require("express");

const { dbConnection } = require("./database/config");
// Permite usar las variables de entorno
require("dotenv").config();

const cors = require("cors");
const app = express();

//base de datos
dbConnection();

// Middleware para los cors
app.use(cors());

// Usar el directorio publico
app.use(express.static("public"));
// Habilitar json
app.use(express.json());
// Permite que los formularios se envien y pueden ser vistos como objetos
app.use(express.urlencoded({ extended: false }));

// Rutas
// Auth routes
// app.use("/api/auth", require("./routes/auth"));
// Songs routes
app.use("/api/songs", require("./routes/songs"));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
