// Importing necessary modules and files
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../index.js");
const { getExcercise } = require("../service/ExerciseUserService");
const {testForNonNumericUserID, generateTestID,} = require("../utils/testUtils.js");

// Generating test user and exercise IDs
const userID = generateTestID();
const exerciseID = generateTestID();

// Setup before running the tests
test.before(async (t) => {
  // Creating an HTTP server for the app
  t.context.server = http.createServer(app);
  // Listening to the server and getting the URL
  t.context.prefixUrl = await listen(t.context.server);
  // Extending got for HTTP requests with predefined options
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
    throwHttpErrors: false,
  });
});

// Teardown after all tests are done
test.after.always((t) => {
  // Closing the server
  t.context.server.close();
});

// Test case for the getExcercise function
test("getExcercise returns the correct structure for a valid user and exercise ID", async (t) => {
  const result = await getExcercise(userID, exerciseID);

  // Assertions to check the response structure and data types
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

// Test case for the getExcercise API endpoint
test("getExcercise API endpoint returns a response with the correct structure and data types", async (t) => {
  // Making a GET request to the API endpoint
  const { body, statusCode } = await t.context.got.get(
    `user/${userID}/gymprogram/${exerciseID}`
  );

  // Assertions to check response status code and structure
  t.is(statusCode, 200, "Should return 200 OK for valid user and exercise IDs");
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


// Test for handling non-existent user
test("GET user exercise with non-numeric user ID returns 400", async (t) => {
  await testForNonNumericUserID(["userID"],t,
    async (nonValidID) => {
      return t.context.got.get(`user/${nonValidID}/gymprogram/${exerciseID}`);
    },400,"Bad Request"
  );
});

// Test for handling invalid user and exercise IDs
test("GET user exercise with invalid userID or exerciseID returns 400", async (t) => {
  await testForNonNumericUserID(["userID", "excerciseID"],t,
    async (nonValidID) => {
      return t.context.got.get(`user/${nonValidID}/gymprogram/${nonValidID}`);
    },400,"Bad Request"
  );
});


// Test for handling non-existent user and exercise IDs
test("GET user exercise with non-existent userID or exerciseID returns 404", async (t) => {
  await testForNonNumericUserID(["userID", "excerciseID"],t,
    async (nonValidID) => {
      return t.context.got.get(`user/${nonValidID}/gymprogram/${nonValidID}`);
    },404,"Not Found", ["user","gymprogram"]
  );
});

// Test for checking response headers
test("GET user exercise returns expected headers", async (t) => {
  // Generating test IDs and making a GET request
  const { headers, statusCode } = await t.context.got.get(
    `user/${userID}/gymprogram/${exerciseID}`
  );

  // Assertions to check the response status code and headers
  t.is(statusCode, 200);
  t.truthy(headers["content-type"]);
});
