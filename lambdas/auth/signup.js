/*****************************************************
 * lambdas/auth/signup.js
 *****************************************************/
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
const { GetCommand, PutCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const bcrypt = require("bcryptjs");

module.exports.signup = async (event) => {
    try {
        let parsedBody;
        try {
            parsedBody = JSON.parse(event.body);
        } catch (error) {
            return errorResponse("Invalid JSON payload", 400);
        }

        // Updated schema fields
        const {
            name,
            userName,
            userEmail,
            password,
            dateOfBirth
        } = parsedBody;

        //  Validate new fields
        if (!name || !userName || !userEmail || !password || !dateOfBirth) {
            return errorResponse(
                "All fields (name, userName, userEmail, password, dateOfBirth) are required",
                400
            );
        }

        // Obtain deviceId from a header
        const deviceId = event.headers["x-device-id"];
        if (!deviceId) {
            return errorResponse("Device ID is required", 400);
        }

        // Check how many accounts exist for this deviceId (requires GSI)
        const queryParams = {
            TableName: "Users",
            IndexName: "deviceIdIndex", // GSI with deviceId as PK
            KeyConditionExpression: "deviceId = :d",
            ExpressionAttributeValues: {
                ":d": deviceId
            }
        };
        const queryResult = await dynamoDBClient.send(new QueryCommand(queryParams));
        if (queryResult.Count >= 3) {
            return errorResponse("Maximum of 3 accounts reached on this device", 403);
        }

        // Check if userEmail already exists
        const getUserParams = {
            TableName: "Users",
            Key: {
                userId: userEmail
            },
        };
        const existingUser = await dynamoDBClient.send(new GetCommand(getUserParams));
        if (existingUser.Item) {
            return errorResponse("User already exists", 400);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // HIGHLIGHTED: Generate a verification code
        const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        // Insert new user
        const putParams = {
            TableName: "Users",
            Item: {
                userId: userEmail,
                name,
                userName,
                userEmail,
                password: hashedPassword,
                dateOfBirth,
                deviceId,          //  Save deviceId
                verificationCode,  // Save verification code
            },
        };
        await dynamoDBClient.send(new PutCommand(putParams));

        return successResponse({
            message: "User registered successfully",
            verificationCode
        }, 201);

    } catch (error) {
        return errorResponse("Error registering user: " + error.message, 500);
    }
};


/** response sample:
 * {
 *   "statusCode": 201,
 *   "headers": {
 *     "Content-Type": "application/json",
 *     "Access-Control-Allow-Origin": "*"
 *   },
 *   "body": {
 *     "message": "User registered successfully",
 *     "verificationCode": "ABCD12"
 *   }
 * }
 */