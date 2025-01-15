/*****************************************************
 * config/aws.js - Using AWS SDK v3
 *****************************************************/
require("dotenv").config();

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, TranslateConfig } = require("@aws-sdk/lib-dynamodb");
const { ChimeSDKMeetingsClient } = require("@aws-sdk/client-chime-sdk-meetings"); // Updated client

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

// Create the Chime SDK Meetings client with the regional endpoint
const chimeSDKMeetingsClient = new ChimeSDKMeetingsClient({
    region,
    endpoint: `https://meetings-chime.${region}.amazonaws.com`, // Regional endpoint
});

module.exports = {
    dynamoDBClient, // Export the correctly configured `DynamoDBDocumentClient`
    chimeSDKMeetingsClient,
};
