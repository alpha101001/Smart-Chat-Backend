/*****************************************************
 * config/aws.js - Using AWS SDK v3
 *****************************************************/
require("dotenv").config();

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, TranslateConfig } = require("@aws-sdk/lib-dynamodb");
const { ChimeClient } = require("@aws-sdk/client-chime");

// Configure the AWS region
const region = process.env.REGION || "us-east-1";

// Create a low-level DynamoDB client
const dynamoClient = new DynamoDBClient({ region });

// Highlighted Modification: Configure `marshallOptions` for `DynamoDBDocumentClient`
const translateConfig = {
    marshallOptions: {
        removeUndefinedValues: true, // Automatically remove undefined attributes
        convertEmptyValues: true,    // Convert empty strings and sets to `null`
    },
};

const dynamoDBClient = DynamoDBDocumentClient.from(dynamoClient, translateConfig);

// Create the Chime client
const chimeClient = new ChimeClient({ region });

module.exports = {
    dynamoDBClient, // Export the correctly configured `DynamoDBDocumentClient`
    chimeClient,
};
