const express = require("express");
require("dotenv").config();
require("./db_conection");

const multer = require("multer");
const { exec } = require("child_process");

const { CoachRouter } = require("./Routers/CoachRouter");
const { PlayerRouter } = require("./Routers/PlayerRouter");
const { SessionRouter } = require("./Routers/SessionRouter");
const { UserRouter } = require("./Routers/UserRouter")

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
  res.set("Content-Type", "application/json", "video/webm", "video/mpeg");
  next();
});

app.use("/api/coaches", CoachRouter);
app.use("/api/players", PlayerRouter);
app.use("/api/sessions", SessionRouter);
app.use("/api/users", UserRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something is broken!");
});

const CoachPlayer = require("./Models/CoachPlayerModel");
const { Schema, model } = require("mongoose");
const Player = require("./Models/PlayerModel");

app.get("/api/coach/:id/players", async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const data = await CoachPlayer.find({ coach: id }).populate("player");
  res.json(data);
});

app.get("/api/player/:id/coach", async (req, res) => {
  const { id } = req.params;
  const data = await CoachPlayer.findOne({ player: id }).populate("coach");
  res.json(data);
});

// app.post("/playercoach", async (req, res) => {
//   const player = new Player();
//   player.full_name = req.body.playerFullName;
//   player.email = req.body.playerEmail;
//   player.phone = req.body.playerPhone;
//   player.classification = req.body.playerClassification;
//   player.diagnosis = req.body.playerDiagnosis;
//   player.coach = req.body;
//   //player.coach

//   player
//   .save()
//   .then((data) => {
// 	res.json(data);
// 	CoachPlayer.findOne({ id: data.coachID }).then((data1) => {
// 	  const player1 = new CoachPlayer({ _id: data._id });
// 	  data1.player.push(player1);
// 	  data1.save(console.log("saved"));
// 	  console.log("data1", data1);
// 	});
//   })
//   .catch((err) => console.log(err));
// });

var storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });

app.post("/upload_files", upload.single("file"), function (req, res) {
  console.log(req.body);
  //

  exec(
    `python pythonTest.py --throw_type ${req.body.throwType} --input ./${req.file.path}`, 
    (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
      console.log(`Number of files ${stdout}`);
    }
  );

  console.log(req.file.path);
});

app.listen(port, () => console.log("Express server is running on port ", port));
