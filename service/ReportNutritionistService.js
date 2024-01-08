'use strict';
const serviceUtils = require("./serviceUtils");

/**
 * delete recipe report
 * <ΛΑ-9>   Ο διατροφολόγος πρέπει να μπορεί να βλέπει τις αναφορές που γίνονται από τους χρήστες στις συνταγές. 
 *
 * nutritionistID Integer The nutritionist ID that delete the recipe report
 * reportID Integer The ID of the recipe report that is being deleted.
 * no response value expected for this operation
 **/
exports.deleteRecipeReport = function() {
  return serviceUtils.resolveNoValue();
}


/**
 * Get recipe report
 * <ΛΑ-9>   Ο διατροφολόγος πρέπει να μπορεί να βλέπει τις αναφορές που γίνονται από τους χρήστες στις συνταγές. 
 *
 * nutritionistID Integer The nutritionist ID that see the recipe report
 * reportID Integer The ID of the recipe report.
 * returns Report
 **/
exports.getRecipeReport = function() {
  return new Promise(function(resolve) {
    var examples = {};
    examples['application/json'] = {
  "ByUser" : 6,
  "ID" : 0,
  "isGym-Diet" : true
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get recipe reports
 * <ΛΑ-9>   Ο διατροφολόγος πρέπει να μπορεί να βλέπει τις αναφορές που γίνονται από τους χρήστες στις συνταγές. 
 *
 * nutritionistID Integer The nutritionist ID that see the recipe reports
 * returns AllReport
 **/
exports.getRecipeReports = function () {
  return serviceUtils.getReportExampleResponse();
};


/**
 * Update/Correct recipe report
 * <ΛΑ-9>   Ο διατροφολόγος πρέπει να μπορεί να βλέπει τις αναφορές που γίνονται από τους χρήστες στις συνταγές. 
 *
 * body List 
 * nutritionistID Integer The nutritionist ID that update the recipe report
 * reportID Integer The ID of the recipe report that is being updated.
 * no response value expected for this operation
 **/
exports.updateRecipeReport = function() {
  return serviceUtils.resolveNoValue();
}

