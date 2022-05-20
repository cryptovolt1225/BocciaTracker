const Player = require("../Models/PlayerModel");
const Coach = require("../Models/CoachModel");

exports.playerController = {
  getPlayer(req, res) {
    Player.findOne({ id: req.params.id })
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => console.log(`Error getting the data from DB: ${err}`));
  },

  getPlayers(req, res) {
    if (Object.keys(req.query).length !== 0) {
      let query = {};

      Player.find(query)
        .then((docs) => {
          res.json(docs);
        })
        .catch((err) => console.log(`Error getting the data from DB: ${err}`));
    }
    Player.find({})
      .then((docs) => {
        res.json(docs);
        console.log(docs);
        console.log(docs.length);
      })
      .catch((err) => console.log(`Error getting the data from DB: ${err}`));
  },

  addPlayer(req, res) {
    const player = new Player();

    Player.findOne({ email: req.body.playerEmail }).then((playerExists) => {
      if (playerExists) {
        return res
          .status(400)
          .json({ message: " A player with this email exists already" });
      }

      player.full_name = req.body.playerFullName;
      player.email = req.body.playerEmail;
      player.phone = req.body.playerPhone;
      player.classification = req.body.playerClassification;
      player.diagnosis = req.body.playerDiagnosis;
      player.coach_name = req.body.coachName;
      player.coach_id = req.body.coachID;

      player
        .save()
        .then((data) => {
          res.json(data);
          Coach.findOne({ _id: data.coach_id }).then((dataNew) => {
            const playerNew = new Player({ _id: data._id });
            dataNew.player.push(playerNew);
            dataNew.save(console.log("Added new player to coach array"));
          });
        })
        .catch((err) => console.log(err));
    });
  },

  updatePlayer(req, res) {
    const { body } = req;
    const player = {};
    player.id = req.params.id;
    if (body.full_name) {
      player.full_name = body.full_name;
    }
    if (body.email) {
      player.email = body.email;
    }
    if (body.phone) {
      player.phone = body.phone;
    }
    if (body.classification) {
      player.classification = body.classification;
    }
    if (body.diagnosis) {
      player.diagnosis = body.diagnosis;
    }
    if (body.coach) {
      player.coach = body.coach;
    }
    const query = { id: req.params.id };

    Player.updateOne(query, player)
      .then(() => res.json({ id: `${req.params.id}` }))
      .catch((err) => console.log(err));
  },

  deletePlayer(req, res) {
    Player.deleteOne({ id: req.params.id })
    .then(() => res.json({ id: `${req.params.id}` }))
    .catch((err) => console.log(`Error deleting session from db: ${err}`));
  },
};
