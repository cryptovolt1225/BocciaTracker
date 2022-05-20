// const CoachPlayer = require("../Models/CoachPlayerModel");

// exports.coachplayerController = {
// getCoachPlayer(req, res) {
// 	const { id } = req.params;
// 	const data = await CoachPlayer.find({ coach: id }).populate('player');
// 	res.json(data);
// },

// getPlayerCoach(req, res) {
// 	const { id } = req.params;
// 	const data = await CoachPlayer.findOne({ player: id }).populate('coach');
// 	res.json(data);
// }
// };