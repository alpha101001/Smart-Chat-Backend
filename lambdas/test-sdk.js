/*****************************************************
 * lambdas/test-sdk.js - Example Test for v3
 *****************************************************/
module.exports.handler = async () => {
    try {
        // For demonstration, let's quickly import the version from DynamoDB v3
        const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
        const pkg = require("@aws-sdk/client-dynamodb/package.json");

        return {
            statusCode: 200,
            body: `AWS SDK v3 DynamoDBClient version: ${pkg.version}`
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error: ${error.message}`
        };
    }
};
