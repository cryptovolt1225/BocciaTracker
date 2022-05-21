const CoachModel = require("../Models/CoachModel");

const bcrypt = require("bcryptjs");

exports.coachController = {
  getCoach(req, res) {
    CoachModel.findOne({ _id: req.params.id })
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => console.log(`Error getting the data from DB: ${err}`));
  },
  create: async userData => {
    console.log("useData", userData)
    let newUserDoc;
    try {
      
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(userData.password,salt)

      const newUser = ({
        full_name: userData.full_name,
        email: userData.email,
        password: hash,
      })

      newUserDoc = await CoachModel.create(newUser);
    } catch (err) {
      console.log('An error ocurred while registering a user --');
      console.log(err.message);
      return null;
    }
    return newUserDoc;
  },
  getAll: async () => {
    let usersDoc;
    try {
      usersDoc = await CoachModel.find();
    } catch (err) {
      console.log('An error ocurred while retrieving all users --');
      console.log(err.message);
      return null;
    }
    return usersDoc;
  },
  findById: async userId => {
    let userDoc;
    try {
      userDoc = await CoachModel.findById(userId);
    } catch (err) {
      console.log('An error ocurred while searching for user by Id --');
      console.log(err.message);
      return null;
    }
    return userDoc;
  },
  findByEmail: async email => {
    let userDoc;
    console.log(email)
    try {
      userDoc = await CoachModel.findOne({ email });
    } catch (err) {
      console.log('An error ocurred while searching for user by email --');
      console.log(err.message);
      return null;
    }

    return userDoc;
  },
  updateUser: async (userId, newUserData) => {
    let updatedUserDoc;
    try {
      updatedUserDoc = await CoachModel.findByIdAndUpdate(userId, newUserData, {
        new: true,
      });
    } catch (err) {
      console.log('An error ocurred while updating user data --');
      console.log(err.message);
      return null;
    }
    return updatedUserDoc;
  },
  deleteUser: async userId => {
    let statusDelete;
    try {
      statusDelete = await CoachModel.findByIdAndRemove(userId);
    } catch (err) {
      console.log('An error ocurred while deleting user --');
      console.log(err.message);
      return null;
    }
    console.log(statusDelete);
    return statusDelete;
  },
  getCoaches(req, res) {
    if (Object.keys(req.query).length !== 0) {
      let query = {};

      CoachModel.find(query)
        .then((docs) => {
          res.json(docs);
        })
        .catch((err) => console.log(`Error getting the data from DB: ${err}`));
    }
    CoachModel.find({})
      .then((docs) => {
        res.json(docs);
        // console.log(docs);
        // console.log(docs.length);
      })
      .catch((err) => console.log(`Error getting the data from DB: ${err}`));
  },

  addCoach(req, res) {
    const coachModel = new CoachModel();

    CoachModel.findOne({ email: req.body.email }).then((coachExists) => {
      if (coachExists) {
        return res
          .status(400)
          .json({ message: " A coach with this email exists already" });
      }
      coachModel.id = req.body.id;
      coachModel.full_name = req.body.full_name;
      coachModel.email = req.body.email;
      coachModel.phone = req.body.phone;
      coachModel.player = req.body.player;

      coachModel
        .save()
        .then(() => res.json({ _id: `${coach._id}` }))
        .catch((err) => console.log(err));
    });
  },

  updateCoach(req, res) {
    const { body } = req;
    const coachModel = {};
    coachModel.id = req.params.id;
    if (body.full_name) {
      coachModel.full_name = body.full_name;
    }
    if (body.email) {
      coachModel.email = body.email;
    }
    if (body.phone) {
      coachModel.phone = body.phone;
    }
    const query = { id: req.params.id };

    CoachModel.updateOne(query, coach)
      .then(() => res.json({ id: `${req.params.id}` }))
      .catch((err) => console.log(err));
  },

  deleteCoach(req, res) {
    CoachModel.deleteOne({ id: req.params.id })
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) =>
        console.log(`Error deleting Coach from db : ${req.params.id}`)
      );
  },
};
