const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../index.js");
//
const { testForNonNumericUserID, generateTestID } = require("../utils/testUtils.js");

const { getDietProgram } = require("../service/DietprogramUserService");

const userID = generateTestID();

// Initialize the test environment
test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
    throwHttpErrors: false,
  });
});

// Cleanup after tests
test.after.always((t) => {
  t.context.server.close();
});

// Test for successful response of Fuction
test("getDietProgram returns the correct structure for a valid userID", async (t) => {
  const DietProgram = await getDietProgram(userID);

  // Check if the properties exist
  t.truthy(
    DietProgram.dayDietProgramIDs,
    "Response should have dayDietProgramIDs property"
  );
  t.truthy(DietProgram.recipeIDs, "Response should have recipeIDs property");
  t.truthy(
    DietProgram.dietProgramID,
    "Response should have dietProgramID property"
  );

  // Validate the data types and structure
  t.true(
    Array.isArray(DietProgram.dayDietProgramIDs),
    "dayDietProgramIDs should be an array"
  );
  t.true(Array.isArray(DietProgram.recipeIDs), "recipeIDs should be an array");
  t.is(
    typeof DietProgram.dietProgramID,
    "number",
    "dietProgramID should be a number"
  );

  // Validate specific values
  t.deepEqual(
    DietProgram.dayDietProgramIDs,
    [
      [0, 0],
      [0, 0],
    ],
    "dayDietProgramIDs should match the expected array structure"
  );
  t.deepEqual(
    DietProgram.recipeIDs,
    [6, 6],
    "recipeIDs should match the expected array structure"
  );
  t.is(DietProgram.dietProgramID, 1, "dietProgramID should be 1");
});

// Test for successful response of Endpoint
test("getDietProgram API endpoint returns the correct structure for a valid userID", async (t) => {
  const { body, statusCode } = await t.context.got.get(
    `user/${userID}/dietprogram`
  );

  t.is(statusCode, 200);
  t.truthy(body.dayDietProgramIDs);
  t.truthy(body.recipeIDs);
  t.truthy(body.dietProgramID);

  // Validate data types and structure
  t.true(
    Array.isArray(body.dayDietProgramIDs),
    "dayDietProgramIDs should be an array"
  );
  t.true(Array.isArray(body.recipeIDs), "recipeIDs should be an array");
  t.is(typeof body.dietProgramID, "number");

  // Validate specific values
  t.deepEqual(
    body.dayDietProgramIDs,
    [
      [0, 0],
      [0, 0],
    ],
    "dayDietProgramIDs should match the expected array structure"
  );
  t.deepEqual(
    body.recipeIDs,
    [6, 6],
    "recipeIDs should match the expected array structure"
  );
  t.is(body.dietProgramID, 1, "dietProgramID should be 1");
});

// Test for minimum valid userID
test("GET diet program with minimum valid user ID returns correct response", async (t) => {
  const minimumValidUserID = 1; // Define the minimum valid userID
  const { statusCode } = await t.context.got.get(
    `user/${minimumValidUserID}/dietprogram`
  );
  t.is(statusCode, 200, "Should return 200 OK for minimum valid userID");
});

// Test for maximum valid userID
test("GET diet program with maximum valid user ID returns correct response", async (t) => {
  const maximumValidUserID = 1000000; // Define the maximum valid userID
  const { statusCode } = await t.context.got.get(
    `user/${maximumValidUserID}/dietprogram`
  );
  t.is(statusCode, 200, "Should return 200 OK for maximum valid userID");
});

// Example test for invalid userID (400 response)

test("GET user with non-numeric user ID returns 400", async (t) => {
  await testForNonNumericUserID(["userID"],t,
    async (userID) => {
      return t.context.got.get(`user/${userID}/dietprogram`);
    },400,"Bad Request"
  );
});

// Example test for non-existent userID (404 response)
test("GET user with non-numeric user ID returns 404", async (t) => {
  await testForNonNumericUserID(["userID"],t,
    async (userID) => {
      return t.context.got.get(`user/${userID}/dietprogram`);
    },404,"Not Found", ["user","dietprogram"]
  );
});

// Example test for expected response headers
test("GET diet program returns expected headers", async (t) => {
  const { headers, statusCode } = await t.context.got.get(
    `user/${userID}/dietprogram`
  );

  t.is(statusCode, 200);
  t.truthy(headers["content-type"]);
});
