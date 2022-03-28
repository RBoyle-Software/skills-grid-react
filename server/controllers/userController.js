const { User } = require('../models/UserModel');
const mongoose = require('mongoose');

const userController = {};


const extractSub = (sub) => {
  return sub.slice(sub.indexOf('|') + 1);
}



const initialSkills = () => {
  const skills = [];
  skills.length = 16;
  skills.fill({status: 'outstanding', value: ''}, 0, 16);
  return skills;
}


userController.findOrCreateUser = (req, res, next) => {

  const newUser = {
    userId: profile.id,
    email: profile.emails[0].value,
    displayName: profile.name.givenName,
    imageUrl: profile.photos[0].value,
    provider: profile.provider,
    boardContent: initialSkills()
  }

  const userId = extractSub(req.oidc.user.sub);
  console.log(userId);

  try {
    const user = User.findOne( { userId: userId } );

    if (user) {
      res.locals.user = user;
      console.log(user);
    }
    else {
      user = User.create(newUser);
      console.log(user);
    }
  }
  catch (err) {
    console.error(err);
  }

  return next();
}


userController.getUserSkills = (req, res, next) => {
  console.log('Hit getUserSkills');

  const currentUserId = extractSub(req.oidc.user.sub);

  User.findOne({ userId: currentUserId }, (err, foundUser) => {
    if (err) {
      return next(err);
    }
    res.locals.skills = foundUser.boardContent;
    return next();
  });
}


userController.updateUserSkills = (req, res, next) => {

  const index = req.body.index;
  // const updateId = res.req.user.userId;
  const updateId = 'TEST_ID';
  const updateObject = {
    status: req.body.status,
    value: req.body.value
  };

  User.findOneAndUpdate(
    { userId: updateId },
    { [`boardContent.${index}`]: updateObject },
    // { returnDocument: 'after' },
    (err, update) => {
      if (err) {
          return next(err);
      }
      // console.log(update);
      return next();
    }
  );
}


module.exports = userController;
