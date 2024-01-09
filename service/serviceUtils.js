
// generateReportData() : This function is used to generate dummy data for report.
exports.generateReportData = function() {
    return [ {
        "ByUser" : 6,
        "ID" : 0,
        "isGym-Diet" : true
    }, {
        "ByUser" : 6,
        "ID" : 0,
        "isGym-Diet" : true
    } ];
}

// generateUserData() : This function is used to generate dummy data for user.
exports.generateUserData = function() {
    return {
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
}

exports.generateRecipeData = function () {
  return {
    "IngredientsName": ["IngredientsName", "IngredientsName"],
    "difficulty": "difficulty",
    "servings": "servings",
    "recipeType": "recipeType",
    "Instructions": ["Instructions", "Instructions"],
    "NutritionalTable": ["NutritionalTable", "NutritionalTable"],
    "IngredientsQuantity": ["IngredientsQuantity", "IngredientsQuantity"],
    "time": 6,
    "recipeID": 0,
    "imgRecipe": "imgRecipe",
  };
};