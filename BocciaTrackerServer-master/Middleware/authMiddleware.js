const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //get token from cookie
  const token = req.cookies.token;

  //verify token
  jwt.verify(token, req.app.get("api_secret_key"), (err, decoded) => {
    if (err) return next();

    req.user_id = decoded.id;
    req.browserInfo = decoded.browserInfo; //browser information
  });

  //compare browser information and ID's
  if (
    !(
      req.user_id == req.session.userID &&
      req.headers["user-agent"] == req.session.browserInfo &&
      req.headers["user-agent"] == req.browserInfo
    )
  )
    return next();

  next();
};
