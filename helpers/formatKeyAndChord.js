const { response } = require("express");
const { notes, notesExpressions } = require("./regExp");

const checkChord = (value, { req, location, path }) => {
  //   if (!value) return false;

  const { chord } = req.params;
  const chordSplit = chord.split("-");

  //Filtrar y obtener primero cada nota

  const onlyChords = chordSplit.filter((singleChord) => {
    if (!singleChord.match(notesExpressions)) return singleChord;
  });

  //Luego filtrar devolver false al estar en min
  let result = true;
  onlyChords.forEach((note) => {
    if (!note.match(notes)) {
      result = false;
      return;
    } else {
      result = true;
    }
  });

  return result;
};

const checkKey = (req, res = response, next) => {
  let key = null;
  console.log(req.query);
  Object.keys(req.query)[0] === "key" ||
  Object.keys(req.query)[0] === "note" ||
  Object.keys(req.query)[0] === "search"
    ? (key = Object.values(req.query)[0])
    : (key = null);

  if (!key.match(notes)) {
    // return false;
    res.status(400).json({
      msg: "La tonalidad no tiene un formato correcto",
    });
  } else {
    next();
  }
};

module.exports = { checkChord, checkKey };
