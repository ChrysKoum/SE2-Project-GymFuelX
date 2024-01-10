// Constructor for creating a response payload with a code and payload
var ResponsePayload = function (code, payload) {
  this.code = code; // HTTP response code
  this.payload = payload; // The content/data of the response
};

// Function to respond with a specific code and payload
exports.respondWithCode = function (code, payload) {
  return new ResponsePayload(code, payload);
};

// Separate function to determine response code
function determineResponseCode(arg1, arg2) {
  if (arg2 && Number.isInteger(arg2)) {
    return arg2;
  } else if (arg1 && Number.isInteger(arg1)) {
    return arg1;
  }
  return 200; // Default code
}

// Separate function to process payload
function processPayload(payload) {
  if (typeof payload === "object") {
    return JSON.stringify(payload, null, 2);
  }
  return payload;
}

// Simplified function to write a JSON response
var writeJson = (exports.writeJson = function (response, arg1, arg2) {
  if (arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  var code = determineResponseCode(arg1, arg2);
  var payload = processPayload(arg1 || arg2);

  response.writeHead(code, { "Content-Type": "application/json" });
  response.end(payload);
});
