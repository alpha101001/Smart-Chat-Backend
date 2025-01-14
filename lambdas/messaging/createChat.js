// lambdas/messaging/createChat.js
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
// Optionally: const { protectRoute } = require("../../utils/authUtils");

module.exports.createChat = async (event) => {
    try {
        // protectRoute(event.headers);
        const { chatName, participants } = JSON.parse(event.body);
        const chatId = `chat-${Date.now()}`;

        const params = {
            TableName: "Chats",
            Item: {
                chatId,
                chatName,
                participants, // if you need a StringSet, you'd do e.g. participants: dynamoDBClient.createSet(participants)
            },
        };

        await dynamoDBClient.put(params).promise();

        return successResponse(
            { message: "Chat created successfully", chatId },
            201
        );
    } catch (error) {
        return errorResponse("Error creating chat: " + error.message, 500);
    }
};
