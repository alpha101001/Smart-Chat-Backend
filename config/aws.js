const AWS = require("aws-sdk");

// Optional: set region or credentials globally
AWS.config.update({ region: process.env.REGION || "us-east-1" });

// For DynamoDB, use the v2 DocumentClient
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

// For Chime (make sure the Lambda environment's version includes the Chime client)
const chime = new AWS.Chime();

module.exports = {
    dynamoDBClient,
    chime
};
