// lambdas/messaging/listMessages.js
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
// const { protectRoute } = require("../../utils/authUtils");

module.exports.listMessages = async (event) => {
    try {
        // protectRoute(event.headers);
        const { chatId, limit = 10, lastEvaluatedKey } = JSON.parse(event.body);

        const params = {
            TableName: "Messages",
            KeyConditionExpression: "chatId = :chatId",
            ExpressionAttributeValues: {
                ":chatId": chatId,
            },
            Limit: limit,
            ExclusiveStartKey: lastEvaluatedKey || undefined,
        };

        const response = await dynamoDBClient.query(params).promise();

        return successResponse({
            messages: response.Items || [],
            lastEvaluatedKey: response.LastEvaluatedKey || null,
        });
    } catch (error) {
        return errorResponse("Error fetching messages: " + error.message, 500);
    }
};
