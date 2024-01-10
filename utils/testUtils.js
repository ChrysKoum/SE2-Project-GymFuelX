// Description: This file contains utility functions for testing.
// A async function that is testing for non numeric user IDs.
async function testForNonNumericUserID(
  t,
  requestFunction,
  expectedStatusCode,
  errorMessage
) {
  // Array of test cases with various non-numeric user IDs
  const nonNumericUserIDs = [
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

  // Loop through each test case
  for (const userID of nonNumericUserIDs) {
    const nonNumericUserID = userID;
    // Make a request with the non-numeric user ID
    const { body, statusCode } = await requestFunction(nonNumericUserID);

    // Assertions
    t.is(
      statusCode,
      expectedStatusCode,
      `Should return ${expectedStatusCode} ${errorMessage} for non-numeric userID`
    ); // Check if the status code matches the expected value
    t.assert(body.message, "Response should have a message"); // Ensure there's a response message
    t.is(
      body.message,
      "request.params.userID should be integer",
      "Response message should indicate an integer is required"
    ); // Check if the response message is as expected
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
    ); // Validate the structure and content of response errors
  }
}

module.exports = {
  testForNonNumericUserID,
};