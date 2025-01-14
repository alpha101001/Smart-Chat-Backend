// lambdas/calls/endMeeting.js
const { chime } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
// Optionally: const { protectRoute } = require("../../utils/authUtils");

module.exports.endMeeting = async (event) => {
    try {
        // protectRoute(event.headers); // if you want auth
        const { meetingId } = JSON.parse(event.body);

        const params = {
            MeetingId: meetingId,
        };

        await chime.deleteMeeting(params).promise();

        return successResponse({ message: "Meeting ended successfully" });
    } catch (error) {
        return errorResponse("Error ending meeting: " + error.message, 500);
    }
};
