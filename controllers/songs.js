const { response } = require("express");
const {
  getKeyByFilters,
  getChordByFilters,
  getChords,
  getTones,
  getSearchByType,
  getMostPopular,
} = require("../helpers/getBy");

const Songs = require("../models/Song");
const User = require("../models/User");
const { ChordModel } = require("../models/Chord");
const { ToneModel } = require("../models/Tone");

// Buscar todas las canciones -- Solo mientras se desarrolla

const getSongs = async (req, res = response) => {
  const songs = await Songs.find();
  res.json({
    ok: true,
    songs,
  });
};

// Obtener todos los acordes

const getAllChords = async (req, res = response) => {
  const songs = await Songs.find();

  const allChords = getChords(songs);

  res.json({
    ok: true,
    chords: allChords,
  });
};

// Obtener todos los acordes

const getAllTones = async (req, res = response) => {
  const tones = await Songs.find();

  const allTones = getTones(tones);

  res.json({
    ok: true,
    tones: allTones,
  });
};

// Crear la cancion

const createSong = async (req, res = response) => {
  const song = new Songs(req.body);
  const { email } = req.body;
  try {
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(401).json({
        msg: `El usuario ${userDB.email}, no existe.`,
      });
    }
    if (userDB.state === false) {
      return res.status(401).json({
        msg: `Ya no puedes crear mas canciones. Comunicate con el administrador.`,
      });
    }
    if (userDB.limit <= 0) {
      return res.status(401).json({
        msg: `Ya no puedes crear mas canciones. Comunicate con el administrador.`,
      });
    }

    const filter = { email: userDB.email };
    let update;

    if (userDB.limit <= 1) {
      update = { state: (userDB.state = false), limit: userDB.limit - 1 };
    } else {
      update = { limit: userDB.limit - 1 };
    }

    await User.findOneAndUpdate(filter, update);
    const songGuardado = await song.save();
    return res.json({
      ok: true,
      song: songGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

// Crear el acorde mas popular

const createPopularChord = async (req, res = response) => {
  const newChord = new ChordModel(req.body);
  const { chord } = req.body;
  try {
    let createChord;
    const fC = await ChordModel.findOne({ chord });

    if (fC === null || fC.length < 0 || fC === undefined) {
      createChord = await newChord.save();
    } else {
      const id = fC._id;
      createChord = await ChordModel.findByIdAndUpdate(
        id,
        { $inc: { searches: 1 } },
        { new: true }
      );
    }
    return res.status(200).json({ ok: true, chordSearched: createChord });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

// Crear el tono mas popular

const createPopularTone = async (req, res = response) => {
  const newTone = new ToneModel(req.body);
  const { full } = req.body;

  try {
    let createTone;
    const fT = await ToneModel.findOne({ full });

    if (fT === null || fT.length < 0 || fT === undefined) {
      createTone = await newTone.save();
    } else {
      const id = fT._id;
      createTone = await ToneModel.findByIdAndUpdate(
        id,
        { $inc: { searches: 1 } },
        { new: true }
      );
    }
    return res.status(200).json({ ok: true, toneSearched: createTone });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

// Obtener el acorde mas polular

const getPopularChord = async (req, res = response) => {
  const chords = await ChordModel.find();
  const mostPopular = getMostPopular(chords);
  return res.status(200).json({ ok: true, mostPopularChord: mostPopular });
};

// Obtener el tono mas polular

const getPopularTone = async (req, res = response) => {
  const tones = await ToneModel.find();
  const mostPopular = getMostPopular(tones);
  return res.status(200).json({ ok: true, mostPopularTone: mostPopular });
};

// Filtrar por acorde

const getChordByFilter = async (req, res = response) => {
  const url = require("url");
  const songs = await Songs.find();
  const q = url.parse(req.url, true).query;
  const qs = url.parse(req.url, true).search;

  const songChordsMatches = getChordByFilters(songs, Object.values(q));

  return res.status(200).json({ qs, q, songChordsMatches });
};
// Filtrar por tono

const getKeyByFilter = async (req, res = response) => {
  const url = require("url");
  // const qstring = require("querystring");

  const songs = await Songs.find();
  const q = url.parse(req.url, true).query;
  const qs = url.parse(req.url, true).search;
  // console.log({ q, qs });
  // console.log(Object.values(q), Object.keys(q));

  const songTonesMatches = getKeyByFilters(songs, Object.values(q));
  return res.status(200).json({ qs, q, songTonesMatches });
};

// Obtener por tono

const getSongByKey = async (req, res = response) => {
  const url = require("url");

  const songs = await Songs.find();
  const q = url.parse(req.url, true).query;
  const qs = url.parse(req.url, true).search;

  const songTonesMatches = getSearchByType(songs, Object.values(q)[0], "tones");

  return res.status(200).json({ qs, q, songTonesMatches });
  // return res.json({ qs, q });
};

// Obtener por acorde

const getSongByChord = async (req, res = response) => {
  const url = require("url");
  const songs = await Songs.find();
  const q = url.parse(req.url, true).query;
  const qs = url.parse(req.url, true).search;
  const songTonesMatches = getSearchByType(
    songs,
    Object.values(q)[0],
    "chords"
  );
  return res.status(200).json({ qs, q, songTonesMatches });
};

// Editar canciones

const editSong = async (req, res = response) => {
  const songId = req.params.id;

  try {
    const song = await Songs.findById(songId);

    if (!song) {
      return res.status(404).json({
        ok: false,
        msg: "La cancion no existe por ese id",
      });
    }

    //Se le agrega el id ya que eso no viene en el req.body
    const newSong = {
      ...req.body,
      // user: req.uid,
    };

    // Para que retorne el evento recien actualizado {new: true} sino retorna el viejo objecto
    const songActualizado = await Songs.findByIdAndUpdate(songId, newSong, {
      new: true,
    });

    res.json({
      ok: true,
      evento: songActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

// Eliminar canciones

const deleteSong = async (req, res = response) => {
  const songId = req.params.id;

  try {
    const song = await Songs.findById(songId);

    if (!song) {
      return res.status(404).json({
        ok: false,
        msg: "La cancion no existe por ese id",
      });
    }

    // Para que retorne el evento recien actualizado {new: true} sino retorna el viejo objecto
    const songEliminado = await Songs.findByIdAndDelete(songId);
    if (songEliminado) {
      res.json({
        ok: true,
        msg: "Cancion eliminado",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getSongs,
  getAllChords,
  getAllTones,
  createSong,
  createPopularChord,
  getPopularChord,
  getPopularTone,
  createPopularTone,
  getSongByKey,
  getSongByChord,
  getKeyByFilter,
  getChordByFilter,
  deleteSong,
  editSong,
};
