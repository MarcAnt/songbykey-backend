const { response } = require("express");
const { validationResult } = require("express-validator");

//Crear un custom middleware que lanza el error cuando ninguno de los previos middlewares no pasan
const validarCampos = (req, res = response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  validarCampos,
};
