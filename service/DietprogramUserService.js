"use strict";

/**
 * Get user's diet program
 * <ΛΑ-2>   Ο χρήστης πρέπει να μπορεί να λαμβάνει προγράμματα γυμναστικής και πρόγραμμα διατροφής βασισμένα σε προσωπικές πληροφορίες.
 *
 * userID Integer The user's ID
 * returns DietProgram
 **/
exports.getDietProgram = function (userID) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      dayDietProgramIDs: [
        [0, 0],
        [0, 0],
      ],
      recipeIDs: [6, 6],
      dietProgramID: 1,
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
