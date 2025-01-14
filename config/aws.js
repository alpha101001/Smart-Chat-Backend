/*****************************************************
 * config/aws.js - Using AWS SDK v3
 *****************************************************/
require("dotenv").config();

// 1. Import the v3 DynamoDBClient & DocumentClient
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

// 2. Import Chime v3 client
const { ChimeClient } = require("@aws-sdk/client-chime");

// Configure region via environment or fallback
const region = process.env.REGION || "us-east-1";

// Highlighted Modification: Ensure DynamoDBClient is configured properly
const dynamoClient = new DynamoDBClient({ region });

// Highlighted Modification: Use `DynamoDBDocumentClient.from` to wrap the low-level client
const dynamoDBClient = DynamoDBDocumentClient.from(dynamoClient);

// Highlighted Modification: Create ChimeClient with the region
const chimeClient = new ChimeClient({ region });

// Export for usage in other files
module.exports = {
    dynamoDBClient, // Highlighted Modification: Export the configured DynamoDBDocumentClient
    chimeClient,    // Highlighted Modification: Export the ChimeClient
};
