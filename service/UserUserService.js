"use strict";
const serviceUtils = require("./serviceUtils");
/**
 * Add details to user's profile
 * <ΛΑ-10>   Ο χρήστης πρέπει να μπορεί να προσθέτει προσωπικές πληροφορίες στο προφίλ του
 *
 * body User_body
 * returns User
 **/
exports.addUserDetails = function (body) {
  return serviceUtils.getUserExampleResponse();
};

/**
 * Edit details to user's profile
 * <ΛΑ-11>   Ο χρήστης πρέπει να μπορεί να επεξεργάζεται τις προσωπικές πληροφορίες στο προφίλ του.
 *
 * body User_userID_body
 * userID Integer The user's ID
 * returns User
 **/
exports.editUserDetails = function (body, userID) {
  return serviceUtils.getUserExampleResponse();
};

/**
 * Get a user's details
 * <ΛΑ-11>   Ο χρήστης πρέπει να μπορεί να επεξεργάζεται τις προσωπικές πληροφορίες στο προφίλ του.
 *
 * userID Integer The user's ID
 * returns User
 **/
exports.getUserDetails = function (userID) {
  return serviceUtils.getUserExampleResponse();
};
