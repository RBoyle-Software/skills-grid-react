const { User } = require('../models/UserModel');
// const mongoose = require('mongoose');

const userController = {};


userController.getUserSkills = (req, res, next) => {
    // console.log('Hit getUserSkills');

    // const currentUserId = req.user.userId;
    const currentUserId = 'TEST_ID';

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
        });
}


module.exports = userController;
