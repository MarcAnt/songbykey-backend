const { Schema, model } = require("mongoose");

// const ToneSchema = Schema({
//   tone: {
//     type: String,
//     required: true,
//   },
//   searches: {
//     type: Number,
//     required: true,
//   },
// });
const ToneSchema = Schema({
  tonic: {
    type: String,
    required: true,
  },
  keySignature: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  full: {
    type: String,
    required: true,
  },
  searches: {
    type: Number,
    required: true,
  },
});

//La modificacion es solo al verlo pero no al guardarlo en la base de datos
ToneSchema.method("toJSON", function () {
  //Forma de sacar el _id y convertirlo a id
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const ToneModel = model("Tone", ToneSchema);
module.exports = { ToneModel, ToneSchema };
// module.exports = { ToneSchema };
