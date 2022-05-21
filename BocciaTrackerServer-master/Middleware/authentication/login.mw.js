const { coachController } = require("../../Controllers/CoachController");
const userController = require("../../Controllers/UserController");
const makeResponse = require("./utils/makeResponse");
const validateUserPassword = require("./utils/validateUserPassword");

const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await coachController.findByEmail(email);

  console.log("usrDoc", userDoc);
  console.log("usrDoc password", userDoc.password);
  
  // handle error
  if (userDoc === null) {
    res.status(400).send("error trying to find user");
  } else if (!userDoc) {
    res.status(404).send("no user found");
  } // ----------------------------------------
  else {
    if(bcrypt.compare(req.body.password, userDoc.password)){
    // if (userDoc.password === hash) {
      const bodyRes = makeResponse(userDoc);
      res.status(200).send(bodyRes);
      // res.status(200).send('Success')
    } else res.status(400).send("no user found");
    // validate password from database with the one from request
    // const correctPassword = await validateUserPassword(
    //   userDoc.password,
    //   password
    // );

    // if (correctPassword) {
    //   const bodyRes = makeResponse(userDoc);
    //   res.status(200).send(bodyRes);
    // } else {
    //   res.status(401).send('Incorrect Password');
    // }
  }
};