const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const User = require("../models/User");

const googleSignIn = async (req, res = response) => {
  const { token } = req.body;

  try {
    const { email } = await googleVerify(token);

    let user = await User.findOne({ email });

    //Si el usuario no existe hay que crearlo
    if (!user) {
      user = new User({ email });
      await user.save();
    }

    //Si el usuario esta en la DB
    if (!user.state) {
      return res
        .status(401)
        .json({ msg: "Hable cone el administrador, usuario bloqueado" });
    }

    // generar JWT
    const JWT = await generarJWT(user.id);
    console.log(JWT);
    res.json({
      user,
      JWT,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ ok: false, msg: "El token no se pudo verificar" });
  }
};

module.exports = { googleSignIn };
