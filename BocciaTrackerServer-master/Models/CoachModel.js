const { Schema, model } = require("mongoose");
const player = require('./PlayerModel')

const coachSchema = new Schema(
  {
    // _id: {type: Schema.Types.ObjectId, required: false},
    full_name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    //  date_begin: { type: Date , default: Date.now},
    player:  [{ type: Schema.Types.ObjectId, ref: "Player" }],
    password: {
      type: String,
      required: true,
      // not allow white spaces
      trim: true,
    },
  },
  { collection: "coaches" }
);

const Coach = model("Coach", coachSchema);
module.exports = Coach;
