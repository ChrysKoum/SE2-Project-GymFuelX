'use strict';

var utils = require('../utils/writer.js');
/**
 * Controller for managing exercise users.
 * @module ExerciseUser
 */
var ExerciseUser = require('../service/ExerciseUserService');

module.exports.getExcercise = function getExcercise (req, res,  userID, excerciseID) {
  ExerciseUser.getExcercise(userID, excerciseID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
