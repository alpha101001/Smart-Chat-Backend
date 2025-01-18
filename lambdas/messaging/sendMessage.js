/*****************************************************
 * lambdas/messaging/sendMessage.js
 *****************************************************/
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
const { protectRoute } = require("../../utils/authUtils");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

module.exports.sendMessage = async (event) => {
    try {
        const user = protectRoute(event.headers);
        const userEmail = user.userId;

        if (!userEmail) {
            return errorResponse("Invalid token; userId missing in token payload.", 401);
        }

        // Parse request
        const { chatId, content } = JSON.parse(event.body);

        if (!chatId || !content) {
            return errorResponse("chatId and content are required", 400);
        }

        // Generate unique messageId
        const messageId = `msg-${uuidv4()}`;

        // Put item
        const params = {
            TableName: "Messages",
            Item: {
                chatId,         // Partition key
                messageId,      // Sort key
                senderId: userEmail,
                content,
                timestamp: Date.now(),
            },
        };

        await dynamoDBClient.send(new PutCommand(params));

        return successResponse({
            message: "Message sent successfully",
            messageId,
            chatId,
            senderId: userEmail,
            content,
            timestamp: params.Item.timestamp,
        }, 201);

    } catch (error) {
        return errorResponse(`Error sending message: ${error.message}`, 500);
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
 *     "message": "Message sent successfully",
 *     "messageId": "msg-48f61d44-425d-472e-9c5b-ece36fd50272",
 *     "chatId": "chat-dce78bda-fa3d-4c36-bbc7-29b6a4df222c",
 *     "senderId": "test12@example.com",
 *     "content": "Hello, this is a test message!",
 *     "timestamp": 1737205305080
 *   }
 * }
 */