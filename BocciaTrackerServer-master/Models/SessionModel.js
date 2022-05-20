const { Schema, model } = require("mongoose");

const sessionSchema = new Schema(
  {
    player_name: { type: String },
    ball_type: { type: String },
    check_throw: { type: String },
    throw_type: { type: String },
    direction_from: {type: Number},
    distance_from: {type: String},
    distance: { type: String },
    video_name : { type: String },
  },
  { collection: "sessions" }
);

const Session = model("Session", sessionSchema);
module.exports = Session;
