'use strict';

var utils = require('../utils/writer.js');
/**
 * Controller for managing exercise users.
 * @module ExerciseUser
 */
var ExerciseUser = require('../service/ExerciseUserService');

module.exports.getExcercise = function getExcercise (req, res, next, ...args) {
  // Assuming args[0] is 'userID', args[1] is 'excerciseID'
  const [userID, excerciseID] = args;
  ExerciseUser.getExcercise(userID, excerciseID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
