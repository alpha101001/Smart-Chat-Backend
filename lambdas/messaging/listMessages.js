const { docClient } = require("../../config/aws");
const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
// const { protectRoute } = require("../../utils/authUtils");

exports.listMessages = async (event) => {
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

        const response = await docClient.send(new QueryCommand(params));

        return successResponse({
            messages: response.Items || [],
            lastEvaluatedKey: response.LastEvaluatedKey || null,
        });
    } catch (error) {
        return errorResponse("Error fetching messages: " + error.message, 500);
    }
};
