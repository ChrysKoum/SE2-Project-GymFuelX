const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');
const { deleteReportNutritionist } = require("../service/ReportNutritionistService");
const app = require('../index.js');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json', throwHttpErrors: false});
});

test.after.always((t) => {
    t.context.server.close();
});

const nutritionistID = generateTestnutritionistID();
const reportID = generateTestReportID();

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

function generateTestnutritionistID() {
    return Math.floor(Math.random() * 100000) + 1;
}

function generateTestReportID() {
    return Math.floor(Math.random() * 100000) + 1;
}
