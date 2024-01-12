'use strict';

var utils = require('../utils/writer.js');
/**
 * Controller for handling user-related operations.
 * @module UserUser
 */
var UserUser = require('../service/UserUserService');

module.exports.addUserDetails = function addUserDetails(
  req,
  res,
  ...args
) {
  // Assuming args[0] is 'body'
  const [body] = args;
  UserUser.addUserDetails(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editUserDetails = function editUserDetails(
  req,
  res,
  ...args
) {
  // Assuming args[0] is 'body', args[1] is 'userID'
  const [body, userID] = args;
  UserUser.editUserDetails(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserDetails = function getUserDetails(
  req,
  res,
  ...args
) {
  // Assuming args[0] is 'userID'
  const [userID] = args;
  UserUser.getUserDetails(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
