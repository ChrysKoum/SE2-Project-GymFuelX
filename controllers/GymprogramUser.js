'use strict';

// Importing the required modules
var utils = require('../utils/writer.js');
var GymprogramUser = require('../service/GymprogramUserService');

// Function to get the gym program for a user
module.exports.getGymProgram = function getGymProgram (req, res,  userID) {
  GymprogramUser.getGymProgram(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
