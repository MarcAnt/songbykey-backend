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
const { checkKey } = require("../helpers/formatKeyAndChord");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Obtener todas la canciones
router.post("/", getSongs);

// ontener todos los acordes
router.post("/chords", getAllChords);

// Buscar por acorde
router.post("/chord", [checkKey, validarCampos], getSongByChord);

// Fltrar por acorde
router.post("/search/chord/", [checkKey, validarCampos], getChordByFilter);

// Crear el acorde mas buscado
router.post("/create-popular-chord", createPopularChord);

// Obtener el acorde mas buscado
router.post("/get-popular-chord", getPopularChord);

// obtener todos los tonos
router.post("/tones", getAllTones);

// Buscar por tono
router.post("/key", [checkKey, validarCampos], getSongByKey);

// Filtrar por tonalidad
router.post("/search/key", [checkKey, validarCampos], getKeyByFilter);

// Crear el acorde mas buscado
router.post("/create-popular-tone", createPopularTone);

// Obtener el acorde mas buscado
router.post("/get-popular-tone", getPopularTone);

// Crear songs
router.post(
  "/create",
  [
    validarJWT,
    check("user", "El user es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createSong
);

// Editar una cancion o song
router.put("/:id", editSong);

// Eliminar una cancion o song

router.delete("/:id", deleteSong);

module.exports = router;
