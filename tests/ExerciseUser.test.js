const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../index.js"); // Make sure this path is correct
const { getExcercise } = require("../service/ExerciseUserService");

const userID = generateTestUserID(); // Example of a user ID
const exerciseID = generateTestExerciseID(); // Example of an exercise ID

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

test("getExcercise returns the correct structure for a valid user and exercise ID", async (t) => {
  const result = await getExcercise(userID, exerciseID);

  t.truthy(
    result.exerciseDescription,
    "Response should have exerciseDescription"
  );
  t.truthy(result.explanationVideo, "Response should have explanationVideo");
  t.is(typeof result.exerciseID, "number", "exerciseID should be a number");
  t.is(
    typeof result.exerciseTitle,
    "string",
    "exerciseTitle should be a string"
  );
});

test("getExcercise API endpoint returns a response with the correct structure and data types", async (t) => {
  const { body, statusCode } = await t.context.got.get(
    `user/${userID}/gymprogram/${exerciseID}`
  );

  // Assuming the API returns a 200 status code for valid requests
  t.is(statusCode, 200, "Should return 200 OK for valid user and exercise IDs");

  // Validate the response structure
  t.is(
    typeof body.exerciseDescription,
    "string",
    "exerciseDescription should be a string"
  );
  t.is(
    typeof body.explanationVideo,
    "string",
    "explanationVideo should be a string"
  );
  t.is(typeof body.exerciseID, "number", "exerciseID should be a number");
  t.is(typeof body.exerciseTitle, "string", "exerciseTitle should be a string");
});

function generateTestUserID() {
  return Math.floor(Math.random() * 100000) + 1;
}

function generateTestExerciseID() {
  return Math.floor(Math.random() * 100) + 1;
}
