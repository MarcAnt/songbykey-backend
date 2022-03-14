/*
    Rutas de Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { googleSignIn } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/google",
  [
    // check("id_token", "El id_token es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);
module.exports = router;
