// function helper for make the response object
const makeResponse = require('./utils/makeResponse');
const userController = require('../../Controllers/UserController');
const { coachController } = require('../../Controllers/CoachController');

const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password,salt)

  const newUser = ({
    full_name: req.body.full_name,
    email: req.body.email,
    password: hash,
  })

  let newUserDoc = await coachController.create(newUser);

  // handle error
  if (newUserDoc === null) {
    res.status(400).send('an error ocurred while creating new user');
  } // ----------------------------------------
  else {
    console.log("signUp", newUserDoc)
    // const bodyRes = makeResponse(newUserDoc);
    res.json({message: "Success", data: newUserDoc});
  }
};
