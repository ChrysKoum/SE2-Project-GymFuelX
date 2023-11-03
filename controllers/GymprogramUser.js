'use strict';

var utils = require('../utils/writer.js');
var GymprogramUser = require('../service/GymprogramUserService');

module.exports.getGymProgram = function getGymProgram (req, res, next, userID) {
  GymprogramUser.getGymProgram(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
