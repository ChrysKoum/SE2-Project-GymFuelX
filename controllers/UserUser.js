'use strict';

var utils = require('../utils/writer.js');
/**
 * Controller for handling user-related operations.
 * @module UserUser
 */
var UserUser = require('../service/UserUserService');

module.exports.addUserDetails = function addUserDetails (req, res, next, body) {
  UserUser.addUserDetails(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editUserDetails = function editUserDetails (req, res, next, body, userID) {
  UserUser.editUserDetails(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserDetails = function getUserDetails (req, res, next, userID) {
  UserUser.getUserDetails(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
