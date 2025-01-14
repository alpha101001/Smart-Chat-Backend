const { verifyToken } = require("../config/jwt");

/**
 * Protects an API route by validating the Authorization header.
 * @param {Object} headers - The headers object (e.g., event.headers).
 * @returns {Object} Decoded token if valid
 * @throws {Error} If token is missing or invalid
 */
exports.protectRoute = (headers) => {
    const authHeader = headers.Authorization || headers.authorization;
    if (!authHeader) {
        throw new Error("Authorization header is missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new Error("Token is missing");
    }

    return verifyToken(token);
};
