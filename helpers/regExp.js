// bemol = ♭ &#9837;
// sharp = ♯ &#9839;

const notes = /([A-G])/g;
const notesExpressions =
  /\b(sharp|♯|slash|flat|♭|minor|dim|sus|sus2|sus4|7sus2|7sus4|aug7|6\/9|add)|([1-9])|(\+|\+7)\b/g;

module.exports = { notes, notesExpressions };
