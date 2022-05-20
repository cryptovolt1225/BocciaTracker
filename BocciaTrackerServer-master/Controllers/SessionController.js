const Player = require("../Models/PlayerModel");
const Session = require("../Models/SessionModel");

exports.sessionController = {
  getSession(req, res) {
    Session.findOne({ id: req.params.id })
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => console.log(`Error getting the data from DB: ${err}`));
  },

  getSessions(req, res) {
    if (Object.keys(req.query).length !== 0) {
      let query = {};

      Session.find(query)
        .then((docs) => {
          res.json(docs);
        })
        .catch((err) => console.log(`Error getting the data from DB: ${err}`));
    }
    Session.find({})
      .then((docs) => {
        res.json(docs);
        // console.log(docs);
        // console.log(docs.length);
      })
      .catch((err) => console.log(`Error getting the data from DB: ${err}`));
  },

  addSession(req, res) {
    console.log("here is request", req);
    const session = new Session();

    session.player_name = req.body.playerName;
    session.ball_type = req.body.ballType;
    // session.check_throw = req.body.checkThrow;
    session.throw_type = req.body.throwType;
    session.direction_from = req.body.directionFromWhiteBall;
    session.distance_from = req.body.distanceFromWhiteBall;
    session.distance = req.body.distance;
    session.video_name = req.body.video_name;

    session
      .save()
      .then((data) => {
        res.json(data);
        Player.findOne({ full_name: data.player_name }).then((data1) => {
          const session1 = new Session({ _id: data._id });
          data1.session.push(session1);
          data1.save(console.log("saved"));
          // console.log("data1", data1);
        });
      })
      .catch((err) => console.log(err));
  },

  updateSession(req, res) {
    const { body } = req;
    const session = {};
    session.id = req.params.id;
    if (body.amount_of_throws) {
      session.amount_of_throws = body.amount_of_throws;
    }
    if (body.ball_type) {
      session.ball_type = body.ball_type;
    }
    if (body.throw_type) {
      session.throw_type = body.throw_type;
    }
    if (body.distance) {
      session.distance = body.distance;
    }
    const query = { id: req.params.id };

    Session.updateOne(query, session)
      .then(() => res.json({ id: `${req.params.id}` }))
      .catch((err) => console.log(err));
  },

  deleteSession(req, res) {
    Session.deleteOne({ id: req.params.id })
      .then(() => res.json({ id: `${req.params.id}` }))
      .catch((err) => console.log(`Error deleting session from db: ${err}`));
  },
};
