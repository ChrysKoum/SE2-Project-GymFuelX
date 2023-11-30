"use strict";

/**
 * Get user's diet program
 * <ΛΑ-2> Ο χρήστης πρέπει να μπορεί να λαμβάνει προγράμματα γυμναστικής και πρόγραμμα διατροφής βασισμένα σε προσωπικές πληροφορίες.
 *
 * userID Integer The user's ID
 * examples Object An object containing example responses (optional for testing)
 * returns DietProgram
 **/
exports.getDietProgram = function (userID, examples) {
  return new Promise(function (resolve, reject) {
    // Set default data only if examples is not provided
    if (examples === undefined) {
      examples = {
        "application/json": {
          dayDietProgramIDs: [
            [0, 0],
            [0, 0],
          ],
          recipeIDs: [6, 6],
          dietProgramID: 1,
        },
      };
    }

    // Check if 'application/json' key exists and has data
    if (
      examples["application/json"] &&
      Object.keys(examples["application/json"]).length > 0
    ) {
      resolve(examples["application/json"]);
    } else {
      resolve();
    }
  });
};
