/*****************************************************
 * lambdas/messaging/createChat.js
 *****************************************************/
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
const { protectRoute } = require("../../utils/authUtils");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

module.exports.createChat = async (event) => {
    try {
        // Protect the route with authentication and get the user info
        const user = protectRoute(event.headers);
        const userEmail = user.userId;  // <-- token payload is { userId: userEmail }

        if (!userEmail) {
            return errorResponse("Invalid token; userId missing in token payload.", 401);
        }

        // Parse the request body
        const { chatName, participants } = JSON.parse(event.body);

        // Validate inputs
        if (!chatName || !participants || !Array.isArray(participants) || participants.length < 2) {
            return errorResponse("chatName and at least 2 participants are required", 400);
        }

        // Add the creator (current user) if not already in participants
        if (!participants.includes(userEmail)) {
            participants.push(userEmail);
        }

        // Filter out null/undefined
        const validParticipants = participants.filter(Boolean);

        // Generate a unique chat ID
        const chatId = `chat-${uuidv4()}`;

        // Save the chat details
        const params = {
            TableName: "Chats",
            Item: {
                chatId,
                chatName,
                participants: validParticipants,
                createdBy: userEmail,
                createdAt: Date.now(),
            },
        };

        await dynamoDBClient.send(new PutCommand(params));

        return successResponse({
            message: "Chat created successfully",
            chatId,
            chatName,
            participants: validParticipants,
        }, 201);

    } catch (error) {
        return errorResponse(`Error creating chat: ${error.message}`, 500);
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
 *     "message": "Chat created successfully",
 *     "chatId": "chat-dce78bda-fa3d-4c36-bbc7-29b6a4df222c",
 *     "chatName": "Project Discussion",
 *     "participants": [
 *       "user1@example.com",
 *       "user2@example.com",
 *       "test12@example.com"
 *     ]
 *   }
 * }
 */