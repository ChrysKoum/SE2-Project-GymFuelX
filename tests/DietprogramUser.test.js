const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../index.js");

const { getDietProgram } = require("../service/DietprogramUserService");

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
  const userID = generateTestUserID();
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
  const userID = generateTestUserID(); // A valid userID
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

// Add more tests here for different scenarios like invalid userID, non-existent userID, etc.

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
const userIDfor400 = [
  1.2,
  "abc",
  true,
  "@special",
  null,
  undefined,
  "!",
  "@",
  "^",
  "&",
  "*",
];

test("GET user with non-numeric user ID returns 400", async (t) => {
  for (const userID of userIDfor400) {
    const nonNumericUserID = userID;
    const { body, statusCode } = await t.context.got.get(
      `user/${nonNumericUserID}/dietprogram`
    );

    // Assertions
    t.is(
      statusCode,
      400,
      "Should return 400 Bad Request for non-numeric userID"
    );
    t.assert(body.message, "Response should have a message");
    t.is(
      body.message,
      "request.params.userID should be integer",
      "Response message should indicate an integer is required"
    );
    t.deepEqual(
      body.errors,
      [
        {
          path: ".params.userID",
          message: "should be integer",
          errorCode: "type.openapi.validation",
        },
      ],
      "Response errors should match the expected structure"
    );
  }
});



// Example test for non-existent userID (404 response)
const nonNumericUserIDsFor404 = ["", []];
test("GET user with non-numeric user ID returns 404", async (t) => {
  for (const userID of nonNumericUserIDsFor404) {
    const nonNumericUserID = userID;

    const { body, statusCode } = await t.context.got.get(
      `user/${nonNumericUserID}/dietprogram`
    );

    // Assertions
    t.is(
      statusCode,
      404,
      "Should return 404 User not found for non-numeric userID"
    );
    t.assert(body.message, "Response should have a message");
    t.is(
      body.message,
      "not found",
      "Response message should indicate not found"
    );
    t.deepEqual(
      body.errors,
      [
        {
          path: `/user/${nonNumericUserID}/dietprogram`,
          message: "not found",
        },
      ],
      "Response errors should match the expected structure"
    );
  }
});

// Example test for expected response headers
test("GET diet program returns expected headers", async (t) => {
  const userID = generateTestUserID();
  const { headers, statusCode } = await t.context.got.get(
    `user/${userID}/dietprogram`
  );

  t.is(statusCode, 200);
  t.truthy(headers["content-type"]);
});

function generateTestUserID() {
  return Math.floor(Math.random() * 100000) + 1;
}
