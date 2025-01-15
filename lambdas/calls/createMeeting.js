/*****************************************************
 * lambdas/calls/createMeeting.js - Using ChimeClient v3
 *****************************************************/
const { chimeClient } = require("../../config/aws");
const {
    CreateMeetingCommand
} = require("@aws-sdk/client-chime");
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

        // v3 call
        const response = await chimeClient.send(new CreateMeetingCommand(params));

        return successResponse(
            {
                meeting: response.Meeting,
                message: "Meeting created successfully",
            },
            201
        );
    } catch (error) {
        return errorResponse("Error creating meeting: " + error.message, 500);
    }
};

