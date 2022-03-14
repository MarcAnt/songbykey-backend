const { response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const validarJWT = async (req, res = response, next) => {
  // leer el token de la ruta en los headers
  const token = req.header("x-token");
  console.log(token);

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    //Extraer el id del token
    const { uid } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);
    // const a = jwt.verify(token, process.env.SECRETOPRIVATEKEY);

    // leer el usuario que corresponde al uid
    const usuario = await User.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no valido - usuario no existe en DB",
      });
    }

    // Verificar si el uid tiene estado true
    if (!usuario.state) {
      return res.status(401).json({
        msg: "ususario con estado: false",
      });
    }
    if (!usuario.limit === 0) {
      return res.status(401).json({
        msg: "ususario con limite alcanzado",
      });
    }
    //Colocar en la request, el usuario
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = { validarJWT };
