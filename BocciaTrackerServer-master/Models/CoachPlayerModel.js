const { Schema, model } = require("mongoose");

const coachPlayerSchema = new Schema(
	{
		coach: { type: Schema.Types.ObjectId, ref: "Coach" },
		player: { type: Schema.Types.ObjectId, ref: "Player" },
	},
	{ collection: "coach-player" }
);

const CoachPlayer = model("CoachPlayer", coachPlayerSchema);
module.exports = CoachPlayer;
