/*****************************************************
 * handler.js
 *****************************************************/
const { signup } = require("./lambdas/auth/signup");
const { login } = require("./lambdas/auth/login");
const { createChat } = require("./lambdas/messaging/createChat");
const { sendMessage } = require("./lambdas/messaging/sendMessage");
const { listMessages } = require("./lambdas/messaging/listMessages");
const { createMeeting } = require("./lambdas/calls/createMeeting");
const { joinMeeting } = require("./lambdas/calls/joinMeeting");
const { endMeeting } = require("./lambdas/calls/endMeeting");

module.exports = {
    signup,
    login,
    createChat,
    sendMessage,
    listMessages,
    createMeeting,
    joinMeeting,
    endMeeting,
};
