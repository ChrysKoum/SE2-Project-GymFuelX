const {generateMockRecipeData} = require("./testMock.js");

/**
 * Tests for non-numeric user IDs by performing API requests and checking responses.
 *
 * @param {Array} ParamsTesting - An array of parameters to test.
 * @param {Object} t - The testing library's assertion context.
 * @param {Function} requestFunction - The function used to make the API request.
 * @param {Number} expectedStatusCode - The expected HTTP status code in the response.
 * @param {String} errorMessage - The error message expected in the response.
 * @param {Array} path - The API path for the request.
 */
async function testForNonNumericUserID(
  ParamsTesting,
  t,
  requestFunction,
  ...args
) {
  // Assuming args[0] is 'expectedStatusCode', args[1] is 'errorMessage', args[2] is 'path'
  const [expectedStatusCode, errorMessage, path] = args;
  // Prepare the array of test cases with non-numeric IDs based on expected status code
  let nonNumericUserIDs = getTestCases(expectedStatusCode);

  // Test each non-numeric user ID
  for (const userID of nonNumericUserIDs) {
    await performTest({
      ParamsTesting,
      t,
      requestFunction,
      expectedStatusCode,
      errorMessage,
      path,
      userID,
    });
  }
}

/**
 * Generates an array of test cases with non-numeric user IDs.
 *
 * @param {Number} expectedStatusCode - The expected HTTP status code in the response.
 * @returns {Array} - The array of non-numeric user IDs to test.
 */
function getTestCases(expectedStatusCode) {
  if (expectedStatusCode === 404) {
    return ["", []]; // Special cases for 404 errors
  }
  return [
    1.2, // Decimal number
    "abc", // String
    true, // Boolean
    "@special", // Special characters
    null, // Null value
    undefined, // Undefined value
    "!",
    "@",
    "^",
    "&",
    "*", // Various special characters
  ];
}

/**
 * Performs the test for a single non-numeric user ID.
 *
 * @param {Object} testContext - An object containing test parameters and the user ID.
 */
async function performTest(testContext) {
  const {
    t,
    requestFunction,
    expectedStatusCode,
    errorMessage,
    userID,
  } = testContext;
  const { body, statusCode } = await requestFunction(userID);

  // Assert the status code
  t.is(
    statusCode,
    expectedStatusCode,
    `Should return ${expectedStatusCode} ${errorMessage} for non-numeric userID`
  );

  // Assert the response message
  t.assert(body.message, "Response should have a message");
  handleAssertions(testContext, body, statusCode);
}

/**
 * Handles assertions based on the test context and response body.
 *
 * @param {Object} testContext - An object containing test parameters and the user ID.
 * @param {Object} body - The response body from the API request.
 */
function handleAssertions(testContext, body, statusCode) {
  const { ParamsTesting, t, expectedStatusCode, errorMessage, path, userID } =
    testContext;

  // Assert the status code and the presence of a message in the response
  t.is(
    statusCode,
    expectedStatusCode,
    `Should return ${expectedStatusCode} ${errorMessage} for non-numeric userID`
  );
  t.assert(body.message, "Response should have a message");

  // Check the length of ParamsTesting to determine the complexity of the test
  if (ParamsTesting.length === 1) {
    handleSingleParamTest({
      t,
      body,
      expectedStatusCode,
      path,
      userID,
      paramTested: ParamsTesting[0],
    });
  } else {
    handleMultipleParamsTest({
      t,
      body,
      expectedStatusCode,
      path,
      userID,
      paramsTested: ParamsTesting,
    });
  }
}

/**
 * Handles assertions for tests with a single parameter.
 *
 * @param {Object} context - An object with the test context for a single parameter.
 */
function handleSingleParamTest(context) {
  const { t, body, expectedStatusCode, path, userID, paramTested } = context;

  // Assertions for tests with a single parameter
  if (expectedStatusCode === 404) {
    t.is(
      body.message,
      "not found",
      "Response message should indicate not found"
    );
    t.deepEqual(
      body.errors,
      [{ path: `/${path[0]}/${userID}/${path[1]}`, message: "not found" }],
      "Response errors should match the expected structure"
    );
  } else {
    t.is(
      body.message,
      `request.params.${paramTested} should be integer`,
      "Response message should indicate an integer is required"
    );
    t.deepEqual(
      body.errors,
      [
        {
          path: `.params.${paramTested}`,
          message: "should be integer",
          errorCode: "type.openapi.validation",
        },
      ],
      "Response errors should match the expected structure"
    );
  }
}

/**
 * Handles assertions for tests with multiple parameters.
 *
 * @param {Object} context - An object with the test context for multiple parameters.
 */
function handleMultipleParamsTest(context) {
  const { t, body, expectedStatusCode, path, userID, paramsTested } = context;

  // Assertions for tests with multiple parameters
  if (expectedStatusCode === 404) {
    t.is(
      body.message,
      "not found",
      "Response message should indicate not found"
    );
    t.deepEqual(
      body.errors,
      [
        {
          path: `/${path[0]}/${userID}/${path[1]}/${userID}`,
          message: "not found",
        },
      ],
      "Response errors should match the expected structure"
    );
  } else {
    const expectedMessage = paramsTested
      .map((param) => `request.params.${param} should be integer`)
      .join(", ");
    t.is(
      body.message,
      expectedMessage,
      `Response message should indicate an integer is required for ${paramsTested.join(
        " and "
      )}`
    );
    const errors = paramsTested.map((param) => ({
      path: `.params.${param}`,
      message: "should be integer",
      errorCode: "type.openapi.validation",
    }));
    t.deepEqual(
      body.errors,
      errors,
      "Response errors should match the expected structure"
    );
  }
}

// Helper function to generate a random test ID
function generateTestID() {
  return Math.floor(Math.random() * 100000) + 1;
}

module.exports = {
  testForNonNumericUserID,
  generateMockRecipeData,
  generateTestID,
};
