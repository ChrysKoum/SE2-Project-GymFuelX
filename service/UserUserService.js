'use strict';


const serviceUtils = require("./serviceUtils");
/**
 * Add details to user's profile
 * <ΛΑ-10>   Ο χρήστης πρέπει να μπορεί να προσθέτει προσωπικές πληροφορίες στο προφίλ του  
 *
 * body User_body 
 * returns User
 **/
exports.addUserDetails = function (body) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    if (body) {
      examples["application/json"] = serviceUtils.generateUserData();
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    }
    else {
      reject();
    }
  });
}


/**
 * Edit details to user's profile
 * <ΛΑ-11>   Ο χρήστης πρέπει να μπορεί να επεξεργάζεται τις προσωπικές πληροφορίες στο προφίλ του. 
 *
 * body User_userID_body 
 * userID Integer The user's ID
 * returns User
 **/
exports.editUserDetails = function (body, userID) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = serviceUtils.generateUserData();
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a user's details
 * <ΛΑ-11>   Ο χρήστης πρέπει να μπορεί να επεξεργάζεται τις προσωπικές πληροφορίες στο προφίλ του. 
 *
 * userID Integer The user's ID
 * returns User
 **/
exports.getUserDetails = function (userID) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    if (userID) {
      examples["application/json"] = serviceUtils.generateUserData();
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

