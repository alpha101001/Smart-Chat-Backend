// config/aws.js
const AWS = require("aws-sdk");
console.log("Using AWS SDK Version:", AWS.VERSION); // Debug log
require("dotenv").config();
// Optional: set region from environment
AWS.config.update({
    region: process.env.REGION || "us-east-1",
});

// For DynamoDB, use DocumentClient v2
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

// For Chime (v2)
// const chime = new AWS.Chime();

module.exports = {
    dynamoDBClient,
    // chime,
};
