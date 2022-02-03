/*
    Rutas de Songs
    host + /api/songs
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getSongs,
  getAllChords,
  createSong,
  createPopularChord,
  getPopularChord,
  createPopularTone,
  getPopularTone,
  getSongByKey,
  getKeyByFilter,
  getChordByFilter,
  getSongByChord,
  getAllTones,
  deleteSong,
  editSong,
} = require("../controllers/songs");
const { checkChord, checkKey } = require("../helpers/formatKeyAndChord");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Obtener todas la canciones
router.post("/", getSongs);

// ontener todos los acordes
router.post("/chords", getAllChords);

// ontener todos los acordes
router.post("/tones", getAllTones);

// Buscar por tono o acorde
router.post(
  "/chord",
  check("tones", "La tonalidad no tiene un formato correcto").custom(checkKey),
  validarCampos,
  getSongByChord
);

router.post(
  "/key",
  check("tones", "La tonalidad no tiene un formato correcto").custom(checkKey),
  validarCampos,
  getSongByKey
);

// Filtrar por tonalidad
router.post(
  "/search/key",
  check("tones", "La tonalidad no tiene un formato correcto").custom(checkKey),
  validarCampos,
  getKeyByFilter
);

// Fltrar por acorde
router.post(
  "/search/chord/",
  check("chords", "La tonalidad no tiene un formato correcto").custom(checkKey),
  validarCampos,
  getChordByFilter
);

// Crear songs
router.post("/create", createSong);

// Crear el acorde mas buscado
router.post("/create-popular-chord", createPopularChord);

// Obtener el acorde mas buscado
router.post("/get-popular-chord", getPopularChord);

// Crear el acorde mas buscado
router.post("/create-popular-tone", createPopularTone);

// Obtener el acorde mas buscado
router.post("/get-popular-tone", getPopularTone);

// Editar una cancion o song

router.put("/:id", editSong);

// Eliminar una cancion o song

router.delete("/:id", deleteSong);

module.exports = router;
