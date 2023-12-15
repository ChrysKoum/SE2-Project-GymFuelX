const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const app = require('../index');
const utils = require('../utils/writer.js');

const {
  getRecipeReport,
  getRecipeReports,
  updateRecipeReport,
  deleteRecipeReport,
} = require("../service/ReportNutritionistService");


const nutritionistID = generateTestnutritionistID();
const reportID = generateTestReportID();

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);

    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: "json", throwHttpErrors: false });
  });
  
  test.after.always((t) => {
    t.context.server.close();
  });
  
  test( "getRecipeReport returns the correct structure for a valid nutritionistID and reportID", async (t) => {
    const nutritionistID = 23;
    const reportID = 23;
    const report = await getRecipeReport(nutritionistID,reportID);
    t.truthy(report.ByUser);
    //t.truthy(report.ID); //because the reportID is 0 in the example
    t.truthy(report["isGym-Diet"]);
    //Validate the response structure and data types
    t.is(typeof report.ByUser, "number");
    t.is(typeof report.ID, "number");
    t.is(typeof report["isGym-Diet"], "boolean");

  });

  test("getRecipeReport API endopoint returns the correct structure for a valid nutritionistID and reportID", async (t) => {
    const nutritionistID = 23;
    const reportID = 23;
    const { body, statusCode } = await t.context.got(`nutritionist/${nutritionistID}/report/${reportID}`);
    t.is(statusCode, 200,"should return a 200 status code for a valid nutritionistID and reportID");
    const report = body;
    t.truthy(report.ByUser);
    //t.truthy(report.ID); //because the reportID is 0 in the example
    t.truthy(report["isGym-Diet"]);
    //Validate the response structure and data types
    t.is(typeof report.ByUser, "number");
    t.is(typeof report.ID, "number");
    t.is(typeof report["isGym-Diet"], "boolean");

  });

test('getRecipeReport with minimum valid nutritionistID and reportID returns correct response', async (t) => {
    const { body, statusCode } = await t.context.got(`nutritionist/1/report/1`);
    t.is(statusCode, 200, "Should return 200 OK for valid nutritionistID and reportID");
});
test('getRecipeReport with maximum valid nutritionistID and reportID returns correct response', async (t) => {
    const { body, statusCode } = await t.context.got(`nutritionist/10000000/report/10000000`);
    t.is(statusCode, 200, "Should return 200 OK for valid nutritionistID and reportID");
});


const nutritionistIDfor400 = [3.4, 'abcs', true, '@special', null, undefined, '!', '@', '^', '&', '*',];
const reportIDfor400 = [3.4, 'abcs', true, '@special', null, undefined, '!', '@', '^', '&', '*',];

test(`getRecipeReport with invalid nutritionistID  returns 400`, async (t) => {
    for (const nutritionistID of nutritionistIDfor400) {
        invalidnutritionistID = nutritionistID;
        const { body, statusCode } = await t.context.got(`nutritionist/${invalidnutritionistID}/report/5`);
        t.is(statusCode, 400, "Should return 400 Bad Request for invalid nutritionistID");
        t.is(body.message, 'request.params.NutritionistID should be integer')
        t.assert(body.message);
        t.deepEqual(body.errors, [
            {
                path: '.params.NutritionistID',
                message: 'should be integer',
                errorCode: 'type.openapi.validation'
            }
        ]);
    }

});

test(`getRecipeReport with invalid reportID returns 400`, async (t) => { 
    for (const reportID of reportIDfor400) {
        invalidreportID = reportID;
        const { body, statusCode } = await t.context.got(`nutritionist/5/report/${invalidreportID}`);
        t.is(statusCode, 400, "Should return 400 Bad Request for invalid reportID");
        t.is(body.message, 'request.params.reportID should be integer')
        t.assert(body.message);
        t.deepEqual(body.errors, [
            {
                path: '.params.reportID',
                message: 'should be integer',
                errorCode: 'type.openapi.validation'
            }
        ]);
    }

});


const nutritionistIDfor404 = ['', []]
const reportIDfor404 = ['', []]

test('getRecipeReport with empty user ID and valid recipeID returns 404', async (t) => {
    for (const nutritionistID of nutritionistIDfor404) {
        const emptynutritionistID = nutritionistID;

        const { body, statusCode } = await t.context.got(`nutritionist/${emptynutritionistID}/report/23`);

        // Assertions
        t.is(statusCode, 404, 'Should return 404 User not found.');
        t.assert(body.message);
        t.is(body.message, 'not found');
        t.deepEqual(body.errors, [
            {
                path: '/nutritionist//report/23',
                message: 'not found',
            }
        ]);
    }
});

test('getRecipeReport with valid nutritionistID and empty reportID returns 404', async (t) => {
    for (const reportID of reportIDfor404) {
        const emptyreportID = reportID;

        const { body, statusCode } = await t.context.got(`nutritionist/23/report/${emptyreportID}/`);

        // Assertions
        t.is(statusCode, 404, 'Should return 404 User not found.');
        t.assert(body.message);
        t.is(body.message, 'not found');
        t.deepEqual(body.errors, [
            {
                path: '/nutritionist/23/report//',
                message: 'not found',
            }
        ]);
    }
});

test("getRecipeReports returns expected headers", async (t) => {
    const nutritionistID = 23;
    const reportID = 34;
    const { headers, statusCode } = await t.context.got(`nutritionist/${nutritionistID}/report/${reportID}`);

    t.is(statusCode, 200, "Should return 200 OK for valid nutritionistID and reportID");
    t.truthy(headers['content-type'], 'Response should have content-type header');
});


///test for getRecipeReports

test( "getRecipeReports returns the correct structure for a valid nutritionistID", async (t) => {
    const nutritionistID = 54;
    const reports = await getRecipeReports(nutritionistID);
    for(const report of reports){
        t.truthy(report.ByUser);
        //t.truthy(report.ID); //because the reportID is 0 in the example
        t.truthy(report["isGym-Diet"]);
        //Validate the response structure and data types
        t.is(typeof report.ByUser, "number");
        t.is(typeof report.ID, "number");
        t.is(typeof report["isGym-Diet"], "boolean");
    }
  });

test("getRecipeReports API endopoint returns the correct structure for a valid nutritionistID", async (t) => {
    const nutritionistID = 54;
    const { body, statusCode } = await t.context.got(`nutritionist/${nutritionistID}/report`);
    t.is(statusCode, 200,"should return a 200 status code for a valid nutritionistID");
    const reports = body;
    for(const report of reports){
        t.truthy(report.ByUser);
        //t.truthy(report.ID); //because the reportID is 0 in the example
        t.truthy(report["isGym-Diet"]);
        //Validate the response structure and data types
        t.is(typeof report.ByUser, "number");
        t.is(typeof report.ID, "number");
        t.is(typeof report["isGym-Diet"], "boolean");
    }
  });

test("getRecipeReport with non-integer nutritionistID returns 400", async (t) => {
    for (const nutritionistID of nutritionistIDfor400) {
        const nonIntegernutritionistID = nutritionistID;
        const { body, statusCode } = await t.context.got(`nutritionist/${nonIntegernutritionistID}/report`);
        t.is(statusCode, 400, "Should return 400 Bad Request for non-integer nutritionistID");
        t.is(body.message, 'request.params.NutritionistID should be integer');
        t.deepEqual(body.errors, [
            {
                path: '.params.NutritionistID',
                message: 'should be integer',
                errorCode: 'type.openapi.validation'
            }
        ]);

    }
});

test("getRecipeReport with empty nutritionistID returns 404", async (t) => {
    for (const nutritionistID of nutritionistIDfor404) {
        const emptynutritionistID = nutritionistID;
        const { body, statusCode } = await t.context.got(`nutritionist/${emptynutritionistID}/report`);
        t.is(statusCode, 404, "Should return 404 Not Found for empty nutritionistID");
        t.is(body.message, 'not found');
        t.deepEqual(body.errors, [
            {
                path: '/nutritionist//report',
                message: 'not found',

            }
        ]);

    }
});

test('getRecipeReport returns expected headers', async (t) => {
    const nutritionistID = 122;
    const { headers, statusCode } = await t.context.got(`nutritionist/${nutritionistID}/report`);

    t.is(statusCode, 200, "Should return 200 OK for valid nutritionistID");
    t.truthy(headers['content-type'], 'Response should have content-type header');
});

// Test for the function of delete report
test("deleteReportNutritionist returns the correct structure for a valid nutritionistID and reportID", async (t) => { 
    const nutritionistID = 23;
    const reportID = 23;
    const report = await deleteRecipeReport(nutritionistID,reportID);
    t.is(report, undefined, "Should return undefined");
  });

//Delete Report
test('Test of the Delete Report with success', async (t) => {
    const { body, statusCode } = await t.context.got.delete(
        `nutritionist/${nutritionistID}/report/${reportID}`
    );

    //status Code should be 200
    t.is(statusCode, 200, "Should return 200 when report is deleted");
});

test('Test of the Delete Report with 400 error code', async (t) => {
    const wrongReportId = '@';
    const { body, statusCode } = await t.context.got.delete(
        `nutritionist/${nutritionistID}/report/${wrongReportId}`
    );

    t.is(statusCode, 400, "Should return 400 when there is a bad parameter");
    t.like(body.errors, [
        {
            path: '.params.reportID',
            message: 'should be integer',
            errorCode: 'type.openapi.validation'
        }
    ]);
});

test('Test of the Delete Report with 405 error code', async (t) => {
    const nonExistingReportId = '';
    const { statusCode, body } = await t.context.got.delete(
        `nutritionist/${nutritionistID}/report/${nonExistingReportId}`
    );
    
    t.is(statusCode, 405, "Should return 405 DELETE method not allowed");
});


/* 
**** Put Report Recipe Nutritiontist****
*/

  const putData = [
    {
      ID: "124124",
      details: "Recipe Details",
    },
  ];


// Test for successful posting a report for a Gym Program
test("PUT recipe report for a valid userID updateRecipeReport", async (t) => {
  const putRecipeReport = await updateRecipeReport(
    putData,
    nutritionistID,
    reportID
  );

  t.truthy(
    typeof putRecipeReport,
    undefined,
    "updateRecipeReport should be a undefined"
  );
});

// Test for successful posting a report for a Gym Program
test("PUT recipe report for a valid userID using updateRecipeReport API endpoint ", async (t) => {

  const { statusCode } = await t.context.got.put(
    `nutritionist/${nutritionistID}/report/${reportID}`,
    {
      json: putData,
    }
  );
  t.is(statusCode, 200);
});

// Example test for invalid IDs (400 response)
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

test("PUT report recipe nutritionist with invalid ids returns error", async (t) => {

  for (const userID of userIDfor400) {
    const invalidID = userID;
    const { body, statusCode } = await t.context.got.put(
      `nutritionist/${invalidID}/report/${invalidID}`,
      {
        json: putData,
      }
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
      "request.params.NutritionistID should be integer, request.params.reportID should be integer",
      "Response message should indicate an integer is required"
    );
    t.deepEqual(
      body.errors,
      [
        {
        errorCode: 'type.openapi.validation',
        message: 'should be integer',
        path: '.params.NutritionistID',
      },
      {
        errorCode: 'type.openapi.validation',
        message: 'should be integer',
        path: '.params.reportID',
      },
      ],
      "Response errors should match the expected structure"
    );
  }
});

// Test for error posting a report for a Recipe report with false data - 400 
test("PUT recipe reoprt with invalid data returns error", async (t) => {
  const putData = [{
    ID: [],
    details: {},
  }];
    const { body, statusCode } = await t.context.got.put(
      `nutritionist/${reportID}/report/${reportID}`,
      {
        json: putData,
      }
    );
    console.log('body');
    console.log(body)

    // Assertions
    t.is(statusCode,400,"Should return 400 Bad Request for non-numeric userID");
    t.assert(body.message, "Response should have a message");
    t.is(
      body.message,
      "request.body[0].ID should be string, request.body[0].details should be string",
      "Response message should indicate an string is required for ID and details"
    );
    t.deepEqual(
      body.errors,
      [
        {
          path: ".body[0].ID",
          message: "should be string",
          errorCode: "type.openapi.validation",
        },
        {
          path: ".body[0].details",
          message: "should be string",
          errorCode: "type.openapi.validation",
        },
      ],
      "Response errors should match the expected structure"
    );
});

// Example test for non-existent IDs (404 response)
const nonNumericUserIDsFor404 = ["", []];

test("PUT recipe report with non-numeric returns 404 error", async (t) => {
  

  for (const nonNumericID of nonNumericUserIDsFor404) {
    const { body, statusCode } = await t.context.got.put(
      `nutritionist/${nonNumericID}/report/${nonNumericID}`,
      {
        json: putData,
      }
    );

    // Assertions
    t.is(statusCode, 404, "Should return 404 Not Found for non-numeric userID");
    t.assert(body.message, "Response should have a message");
    t.is(
      body.message,
      "not found",
      "Response message should indicate the user ID is not found"
    );
    t.deepEqual(
      body.errors,
      [
        {
          path: `/nutritionist/${nonNumericID}/report/${nonNumericID}`,
          message: "not found",
        },
      ],
      "Response errors should match the expected structure for a 404 error"
    );
  }
});

// Example test for no allowed user access (405 response)
test("PUT recipe report with non-numeric returns 405 error", async (t) => {
    const nonNumericReportID = '';
    const { body, statusCode } = await t.context.got.put(
      `nutritionist/${nutritionistID}/report/${nonNumericReportID}`,
      {
        json: putData,
      }
    );

    // Assertions
    t.is(statusCode, 405, "Should return 405 Not Allowed for this userID");
    t.assert(body.message, "Response should have a message");
    t.is(
      body.message,
      "PUT method not allowed",
      "Response message should indicate the user ID is Allowed to access"
    );
    t.deepEqual(
      body.errors,
      [
        {
          path: `/nutritionist/${nutritionistID}/report/${nonNumericReportID}`,
          message: "PUT method not allowed",
        },
      ],
      "Response errors should match the expected structure for a 405 error"
    );
});

// Example test for expected response headers
test("PUT recipe report returns expected headers", async (t) => {

  const { body, headers, statusCode } = await t.context.got.put(
    `nutritionist/${nutritionistID}/report/${reportID}`,
    {
      json: putData,
    }
  );

  console.log(body);
  t.is(statusCode, 200);
  t.truthy(headers["content-type"]);
});

function generateTestnutritionistID() {
    return Math.floor(Math.random() * 100000) + 1;
}

function generateTestReportID() {
    return Math.floor(Math.random() * 100000) + 1;
}

