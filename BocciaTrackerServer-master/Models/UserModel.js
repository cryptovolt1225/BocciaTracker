const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// setting user schema
const UserSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    match: [/[a-zA-Z0-9]/, 'is invalid'],
    required: [true, 'cant be blank'],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    // not allow white spaces
    trim: true,
  },
},
  { collection: "users" }
);

// create user model
const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
