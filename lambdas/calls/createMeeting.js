// lambdas/calls/createMeeting.js
const { chime } = require("../../config/aws");
const { protectRoute } = require("../../utils/authUtils");
const { successResponse, errorResponse } = require("../../utils/responseUtils");

module.exports.createMeeting = async (event) => {
    try {
        // Check JWT if you want the route to be protected
        protectRoute(event.headers);

        const { clientRequestToken, meetingTitle } = JSON.parse(event.body);

        const params = {
            ClientRequestToken: clientRequestToken,
            MediaRegion: "us-east-1",
            ExternalMeetingId: meetingTitle,
        };

        const response = await chime.createMeeting(params).promise();

        return successResponse({
            meeting: response.Meeting,
            message: "Meeting created successfully",
        }, 201);
    } catch (error) {
        return errorResponse("Error creating meeting: " + error.message, 500);
    }
};
