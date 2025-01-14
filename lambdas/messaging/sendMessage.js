const { docClient } = require("../../config/aws");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
const { v4: uuidv4 } = require("uuid");
// const { protectRoute } = require("../../utils/authUtils");

exports.sendMessage = async (event) => {
    try {
        // protectRoute(event.headers);
        const { chatId, senderId, content } = JSON.parse(event.body);
        const messageId = uuidv4();

        const params = {
            TableName: "Messages",
            Item: {
                messageId: messageId,
                chatId: chatId,
                senderId: senderId,
                content: content,
                timestamp: Date.now(),
            },
        };

        await docClient.send(new PutCommand(params));

        return successResponse({
            message: "Message sent successfully",
            messageId,
        }, 201);
    } catch (error) {
        return errorResponse("Error sending message: " + error.message, 500);
    }
};
