// function helper for make the response object
const makeResponse = require('./utils/makeResponse');
const userController = require('../../Controllers/UserController');
const { coachController } = require('../../Controllers/CoachController');

module.exports = async (req, res) => {
  let newUserDoc = await coachController.create(req.body);

  // handle error
  if (newUserDoc === null) {
    res.status(400).send('an error ocurred while creating new user');
  } // ----------------------------------------
  else {
    console.log("signUp", newUserDoc)
    // const bodyRes = makeResponse(newUserDoc);
    res.send("Success");
  }
};
