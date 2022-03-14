const { Schema, model } = require("mongoose");
const { ChordSchema } = require("./Chord");
const { ToneSchema } = require("./Tone");

const SongSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tones: {
    type: [ToneSchema],
    required: true,
  },
  chords: {
    type: [ChordSchema],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: true,
  },
});

//La modificacion es solo al verlo pero no al guardarlo en la base de datos
SongSchema.method("toJSON", function () {
  //Forma de sacar el _id y convertirlo a id
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Song", SongSchema);
