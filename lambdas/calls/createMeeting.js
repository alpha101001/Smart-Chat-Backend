const { chimeClient } = require("../../config/aws");
const { CreateMeetingCommand } = require("@aws-sdk/client-chime-sdk-meetings");
const { protectRoute } = require("../../utils/authUtils");
const { successResponse, errorResponse } = require("../../utils/responseUtils");

/**
 * Creates a new Chime meeting
 * Expects event.body: { clientRequestToken, meetingTitle }
 * Also requires Authorization header with Bearer token
 */
exports.createMeeting = async (event) => {
    try {
        // Protect the route
        protectRoute(event.headers);

        const { clientRequestToken, meetingTitle } = JSON.parse(event.body);

        const params = {
            ClientRequestToken: clientRequestToken,
            MediaRegion: "us-east-1",
            ExternalMeetingId: meetingTitle,
        };

        const response = await chimeClient.send(new CreateMeetingCommand(params));

        return successResponse({
            meeting: response.Meeting,
            message: "Meeting created successfully",
        }, 201);
    } catch (error) {
        return errorResponse("Error creating meeting: " + error.message, 500);
    }
};
