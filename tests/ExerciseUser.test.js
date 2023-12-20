const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../index.js"); 
const { getExcercise } = require("../service/ExerciseUserService");

const userID = generateTestUserID(); 
const exerciseID = generateTestExerciseID(); 

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
    throwHttpErrors: false,
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

// Test for invalid userID or exerciseID (400 response)
const invalidUserAndExerciseIDs = [
  "invalidUserID",
  1.5,
  true,
  "@specialCharacters",
  null,
  undefined,
  "!",
  "@",
  "^",
  "&",
  "*"
];

test("GET user exercise with invalid userID or exerciseID returns 400", async (t) => {
  for (const invalidID of invalidUserAndExerciseIDs) {

      const { body, statusCode } = await t.context.got.get(`user/${invalidID}/gymprogram/${invalidID}`);

      // Assertions
      t.is(
        statusCode,
        400,
        "Should return 400 Bad Request for invalid userID or exerciseID"
      );
      t.truthy(body.message, "Response should have a message");
      t.is(
        body.message,
        "request.params.userID should be integer, request.params.excerciseID should be integer",
        "Response message should indicate an integer is required for userID and exerciseID"
      );
  }
});


// Test for non-existent userID or exerciseID (404 response)
const nonNumericUserIDsFor404 = [
  { userID: [], exerciseID: [] }, // Non-existent numeric values
  { userID: "", exerciseID: "" }, // Empty strings
];

test("GET user exercise with non-existent userID or exerciseID returns 404", async (t) => {
  for (const { userID, exerciseID } of nonNumericUserIDsFor404) {
  
      const { body, statusCode } = await t.context.got.get(`user/${userID}/gymprogram/${exerciseID}`);
     
      // Assertions
      t.is(
        statusCode,
        404,
        "Should return 404 Not Found for non-existent userID or exerciseID"
      );
      t.truthy(body.message, "Response should have a message");
      t.is(
        body.message,
        "not found",
        "Response message should indicate user or exercise not found"
      );
  }
});

// Example test for expected response headers
test("GET user exercise returns expected headers", async (t) => {
  const userID = generateTestUserID();
  const exerciseID = generateTestExerciseID();
  const { headers, statusCode } = await t.context.got.get(`user/${userID}/gymprogram/${exerciseID}`);

  t.is(statusCode, 200);
  t.truthy(headers["content-type"]);
});


function generateTestUserID() {
  return Math.floor(Math.random() * 100000) + 1;
}

function generateTestExerciseID() {
  return Math.floor(Math.random() * 100) + 1;
}
