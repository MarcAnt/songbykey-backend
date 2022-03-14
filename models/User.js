const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  limit: {
    type: Number,
    default: 50,
  },
  song: {
    type: Schema.Types.ObjectId,
    ref: "Song",
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
