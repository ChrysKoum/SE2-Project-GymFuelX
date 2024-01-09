async function testForNonNumericUserID(
  t,
  requestFunction,
  expectedStatusCode,
  errorMessage
) {
  const nonNumericUserIDs = [
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

  for (const userID of nonNumericUserIDs) {
    const nonNumericUserID = userID;
    const { body, statusCode } = await requestFunction(nonNumericUserID);

    // Assertions
    t.is(
      statusCode,
      expectedStatusCode,
      `Should return ${expectedStatusCode} ${errorMessage} for non-numeric userID`
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
}

module.exports = {
  testForNonNumericUserID,
};
