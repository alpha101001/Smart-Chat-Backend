const { chimeClient } = require("../../config/aws");
const { DeleteMeetingCommand } = require("@aws-sdk/client-chime-sdk-meetings");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
// Optionally use protectRoute if you want to require auth
// const { protectRoute } = require("../../utils/authUtils");

exports.endMeeting = async (event) => {
    try {
        // protectRoute(event.headers);  // if you want it protected
        const { meetingId } = JSON.parse(event.body);

        const params = { MeetingId: meetingId };

        await chimeClient.send(new DeleteMeetingCommand(params));

        return successResponse({ message: "Meeting ended successfully" });
    } catch (error) {
        return errorResponse("Error ending meeting: " + error.message, 500);
    }
};
