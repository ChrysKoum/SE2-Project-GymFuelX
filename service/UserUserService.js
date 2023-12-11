'use strict';


/**
 * Add details to user's profile
 * <ΛΑ-10>   Ο χρήστης πρέπει να μπορεί να προσθέτει προσωπικές πληροφορίες στο προφίλ του  
 *
 * body User_body 
 * returns User
 **/
exports.addUserDetails = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "birthday" : "2000-01-23T04:56:07.000+00:00",
  "meal" : "meal",
  "allergies" : "allergies",
  "goal" : "goal",
  "gender" : "gender",
  "level" : "level",
  "weight" : 1.4658129805029452,
  "restrictions" : "restrictions",
  "userID" : 0,
  "username" : "username",
  "height" : 6.027456183070403
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
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
exports.editUserDetails = function(body,userID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "birthday" : "2000-01-23T04:56:07.000+00:00",
  "meal" : "meal",
  "allergies" : "allergies",
  "goal" : "goal",
  "gender" : "gender",
  "level" : "level",
  "weight" : 1.4658129805029452,
  "restrictions" : "restrictions",
  "userID" : 0,
  "username" : "username",
  "height" : 6.027456183070403
};
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
exports.getUserDetails = function(userID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "birthday" : "2000-01-23T04:56:07.000+00:00",
  "meal" : "meal",
  "allergies" : "allergies",
  "goal" : "goal",
  "gender" : "gender",
  "level" : "level",
  "weight" : 1.4658129805029452,
  "restrictions" : "restrictions",
  "userID" : 0,
  "username" : "username",
  "height" : 6.027456183070403
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

