'use strict';


/**
 * Get a specific excercise's details
 * <ΛΑ-4>   Ο χρήστης θα πρέπει να μπορεί να δει πληροφορίες για κάθε άσκηση γυμναστικής  
 *
 * userID Integer The user's ID
 * excerciseID Integer The ID of the excercise
 * returns Exercise
 **/
exports.getExcercise = function() {
  return new Promise(function(resolve) {
    var examples = {};
    examples['application/json'] = {
  "exerciseDescription" : "exerciseDescription",
  "explanationVideo" : "explanationVideo",
  "exerciseID" : 0,
  "exerciseTitle" : "exerciseTitle"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

