"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens = (user) => {
    //create Tokens
    const accessToken = jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
    const refreshToken = jsonwebtoken_1.default.sign(user, process.env.REFRESH_TOKEN_SECRET);
    //Return token
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const verifyAccessToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "You are not authenticated" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: "Token is not valid!" });
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.rt;
    if (!refreshToken) {
        res.clearCookie("rt");
        return res.status(401).json({ message: "You are not authenticated" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        req.user = decoded;
        return next();
    }
    catch (error) {
        res.clearCookie("rt");
        return res.status(403).json({ message: "Token is not valid!" });
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
