"use strict";

// Importing necessary modules
var path = require("path");
var http = require("http");

var oas3Tools = require("oas3-tools"); // Importing oas3-tools for OpenAPI (Swagger) integration
var serverPort = process.env.PORT || 8080; // Setting the server port (from environment variable or default to 8080)

// Configuration for the swaggerRouter
var options = {
  routing: {
    controllers: path.join(__dirname, "./controllers"), // Setting the path for API controllers
  },
};

// Initialize the Swagger middleware to configure the Express app
var expressAppConfig = oas3Tools.expressAppConfig(
  path.join(__dirname, "api/openapi.yaml"), // Path to the OpenAPI definition file
  options // Swagger middleware options
);
var app = expressAppConfig.getApp(); // Get the configured Express application

// Start the server only if the environment is not set to 'test'
if (process.env.NODE_ENV !== "test") {
  // Create and start the HTTP server on the specified port
  http.createServer(app).listen(serverPort, function () {
    console.log(
      "Your server is listening on port %d (http://localhost:%d)",
      serverPort,
      serverPort
    );
    console.log(
      "Swagger-ui is available on http://localhost:%d/docs",
      serverPort
    );
  });
}

// Export the Express application for further use (like in tests)
module.exports = app;
