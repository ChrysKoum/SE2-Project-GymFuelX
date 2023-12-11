"use strict";

/**
 * Create a report to this recipe
 * <ΛΑ-5> Ο χρήστης θα πρέπει να μπορεί να κάνει αναφορά σε συνταγές για τυχόν λάθη
 *
 * userID Integer the User's ID
 * recipeID Integer the recipe's ID
 * no response value expected for this operation
 **/
exports.createDietReport = function (userID, recipeID) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
};

/**
 * Create a report to this gymprogram
 * <ΛΑ-6> Ο χρήστης θα πρέπει να μπορεί να κάνει αναφορά σε προγράμματα γυμναστικής για τυχόν λάθη ή δυσαρέσκεια.
 *
 * userID Integer the User's ID
 * no response value expected for this operation
 **/
exports.createGymReport = function (userID) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
};
