const UserModel = require('../Models/UserModel');
const CoachModel = require('../Models/CoachModel');

module.exports = {
  // create: async userData => {
  //   let newUserDoc;
  //   try {
  //     // newUserDoc = await CoachModel.create(userData);
  //     console.log(userData)
  //   } catch (err) {
  //     console.log('An error ocurred while registering a user --');
  //     console.log(err.message);
  //     return null;
  //   }
  //   return newUserDoc;
  // },
  getAll: async () => {
    let usersDoc;
    try {
      usersDoc = await UserModel.find();
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
      userDoc = await UserModel.findById(userId);
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
      userDoc = await UserModel.findOne({ email });
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
      updatedUserDoc = await UserModel.findByIdAndUpdate(userId, newUserData, {
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
      statusDelete = await UserModel.findByIdAndRemove(userId);
    } catch (err) {
      console.log('An error ocurred while deleting user --');
      console.log(err.message);
      return null;
    }
    console.log(statusDelete);
    return statusDelete;
  },
};
