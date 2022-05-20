const { Schema, model } = require("mongoose");
const session = require('./SessionModel')
const coach = require('./CoachModel');

const playerSchema = new Schema(
  {
    // id: {type: Schema.Types.ObjectId, ref: "Player"},
    full_name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    classification: { type: String },
    diagnosis: { type: String },
    session:  [{ type: Schema.Types.ObjectId, ref: "Session" }],
    coach_name: { type: String },
    coach_id:  { type: Schema.Types.ObjectId, ref: "Coach" },
  },
  { collection: "players" }
);

const Player = model("Player", playerSchema);
module.exports = Player;
