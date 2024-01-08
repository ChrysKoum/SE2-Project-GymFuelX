'use strict';


/**
 * Get a customized gym program
 * <ΛΑ-2>   Ο χρήστης πρέπει να μπορεί να λαμβάνει προγράμματα γυμναστικής και πρόγραμμα διατροφής βασισμένα σε προσωπικές πληροφορίες. 
 *
 * userID Integer the user's ID
 * returns GymProgram
 **/
exports.getGymProgram = function(userID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "GymProgramDetails" : [ {
    "exerciseDescription" : "exerciseDescription",
    "explanationVideo" : "explanationVideo",
    "exerciseID" : 0,
    "exerciseTitle" : "exerciseTitle"
  }, {
    "exerciseDescription" : "exerciseDescription",
    "explanationVideo" : "explanationVideo",
    "exerciseID" : 0,
    "exerciseTitle" : "exerciseTitle"
  } ],
  "gymProgramID" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

