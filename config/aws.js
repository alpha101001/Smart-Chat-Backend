/*****************************************************
 * config/aws.js - Using AWS SDK v3
 *****************************************************/
require("dotenv").config();

// 1. Import the v3 DynamoDBClient & DocumentClient
const {
    DynamoDBClient
} = require("@aws-sdk/client-dynamodb");
const {
    DynamoDBDocumentClient
} = require("@aws-sdk/lib-dynamodb");

// 2. Import Chime v3 client
const {
    ChimeClient
} = require("@aws-sdk/client-chime");

// Configure region via environment or fallback
const region = process.env.REGION || "us-east-1";

// Create the low-level DynamoDB client
const dynamoClient = new DynamoDBClient({ region });

// Create a DocumentClient wrapper around the low-level client
const dynamoDBClient = DynamoDBDocumentClient.from(dynamoClient);

// Create a Chime client
// NOTE: You may need to supply credentials or other config
// if you're using it outside of a Lambda with IAM roles
const chimeClient = new ChimeClient({ region });

// Export for usage in other files
module.exports = {
    dynamoDBClient,
    chimeClient
};
