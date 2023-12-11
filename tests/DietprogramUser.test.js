const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../index.js");
const { getDietProgram } = require("../service/DietprogramUserService");

const userID = generateTestUserID(); // Example of a user ID
const maxUserID = Math.pow(10, 8); // Define the maximum allowable userID

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
  });
});

test.after.always((t) => {
  t.context.server.close();
});

test("getDietProgram returns the correct structure for a valid user ID", async (t) => {
  const result = await getDietProgram(userID);

  t.truthy(result.dayDietProgramIDs, "Response should have dayDietProgramIDs");
  t.truthy(result.recipeIDs, "Response should have recipeIDs");
  t.is(
    typeof result.dietProgramID,
    "number",
    "dietProgramID should be a number"
  );
});

test("getDietProgram returns a response with the correct structure and data types", async (t) => {
  const userID = generateTestUserID(); // Function that generates a valid userID

  const { body, statusCode } = await t.context.got.get(
    `user/${userID}/dietprogram`
  );

  // Assuming the API returns a 200 status code for valid requests
  t.is(statusCode, 200, "Should return 200 OK for valid userID");

  // Validate the response structure
  t.true(
    Array.isArray(body.dayDietProgramIDs),
    "dayDietProgramIDs should be an array"
  );
  t.true(
    body.dayDietProgramIDs.every((day) => Array.isArray(day)),
    "Each element in dayDietProgramIDs should be an array"
  );
  t.true(Array.isArray(body.recipeIDs), "recipeIDs should be an array");
  t.is(typeof body.dietProgramID, "number", "dietProgramID should be a number");
});

function generateTestUserID() {
  return Math.floor(Math.random() * 100000) + 1;
}
