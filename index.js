require("dotenv").config();

const { signup } = require("./lambdas/auth/signup");
const { login } = require("./lambdas/auth/login");

const { createChat } = require("./lambdas/messaging/createChat");
const { sendMessage } = require("./lambdas/messaging/sendMessage");
const { listMessages } = require("./lambdas/messaging/listMessages");

const { createMeeting } = require("./lambdas/calls/createMeeting");
const { joinMeeting } = require("./lambdas/calls/joinMeeting");
const { endMeeting } = require("./lambdas/calls/endMeeting");

// Example exports if you want a local test or fallback
module.exports.signup = signup;
module.exports.login = login;
module.exports.createChat = createChat;
module.exports.sendMessage = sendMessage;
module.exports.listMessages = listMessages;
module.exports.createMeeting = createMeeting;
module.exports.joinMeeting = joinMeeting;
module.exports.endMeeting = endMeeting;
